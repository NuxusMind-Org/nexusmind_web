import { useState, useRef } from 'react';
import { User, Lock, Camera, Trash2, ChevronDown, Check, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<'account' | 'security'>('account');

  // Account Form State
  const [name, setName] = useState('Çiçək Ömərova');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(name);

  const [email, setEmail] = useState('ciciomarova20061012@gmail.com');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);

  const [status, setStatus] = useState('Tələbə');
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const [language, setLanguage] = useState('Azərbaycan dili');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const statusOptions = ['Tələbə', 'Məzun', 'İşləyən', 'Digər'];
  const languageOptions = ['Azərbaycan dili', 'English', 'Türkçe', 'Русский'];

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

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
    setTempName(name);
    setIsEditingName(false);
    setTempEmail(email);
    setIsEditingEmail(false);
  };

  const handleCancelPasswordChange = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
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
          Sənin profilin
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
              <span>Hesabınız</span>
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
              <span>Təhlükəsizlik</span>
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
                Hesab Məlumatları
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
                        <span>M</span>
                      )}
                    </div>
                    {/* Camera Button */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                      title="Şəkli dəyiş"
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
                      Profil Şəkli
                    </span>
                    <span className="text-xs text-gray-400 font-normal mt-0.5">
                      PNG və ya JPG, maksimum 5MB
                    </span>
                  </div>
                </div>

                {/* Delete Photo Action */}
                <button
                  onClick={handleRemoveImage}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-semibold transition-colors cursor-pointer self-start sm:self-center"
                >
                  <Trash2 size={16} className="text-red-500" />
                  <span>Şəkli sil</span>
                </button>
              </div>

              {/* 2. Ad (Name) Row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col flex-1">
                  <span className="text-xs text-gray-400 font-medium mb-1">Ad</span>
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
                        title="Yadda saxla"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-base sm:text-lg font-semibold text-[#1E0A42] font-['Lexend',_sans-serif]">
                      {name}
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
                    Redaktə et
                  </button>
                )}
              </div>

              {/* 3. E-poçt ünvanı (Email) Row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col flex-1">
                  <span className="text-xs text-gray-400 font-medium mb-1">E-poçt ünvanı</span>
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
                        title="Yadda saxla"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <span className="text-base sm:text-lg font-semibold text-[#1E0A42] font-['Lexend',_sans-serif] break-all">
                      {email}
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
                    Redaktə et
                  </button>
                )}
              </div>

              {/* 4. Statusunuz (Status Dropdown) */}
              <div className="flex flex-col max-w-[420px] relative">
                <label className="text-xs text-gray-400 font-medium mb-1.5">Statusunuz</label>
                <div
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  className="w-full bg-[#F3F5FA] hover:bg-[#EEF1F8] border border-transparent focus-within:border-[#38166D]/30 rounded-2xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="text-base font-semibold text-[#1E0A42] font-['Lexend',_sans-serif]">
                    {status}
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
                        key={opt}
                        onClick={() => {
                          setStatus(opt);
                          setIsStatusOpen(false);
                        }}
                        className={`px-4 py-3 text-sm font-medium cursor-pointer transition-colors flex items-center justify-between ${
                          status === opt
                            ? 'bg-[#38166D]/10 text-[#38166D] font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{opt}</span>
                        {status === opt && <Check size={16} className="text-[#38166D]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Dil (Language Dropdown) */}
              <div className="flex flex-col max-w-[420px] relative">
                <label className="text-xs text-gray-400 font-medium mb-1.5">Dil</label>
                <div
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="w-full bg-[#F3F5FA] hover:bg-[#EEF1F8] border border-transparent focus-within:border-[#38166D]/30 rounded-2xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="text-base font-semibold text-[#1E0A42] font-['Lexend',_sans-serif]">
                    {language}
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
                        key={opt}
                        onClick={() => {
                          setLanguage(opt);
                          setIsLanguageOpen(false);
                        }}
                        className={`px-4 py-3 text-sm font-medium cursor-pointer transition-colors flex items-center justify-between ${
                          language === opt
                            ? 'bg-[#38166D]/10 text-[#38166D] font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{opt}</span>
                        {language === opt && <Check size={16} className="text-[#38166D]" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="bg-[#F4F6FC]/60 border-t border-gray-100 p-6 flex items-center justify-end gap-4 rounded-b-[28px]">
              <button
                onClick={handleCancelAll}
                className="px-6 py-3 rounded-2xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-sm font-semibold transition-colors shadow-sm cursor-pointer"
              >
                Ləğv et
              </button>
              <button
                onClick={() => {
                  /* handle save */
                  setIsEditingName(false);
                  setIsEditingEmail(false);
                }}
                className="px-6 py-3 rounded-2xl bg-[#351465] text-white hover:bg-[#290f50] text-sm font-semibold transition-colors shadow-md cursor-pointer"
              >
                Dəyişiklikləri yadda saxla
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
                      Hazırkı şifrə
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
                      Yeni şifrə
                    </label>
                    <div className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 flex items-center justify-between focus-within:border-[#38166D] transition-colors">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Yeni şifrəni daxil edin"
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
                      Yeni şifrənin təsdiqi
                    </label>
                    <div className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 flex items-center justify-between focus-within:border-[#38166D] transition-colors">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Şifrəni yenidən daxil edin"
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
                </div>

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-4 mt-8 pt-4">
                  <button
                    onClick={handleCancelPasswordChange}
                    className="px-5 py-2.5 rounded-xl text-[#1E0A42] font-semibold hover:bg-gray-100/80 transition-colors text-sm cursor-pointer"
                  >
                    Ləğv et
                  </button>
                  <button
                    onClick={() => {
                      /* handle password save */
                      alert('Şifrə yeniləndi!');
                      handleCancelPasswordChange();
                    }}
                    className="px-6 py-3 rounded-2xl bg-[#351465] text-white font-semibold text-sm hover:bg-[#280f4f] transition-all shadow-md cursor-pointer"
                  >
                    Şifrəni yenilə
                  </button>
                </div>
              </div>

              {/* Right Side: Security Info Cards Stack */}
              <div className="flex flex-col gap-6 w-full">
                {/* 1. Təhlükəsizlik qaydaları Card */}
                <div className="bg-[#F6EFFF] rounded-[28px] p-6 sm:p-7 text-left flex flex-col gap-4">
                  <div className="flex items-center gap-2.5 text-[#1E0A42] font-semibold text-base font-['Lexend',_sans-serif]">
                    <ShieldCheck size={18} className="text-[#1E0A42]" />
                    <span>Təhlükəsizlik qaydaları</span>
                  </div>

                  <ul className="flex flex-col gap-3 text-sm text-[#1E0A42]/80 font-medium">
                    <li className="flex items-start gap-2.5">
                      <Check size={16} className="text-[#1E0A42] mt-0.5 shrink-0" />
                      <span>Minimum 8 simvol olmalıdır</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={16} className="text-[#1E0A42] mt-0.5 shrink-0" />
                      <span>Böyük və kiçik hərflərdən istifadə edin</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={16} className="text-[#1E0A42] mt-0.5 shrink-0" />
                      <span>Rəqəm və simvollar əlavə edin (!@#$)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check size={16} className="text-[#1E0A42] mt-0.5 shrink-0" />
                      <span>Digər platformalardakı şifrələri təkraralamayın</span>
                    </li>
                  </ul>
                </div>

                {/* 2. Məxfilik məlumatı Card */}
                <div className="bg-[#EBF3FF] rounded-[28px] p-6 sm:p-7 text-left flex flex-col gap-3">
                  <h3 className="text-[#1E0A42] font-semibold text-base font-['Lexend',_sans-serif]">
                    Məxfilik məlumatı
                  </h3>
                  <p className="text-sm text-[#1E0A42]/80 font-normal leading-relaxed">
                    NexusMind sizin məlumatlarınızın məxfiliyini qoruyur. Şifrənizi heç kimlə paylaşmayın. Texniki dəstək komandası sizdən heç vaxt şifrə tələb etməyəcək.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Card: İki-mərhələli Təsdiqləmə (2FA) */}
            <div className="w-full bg-white border border-gray-100/80 rounded-[28px] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-[#1E0A42] font-['Lexend',_sans-serif]">
                  İki-mərhələli Təsdiqləmə
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
                  Hesabınızın təhlükəsizliyini artırmaq üçün giriş zamanı əlavə kod tələb olunsun.
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
