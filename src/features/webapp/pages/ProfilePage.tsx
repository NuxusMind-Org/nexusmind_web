import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Lock, Camera, Trash2, ChevronDown, Check, Eye, EyeOff, ShieldCheck, Loader2 } from 'lucide-react';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useUpdateUser } from '@/features/auth/hooks/useUpdateUser';
import { authApi } from '@/features/auth/api/auth.api';

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
    { key: 'student', label: t('webapp.profile.statusStudent') },
    { key: 'graduate', label: t('webapp.profile.statusGraduate') },
    { key: 'working', label: t('webapp.profile.statusWorking') },
    { key: 'other', label: t('webapp.profile.statusOther') },
  ];
  const languageOptions = [
    { code: 'az', name: 'Azərbaycan dili' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
  ];

  // Initialize and sync form with fetched user data
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

  const handleSaveName = async () => {
    setName(tempName);
    setIsEditingName(false);
  };

  const handleSaveEmail = async () => {
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
      setSaveFeedback(t('webapp.profile.changesSaved'));
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
      setSaveFeedback(t('webapp.profile.changesSaved'));
      setTimeout(() => setSaveFeedback(null), 3000);
    } catch {
      setSaveError(t('webapp.profile.passwordError'));
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
      setPasswordStatus({ type: 'error', message: t('webapp.profile.errorCurrentReq') });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordStatus({ type: 'error', message: t('webapp.profile.errorMinLength') });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', message: t('webapp.profile.errorMismatch') });
      return;
    }

    setIsChangingPassword(true);
    try {
      await authApi.changePassword({
        oldPassword: currentPassword,
        newPassword,
        confirmPassword,
      });
      setPasswordStatus({ type: 'success', message: t('webapp.profile.passwordSuccess') });
      handleCancelPasswordChange();
      setTimeout(() => setPasswordStatus(null), 4000);
    } catch {
      setPasswordStatus({ type: 'error', message: t('webapp.profile.passwordError') });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="w-full flex flex-col rounded-none lg:rounded-[38.93px] min-h-full overflow-hidden shadow-none lg:shadow-2xl bg-[#F8FAFC] animate-fade-in pb-12">
      {/* 1. Header Banner Section */}
      <div
        className="w-full flex items-center justify-center relative border-b border-black/5 rounded-none lg:rounded-t-[38.93px] h-[188px] shrink-0 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        {/* Subtle progressive blur layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backdropFilter: 'blur(3.89px)',
            WebkitBackdropFilter: 'blur(3.89px)',
          }}
        />

        {/* Title */}
        <h1
          className="relative z-10 text-[#1E0A42] font-normal text-[28px] sm:text-[36px] md:text-[46.72px] leading-[36px] sm:leading-[48px] md:leading-[59.84px] text-center tracking-[-0.96px] font-['Lexend',_sans-serif]"
        >
          {t('webapp.profile.title')}
        </h1>
      </div>

      {/* 2. Profile Main Content Section */}
      <div className="px-4 sm:px-8 md:px-12 pt-6 pb-12 flex flex-col w-full max-w-[1231px] mx-auto text-left flex-1">
        {/* Top Navigation Tabs */}
        <div className="w-full border-b border-gray-200/80 mb-8">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('account')}
              className={`flex items-center gap-2.5 pb-3 pt-1 text-sm font-semibold transition-all relative cursor-pointer ${
                activeTab === 'account'
                  ? 'text-[#38166D]'
                  : 'text-gray-500 hover:text-[#38166D]'
              }`}
            >
              <User size={18} className={activeTab === 'account' ? 'text-[#38166D]' : 'text-gray-400'} />
              <span>{t('webapp.profile.account')}</span>
              {activeTab === 'account' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#38166D] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-2.5 pb-3 pt-1 text-sm font-semibold transition-all relative cursor-pointer ${
                activeTab === 'security'
                  ? 'text-[#38166D]'
                  : 'text-gray-500 hover:text-[#38166D]'
              }`}
            >
              <Lock size={18} className={activeTab === 'security' ? 'text-[#38166D]' : 'text-gray-400'} />
              <span>{t('webapp.profile.security')}</span>
              {activeTab === 'security' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#38166D] rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Tab 1: Hesabınız (Account Details Card) */}
        {activeTab === 'account' && (
          <div className="w-full bg-white border border-gray-100/80 rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col transition-all">
            {/* Card Content Area */}
            <div className="p-6 sm:p-10 flex flex-col gap-8">
              {/* Card Title */}
              <h2 className="text-[22px] sm:text-[26px] font-semibold text-[#1E0A42] font-['Lexend',_sans-serif]">
                {t('webapp.profile.accountDetails')}
              </h2>

              {/* 1. Profile Picture Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-5">
                  {/* Avatar with Camera Badge */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-[#482476] text-white text-3xl font-bold flex items-center justify-center overflow-hidden shadow-inner shrink-0">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span>{userInitial}</span>
                      )}
                    </div>
                    {/* Camera Button */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                      title={t('webapp.profile.changePicture')}
                    >
                      <Camera size={14} className="text-[#38166D]" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/png, image/jpeg"
                      className="hidden"
                    />
                  </div>

                  {/* Info Text */}
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-[#1E0A42] font-['Lexend',_sans-serif]">
                      {t('webapp.profile.profilePicture')}
                    </span>
                    <span className="text-xs text-gray-400 font-normal mt-0.5">
                      {t('webapp.profile.pictureLimit')}
                    </span>
                  </div>
                </div>

                {/* Delete Photo Action */}
                <button
                  onClick={handleRemoveImage}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-semibold transition-colors cursor-pointer self-start sm:self-center"
                >
                  <Trash2 size={16} className="text-red-500" />
                  <span>{t('webapp.profile.deletePicture')}</span>
                </button>
              </div>

              {/* 2. Ad (Name) Row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col flex-1">
                  <span className="text-xs text-gray-400 font-medium mb-1">{t('webapp.profile.name')}</span>
                  {isEditingName ? (
                    <div className="flex items-center gap-3 max-w-[400px]">
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="w-full bg-[#F3F5FA] border border-[#38166D]/30 rounded-xl px-4 py-2 text-base font-semibold text-[#1E0A42] outline-none"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveName}
                        className="p-2 bg-[#38166D] text-white rounded-xl hover:bg-[#2c1157] transition-colors cursor-pointer"
                        title={t('webapp.profile.save')}
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-base sm:text-lg font-semibold text-[#1E0A42] font-['Lexend',_sans-serif]">
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
                    className="px-5 py-2.5 rounded-xl border border-[#38166D]/30 text-[#38166D] hover:bg-[#38166D]/5 text-sm font-semibold transition-all cursor-pointer shrink-0"
                  >
                    {t('webapp.profile.edit')}
                  </button>
                )}
              </div>

              {/* 3. E-poçt ünvanı (Email) Row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col flex-1">
                  <span className="text-xs text-gray-400 font-medium mb-1">{t('webapp.profile.email')}</span>
                  {isEditingEmail ? (
                    <div className="flex items-center gap-3 max-w-[400px]">
                      <input
                        type="email"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                        className="w-full bg-[#F3F5FA] border border-[#38166D]/30 rounded-xl px-4 py-2 text-base font-semibold text-[#1E0A42] outline-none"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveEmail}
                        className="p-2 bg-[#38166D] text-white rounded-xl hover:bg-[#2c1157] transition-colors cursor-pointer"
                        title={t('webapp.profile.save')}
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-base sm:text-lg font-semibold text-[#1E0A42] font-['Lexend',_sans-serif] break-all">
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
                    className="px-5 py-2.5 rounded-xl border border-[#38166D]/30 text-[#38166D] hover:bg-[#38166D]/5 text-sm font-semibold transition-all cursor-pointer shrink-0"
                  >
                    {t('webapp.profile.edit')}
                  </button>
                )}
              </div>

              {/* 4. Statusunuz (Status Dropdown) */}
              <div className="flex flex-col max-w-[420px] relative">
                <label className="text-xs text-gray-400 font-medium mb-1.5">{t('webapp.profile.status')}</label>
                <div
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  className="w-full bg-[#F3F5FA] hover:bg-[#EEF1F8] border border-transparent focus-within:border-[#38166D]/30 rounded-2xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="text-base font-semibold text-[#1E0A42] font-['Lexend',_sans-serif]">
                    {statusOptions.find(s => s.key === status)?.label || status}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-500 transition-transform duration-200 ${
                      isStatusOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {isStatusOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden py-1">
                    {statusOptions.map((opt) => (
                      <div
                        key={opt.key}
                        onClick={() => {
                          setStatus(opt.key);
                          setIsStatusOpen(false);
                        }}
                        className={`px-4 py-3 text-sm font-medium cursor-pointer transition-colors flex items-center justify-between ${
                          status === opt.key
                            ? 'bg-[#38166D]/10 text-[#38166D] font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {status === opt.key && <Check size={16} className="text-[#38166D]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Dil (Language Dropdown) */}
              <div className="flex flex-col max-w-[420px] relative">
                <label className="text-xs text-gray-400 font-medium mb-1.5">{t('webapp.profile.language')}</label>
                <div
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="w-full bg-[#F3F5FA] hover:bg-[#EEF1F8] border border-transparent focus-within:border-[#38166D]/30 rounded-2xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="text-base font-semibold text-[#1E0A42] font-['Lexend',_sans-serif]">
                    {languageOptions.find(l => l.code === i18n.language)?.name || 'Azərbaycan dili'}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-500 transition-transform duration-200 ${
                      isLanguageOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {isLanguageOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden py-1">
                    {languageOptions.map((opt) => (
                      <div
                        key={opt.code}
                        onClick={() => {
                          i18n.changeLanguage(opt.code);
                          setIsLanguageOpen(false);
                        }}
                        className={`px-4 py-3 text-sm font-medium cursor-pointer transition-colors flex items-center justify-between ${
                          i18n.language === opt.code
                            ? 'bg-[#38166D]/10 text-[#38166D] font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{opt.name}</span>
                        {i18n.language === opt.code && <Check size={16} className="text-[#38166D]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Feedback messages */}
              {saveFeedback && (
                <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 py-2.5 px-4 rounded-xl font-medium">
                  {saveFeedback}
                </div>
              )}
              {saveError && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-200 py-2.5 px-4 rounded-xl font-medium">
                  {saveError}
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="bg-[#F4F6FC]/60 border-t border-gray-100 p-6 flex items-center justify-end gap-4 rounded-b-[28px]">
              <button
                onClick={handleCancelAll}
                className="px-6 py-3 rounded-2xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-semibold transition-colors shadow-sm cursor-pointer"
              >
                {t('webapp.profile.cancel')}
              </button>
              <button
                onClick={handleSaveAllChanges}
                disabled={updateUserMutation.isPending}
                className="px-6 py-3 rounded-2xl bg-[#351465] text-white hover:bg-[#290f50] text-sm font-semibold transition-colors shadow-md cursor-pointer flex items-center gap-2"
              >
                {updateUserMutation.isPending && <Loader2 size={16} className="animate-spin" />}
                <span>{t('webapp.profile.saveChanges')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Təhlükəsizlik (Security Tab) */}
        {activeTab === 'security' && (
          <div className="w-full flex flex-col gap-6">
            {/* Top Grid: Password Form (Left) & Security Info Cards (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start w-full">
              {/* Left Card: Change Password Form */}
              <div className="bg-white border border-gray-100/80 rounded-[28px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
                <div className="flex flex-col gap-6">
                  {/* Hazırkı şifrə */}
                  <div>
                    <label className="text-sm font-semibold text-[#1E0A42] font-['Lexend',_sans-serif] mb-2 block">
                      {t('webapp.profile.currentPassword')}
                    </label>
                    <div className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 flex items-center justify-between focus-within:border-[#38166D] transition-colors">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full outline-none text-[#1E0A42] font-medium placeholder-gray-400 text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="text-gray-400 hover:text-gray-600 transition-colors ml-2 cursor-pointer"
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="border-b border-gray-100 my-1" />

                  {/* Yeni şifrə */}
                  <div>
                    <label className="text-sm font-semibold text-[#1E0A42] font-['Lexend',_sans-serif] mb-2 block">
                      {t('webapp.profile.newPassword')}
                    </label>
                    <div className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 flex items-center justify-between focus-within:border-[#38166D] transition-colors">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder={t('webapp.profile.newPasswordPlaceholder')}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full outline-none text-[#1E0A42] font-medium placeholder-gray-400 text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="text-gray-400 hover:text-gray-600 transition-colors ml-2 cursor-pointer"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Yeni şifrənin təsdiqi */}
                  <div>
                    <label className="text-sm font-semibold text-[#1E0A42] font-['Lexend',_sans-serif] mb-2 block">
                      {t('webapp.profile.confirmNewPassword')}
                    </label>
                    <div className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 flex items-center justify-between focus-within:border-[#38166D] transition-colors">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder={t('webapp.profile.confirmNewPasswordPlaceholder')}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full outline-none text-[#1E0A42] font-medium placeholder-gray-400 text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-600 transition-colors ml-2 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Password status feedback */}
                  {passwordStatus && (
                    <div
                      className={`text-xs py-2.5 px-4 rounded-xl font-medium ${
                        passwordStatus.type === 'success'
                          ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                          : 'text-red-600 bg-red-50 border border-red-200'
                      }`}
                    >
                      {passwordStatus.message}
                    </div>
                  )}
                </div>

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-4 mt-8 pt-4">
                  <button
                    onClick={handleCancelPasswordChange}
                    className="px-5 py-2.5 rounded-xl text-[#1E0A42] font-semibold hover:bg-gray-100/80 transition-colors text-sm cursor-pointer"
                  >
                    {t('webapp.profile.cancel')}
                  </button>
                  <button
                    onClick={handleSavePasswordChange}
                    disabled={isChangingPassword}
                    className="px-6 py-3 rounded-2xl bg-[#351465] text-white font-semibold text-sm hover:bg-[#280f4f] transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    {isChangingPassword && <Loader2 size={16} className="animate-spin" />}
                    <span>{t('webapp.profile.updatePassword')}</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Security Info Cards Stack */}
              <div className="flex flex-col gap-6 w-full">
                {/* 1. Təhlükəsizlik qaydaları Card */}
                <div className="bg-[#F6EFFF] rounded-[28px] p-6 sm:p-7 text-left flex flex-col gap-4">
                  <div className="flex items-center gap-2.5 text-[#1E0A42] font-semibold text-base font-['Lexend',_sans-serif]">
                    <ShieldCheck size={18} className="text-[#1E0A42]" />
                    <span>{t('webapp.profile.securityRules')}</span>
                  </div>

                  <ul className="flex flex-col gap-3 text-sm text-[#1E0A42]/80 font-medium">
                    <li className="flex items-start gap-2.5">
                      <Check size={16} className="text-[#1E0A42] mt-0.5 shrink-0" />
                      <span>{t('webapp.profile.rule1')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={16} className="text-[#1E0A42] mt-0.5 shrink-0" />
                      <span>{t('webapp.profile.rule2')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={16} className="text-[#1E0A42] mt-0.5 shrink-0" />
                      <span>{t('webapp.profile.rule3')}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={16} className="text-[#1E0A42] mt-0.5 shrink-0" />
                      <span>{t('webapp.profile.rule4')}</span>
                    </li>
                  </ul>
                </div>

                {/* 2. Məxfilik məlumatı Card */}
                <div className="bg-[#EBF3FF] rounded-[28px] p-6 sm:p-7 text-left flex flex-col gap-3">
                  <h3 className="text-[#1E0A42] font-semibold text-base font-['Lexend',_sans-serif]">
                    {t('webapp.profile.privacyInfo')}
                  </h3>
                  <p className="text-sm text-[#1E0A42]/80 font-normal leading-relaxed">
                    {t('webapp.profile.privacyDesc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Card: İki-mərhələli Təsdiqləmə (2FA) */}
            <div className="w-full bg-white border border-gray-100/80 rounded-[28px] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-[#1E0A42] font-['Lexend',_sans-serif]">
                  {t('webapp.profile.twoFactor')}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
                  {t('webapp.profile.twoFactorDesc')}
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 shrink-0 ${
                  is2FAEnabled ? 'bg-[#351465]' : 'bg-gray-300'
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
      </div>
    </div>
  );
};
