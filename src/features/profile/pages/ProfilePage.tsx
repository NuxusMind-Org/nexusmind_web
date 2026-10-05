import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useUpdateUser } from '@/features/auth/hooks/useUpdateUser';
import { authApi } from '@/features/auth/api/auth.api';
import { LandingNavbar } from '@/features/landing/components/LandingNavbar';
import { Footer } from '@/features/landing/components/Footer';

export const ProfilePage = () => {
  const { t, i18n } = useTranslation();
  const { data: user } = useCurrentUser();
  const updateUserMutation = useUpdateUser();

  const [activeTab, setActiveTab] = useState<'account' | 'security'>('account');

  // Account Form State
  const [name, setName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');

  const [email, setEmail] = useState('');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState('');

  const [status, setStatus] = useState('student');
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const statusOptions = [
    { key: 'student', label: t('webapp.profile.statusStudent', 'Tələbə') },
    { key: 'graduate', label: t('webapp.profile.statusGraduate', 'Məzun') },
    { key: 'working', label: t('webapp.profile.statusWorking', 'İşləyən') },
    { key: 'other', label: t('webapp.profile.statusOther', 'Digər') },
  ];

  const languageOptions = [
    { code: 'az', name: 'Azərbaycan dili' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
  ];

  useEffect(() => {
    if (user) {
      const fullName = [user.name, user.surname].filter(Boolean).join(' ').trim();
      const initialName = fullName || user.name || '';
      setName(initialName);
      setTempName(initialName);

      const initialEmail = user.email || '';
      setEmail(initialEmail);
      setTempEmail(initialEmail);

      if (user.status) setStatus(user.status);
      if (user.language && ['az', 'en', 'ru'].includes(user.language)) i18n.changeLanguage(user.language);
      if (user.profileImageUrl) setProfileImage(user.profileImageUrl);
      if (typeof user.twoFactorEnabled === 'boolean') setIs2FAEnabled(user.twoFactorEnabled);
    }
  }, [user, i18n]);

  const userInitial = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSaveName = () => {
    setName(tempName);
    setIsEditingName(false);
  };

  const handleSaveEmail = () => {
    setEmail(tempEmail);
    setIsEditingEmail(false);
  };

  const handleCancelAll = () => {
    const fullName = [user?.name, user?.surname].filter(Boolean).join(' ').trim();
    setTempName(fullName || user?.name || '');
    setIsEditingName(false);
    setTempEmail(user?.email || '');
    setIsEditingEmail(false);
    setSaveFeedback(null);
    setSaveError(null);
  };

  const handleSaveAllChanges = async () => {
    if (!user?.id) {
      setSaveFeedback(t('webapp.profile.changesSaved', 'Dəyişikliklər uğurla yadda saxlanıldı!'));
      setTimeout(() => setSaveFeedback(null), 3000);
      return;
    }

    setSaveError(null);
    setSaveFeedback(null);

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || user.name || '';
    const lastName = nameParts.slice(1).join(' ') || user.surname || '';

    try {
      await updateUserMutation.mutateAsync({
        id: user.id,
        data: {
          name: firstName,
          surname: lastName,
          email: email.trim(),
          age: user.age || 20,
          phone: user.phone,
          password: user.password,
        },
      });
      setIsEditingName(false);
      setIsEditingEmail(false);
      setSaveFeedback(t('webapp.profile.changesSaved', 'Dəyişikliklər uğurla yadda saxlanıldı!'));
      setTimeout(() => setSaveFeedback(null), 3000);
    } catch {
      setSaveError(t('webapp.profile.passwordError', 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.'));
      setTimeout(() => setSaveError(null), 3000);
    }
  };

  const handleCancelPasswordChange = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordStatus(null);
  };

  const handleSavePasswordChange = async () => {
    setPasswordStatus(null);

    if (!currentPassword) {
      setPasswordStatus({ type: 'error', message: t('webapp.profile.errorCurrentReq', 'Hazırkı şifrə tələb olunur') });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordStatus({ type: 'error', message: t('webapp.profile.errorMinLength', 'Şifrə ən az 8 simvol olmalıdır') });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', message: t('webapp.profile.errorMismatch', 'Şifrələr uyğun gəlmir') });
      return;
    }

    setIsChangingPassword(true);
    try {
      await authApi.changePassword({
        oldPassword: currentPassword,
        newPassword,
        confirmPassword,
      });
      setPasswordStatus({ type: 'success', message: t('webapp.profile.passwordSuccess', 'Şifrə uğurla yeniləndi') });
      handleCancelPasswordChange();
      setTimeout(() => setPasswordStatus(null), 4000);
    } catch {
      setPasswordStatus({ type: 'error', message: t('webapp.profile.passwordError', 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.') });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="profile" />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-5xl font-light font-sans text-white tracking-tight">
            {t('webapp.profile.title', 'Profiliniz')}
          </h1>
          <p className="text-white/70 text-sm sm:text-base">
            {t('webapp.profile.subtitle', 'Şəxsi məlumatlarınızı və təhlükəsizlik ayarlarınızı idarə edin.')}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-white/5 border border-white/10 w-fit backdrop-blur-md">
          <button
            onClick={() => setActiveTab('account')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'account'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <AppIcon icon="lucide:user" size={18} />
            <span>{t('webapp.profile.account', 'Hesabınız')}</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <AppIcon icon="lucide:lock" size={18} />
            <span>{t('webapp.profile.security', 'Təhlükəsizlik')}</span>
          </button>
        </div>

        {/* Tab 1: Account Details */}
        {activeTab === 'account' && (
          <div className="w-full bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col gap-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              {t('webapp.profile.accountDetails', 'Hesab məlumatları')}
            </h2>

            {/* Profile Picture Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-8">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-700 to-teal-400 text-white text-3xl font-bold flex items-center justify-center overflow-hidden shadow-xl border-2 border-white/20 shrink-0">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span>{userInitial}</span>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#03C6B2] text-[#111] rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-all cursor-pointer"
                    title={t('webapp.profile.changePicture', 'Şəkli dəyiş')}
                  >
                    <AppIcon icon="lucide:camera" size={15} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/png, image/jpeg"
                    className="hidden"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-base font-semibold text-white">
                    {t('webapp.profile.profilePicture', 'Profil şəkli')}
                  </span>
                  <span className="text-xs text-white/60 mt-0.5">
                    {t('webapp.profile.pictureLimit', 'PNG, JPG (Maks. 5MB)')}
                  </span>
                </div>
              </div>

              {profileImage && (
                <button
                  onClick={handleRemoveImage}
                  className="flex items-center gap-2 text-rose-400 hover:text-rose-300 text-sm font-semibold transition-colors cursor-pointer self-start sm:self-center"
                >
                  <AppIcon icon="lucide:trash-2" size={16} />
                  <span>{t('webapp.profile.deletePicture', 'Şəkli sil')}</span>
                </button>
              )}
            </div>

            {/* Name Field */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex flex-col flex-1">
                <span className="text-xs text-white/60 font-medium mb-1.5">{t('webapp.profile.name', 'Ad və Soyad')}</span>
                {isEditingName ? (
                  <div className="flex items-center gap-3 max-w-md">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-base font-medium text-white outline-none focus:border-[#03C6B2]"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-2.5 bg-[#03C6B2] text-[#111] rounded-xl hover:opacity-90 transition-colors cursor-pointer"
                      title={t('webapp.profile.save', 'Yadda saxla')}
                    >
                      <AppIcon icon="lucide:check" size={18} />
                    </button>
                  </div>
                ) : (
                  <span className="text-lg font-medium text-white">
                    {name || '—'}
                  </span>
                )}
              </div>

              {!isEditingName && (
                <button
                  onClick={() => {
                    setTempName(name);
                    setIsEditingName(true);
                  }}
                  className="px-4 py-2 rounded-xl border border-white/20 text-white/90 hover:bg-white/10 text-sm font-semibold transition-all cursor-pointer shrink-0"
                >
                  {t('webapp.profile.edit', 'Redaktə et')}
                </button>
              )}
            </div>

            {/* Email Field */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex flex-col flex-1">
                <span className="text-xs text-white/60 font-medium mb-1.5">{t('webapp.profile.email', 'E-poçt ünvanı')}</span>
                {isEditingEmail ? (
                  <div className="flex items-center gap-3 max-w-md">
                    <input
                      type="email"
                      value={tempEmail}
                      onChange={(e) => setTempEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-base font-medium text-white outline-none focus:border-[#03C6B2]"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveEmail}
                      className="p-2.5 bg-[#03C6B2] text-[#111] rounded-xl hover:opacity-90 transition-colors cursor-pointer"
                      title={t('webapp.profile.save', 'Yadda saxla')}
                    >
                      <AppIcon icon="lucide:check" size={18} />
                    </button>
                  </div>
                ) : (
                  <span className="text-lg font-medium text-white break-all">
                    {email || '—'}
                  </span>
                )}
              </div>

              {!isEditingEmail && (
                <button
                  onClick={() => {
                    setTempEmail(email);
                    setIsEditingEmail(true);
                  }}
                  className="px-4 py-2 rounded-xl border border-white/20 text-white/90 hover:bg-white/10 text-sm font-semibold transition-all cursor-pointer shrink-0"
                >
                  {t('webapp.profile.edit', 'Redaktə et')}
                </button>
              )}
            </div>

            {/* Status Dropdown */}
            <div className="flex flex-col max-w-md relative">
              <label className="text-xs text-white/60 font-medium mb-1.5">{t('webapp.profile.status', 'Statusunuz')}</label>
              <div
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/15 rounded-2xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-colors"
              >
                <span className="text-base font-medium text-white">
                  {statusOptions.find((s) => s.key === status)?.label || status}
                </span>
                <AppIcon icon="lucide:chevron-down"
                  size={18}
                  className={`text-white/60 transition-transform duration-200 ${isStatusOpen ? 'rotate-180' : ''}`}
                />
              </div>

              {isStatusOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1b0b38]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl z-20 overflow-hidden py-1">
                  {statusOptions.map((opt) => (
                    <div
                      key={opt.key}
                      onClick={() => {
                        setStatus(opt.key);
                        setIsStatusOpen(false);
                      }}
                      className={`px-4 py-3 text-sm font-medium cursor-pointer transition-colors flex items-center justify-between ${
                        status === opt.key ? 'bg-purple-600/30 text-[#03C6B2] font-semibold' : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {status === opt.key && <AppIcon icon="lucide:check" size={16} className="text-[#03C6B2]" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="flex flex-col max-w-md relative">
              <label className="text-xs text-white/60 font-medium mb-1.5">{t('webapp.profile.language', 'İstifadəçi dili')}</label>
              <div
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/15 rounded-2xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-colors"
              >
                <span className="text-base font-medium text-white">
                  {languageOptions.find((l) => l.code === i18n.language)?.name || 'Azərbaycan dili'}
                </span>
                <AppIcon icon="lucide:chevron-down"
                  size={18}
                  className={`text-white/60 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
                />
              </div>

              {isLanguageOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1b0b38]/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl z-20 overflow-hidden py-1">
                  {languageOptions.map((opt) => (
                    <div
                      key={opt.code}
                      onClick={() => {
                        i18n.changeLanguage(opt.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`px-4 py-3 text-sm font-medium cursor-pointer transition-colors flex items-center justify-between ${
                        i18n.language === opt.code ? 'bg-purple-600/30 text-[#03C6B2] font-semibold' : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <span>{opt.name}</span>
                      {i18n.language === opt.code && <AppIcon icon="lucide:check" size={16} className="text-[#03C6B2]" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Feedback Notifications */}
            {saveFeedback && (
              <div className="text-sm text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 py-3 px-4 rounded-2xl font-medium">
                {saveFeedback}
              </div>
            )}
            {saveError && (
              <div className="text-sm text-rose-300 bg-rose-950/40 border border-rose-500/30 py-3 px-4 rounded-2xl font-medium">
                {saveError}
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
              <button
                onClick={handleCancelAll}
                className="px-6 py-3 rounded-2xl border border-white/20 text-white/80 hover:bg-white/10 text-sm font-semibold transition-colors cursor-pointer"
              >
                {t('webapp.profile.cancel', 'Ləğv et')}
              </button>
              <button
                onClick={handleSaveAllChanges}
                disabled={updateUserMutation.isPending}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-[#03C6B2] text-white hover:opacity-90 text-sm font-semibold transition-all shadow-lg shadow-purple-900/40 cursor-pointer flex items-center gap-2"
              >
                {updateUserMutation.isPending && <AppIcon icon="lucide:loader-2" size={16} className="animate-spin" />}
                <span>{t('webapp.profile.saveChanges', 'Yadda saxla')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Security */}
        {activeTab === 'security' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
              {/* Change Password Card */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    {t('webapp.profile.changePasswordTitle', 'Şifrəni Dəyiş')}
                  </h2>

                  {/* Current Password */}
                  <div>
                    <label className="text-xs text-white/60 font-medium mb-1.5 block">
                      {t('webapp.profile.currentPassword', 'Hazırkı şifrə')}
                    </label>
                    <div className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 flex items-center justify-between focus-within:border-[#03C6B2] transition-colors">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full outline-none text-white font-medium placeholder-white/30 text-sm sm:text-base bg-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="text-white/60 hover:text-white transition-colors ml-2 cursor-pointer"
                      >
                        {showCurrentPassword ? <AppIcon icon="lucide:eye-off" size={18} /> : <AppIcon icon="lucide:eye" size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="text-xs text-white/60 font-medium mb-1.5 block">
                      {t('webapp.profile.newPassword', 'Yeni şifrə')}
                    </label>
                    <div className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 flex items-center justify-between focus-within:border-[#03C6B2] transition-colors">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder={t('webapp.profile.newPasswordPlaceholder', 'Ən azı 8 simvol')}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full outline-none text-white font-medium placeholder-white/30 text-sm sm:text-base bg-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="text-white/60 hover:text-white transition-colors ml-2 cursor-pointer"
                      >
                        {showNewPassword ? <AppIcon icon="lucide:eye-off" size={18} /> : <AppIcon icon="lucide:eye" size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="text-xs text-white/60 font-medium mb-1.5 block">
                      {t('webapp.profile.confirmNewPassword', 'Yeni şifrəni təsdiqləyin')}
                    </label>
                    <div className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 flex items-center justify-between focus-within:border-[#03C6B2] transition-colors">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder={t('webapp.profile.confirmNewPasswordPlaceholder', 'Şifrəni təkrar daxil edin')}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full outline-none text-white font-medium placeholder-white/30 text-sm sm:text-base bg-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-white/60 hover:text-white transition-colors ml-2 cursor-pointer"
                      >
                        {showConfirmPassword ? <AppIcon icon="lucide:eye-off" size={18} /> : <AppIcon icon="lucide:eye" size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Password status feedback */}
                  {passwordStatus && (
                    <div
                      className={`text-xs py-3 px-4 rounded-xl font-medium ${
                        passwordStatus.type === 'success'
                          ? 'text-emerald-300 bg-emerald-950/40 border border-emerald-500/30'
                          : 'text-rose-300 bg-rose-950/40 border border-rose-500/30'
                      }`}
                    >
                      {passwordStatus.message}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={handleCancelPasswordChange}
                    className="px-5 py-2.5 rounded-xl text-white/70 hover:text-white transition-colors text-sm font-semibold cursor-pointer"
                  >
                    {t('webapp.profile.cancel', 'Ləğv et')}
                  </button>
                  <button
                    onClick={handleSavePasswordChange}
                    disabled={isChangingPassword}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-[#03C6B2] text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-purple-900/40 cursor-pointer flex items-center gap-2"
                  >
                    {isChangingPassword && <AppIcon icon="lucide:loader-2" size={16} className="animate-spin" />}
                    <span>{t('webapp.profile.updatePassword', 'Şifrəni yenilə')}</span>
                  </button>
                </div>
              </div>

              {/* Security Info Cards */}
              <div className="flex flex-col gap-6 w-full">
                <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 text-left flex flex-col gap-4 shadow-xl">
                  <div className="flex items-center gap-2.5 text-white font-semibold text-base">
                    <AppIcon icon="lucide:shield-check" size={20} className="text-[#03C6B2]" />
                    <span>{t('webapp.profile.securityRules', 'Təhlükəsizlik qaydaları')}</span>
                  </div>

                  <ul className="flex flex-col gap-3 text-sm text-white/80 font-medium">
                    <li className="flex items-start gap-2.5">
                      <AppIcon icon="lucide:check" size={16} className="text-[#03C6B2] mt-0.5 shrink-0" />
                      <span>{t('webapp.profile.rule1', 'Ən azı 8 simvoldan ibarət olmalıdır')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <AppIcon icon="lucide:check" size={16} className="text-[#03C6B2] mt-0.5 shrink-0" />
                      <span>{t('webapp.profile.rule2', 'Böyük və kiçik hərflərdən istifadə edin')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <AppIcon icon="lucide:check" size={16} className="text-[#03C6B2] mt-0.5 shrink-0" />
                      <span>{t('webapp.profile.rule3', 'Ən az bir rəqəm və xüsusi simvol əlavə edin')}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 text-left flex flex-col gap-3 shadow-xl">
                  <h3 className="text-white font-semibold text-base">
                    {t('webapp.profile.privacyInfo', 'Məxfilik məlumatı')}
                  </h3>
                  <p className="text-sm text-white/70 font-normal leading-relaxed">
                    {t('webapp.profile.privacyDesc', 'Şəxsi məlumatlarınız və seans qeydləriniz tam şifrələnmiş şəkildə qorunur və heç kimlə paylaşılmır.')}
                  </p>
                </div>
              </div>
            </div>

            {/* 2FA Card */}
            <div className="w-full bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-white">
                  {t('webapp.profile.twoFactor', 'İki-mərhələli Təsdiqləmə (2FA)')}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-normal mt-1">
                  {t('webapp.profile.twoFactorDesc', 'Hesabınıza daxil olarkən əlavə təhlükəsizlik kodu tələb olunsun.')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 shrink-0 ${
                  is2FAEnabled ? 'bg-[#03C6B2]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                    is2FAEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
