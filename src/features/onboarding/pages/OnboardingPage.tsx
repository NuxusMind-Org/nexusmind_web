import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import onboardingDataRaw from '../data/onboardingData.json';
import nexusLogo from '@/assets/svg/NexusMindLogo.svg';
import { IMAGE_MAP } from '../constants/imageMap';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useSubmitOnboarding } from '../hooks/useSubmitOnboarding';
import type {
  AddressType,
  TherapyFormat,
  EnvironmentType,
  ConcernType,
  OnboardingStepConfig,
  OnboardingOptionConfig,
} from '../types/onboarding.types';

const onboardingData = onboardingDataRaw as OnboardingStepConfig[];

// Mappings from UI IDs to Backend Enums
const GENDER_MAP: Record<string, AddressType> = {
  gender_female: 'XANIM',
  gender_male: 'BEY',
};

const THERAPY_MAP: Record<string, TherapyFormat> = {
  therapy_solo: 'TEK',
  therapy_couple: 'CUTLUK',
  therapy_family: 'AILE',
  therapy_friends: 'DOSTLAR',
};

const ENV_MAP: Record<string, EnvironmentType> = {
  env_silent: 'SESSIZ',
  env_creative: 'YARADICI',
  env_nature: 'TEBIET',
  env_library: 'KITABXANA',
  env_minimalist: 'MINIMALIST',
  env_cozy: 'SEMIMI',
};

const ISSUE_MAP: Record<string, ConcernType> = {
  issue_family: 'AILE_PROBLEMLERI',
  issue_love: 'SEVGI_PROBLEMLERI',
  issue_loneliness: 'TEKLIK',
  issue_future: 'GELECEK_QAYGISI',
  issue_depression: 'AGIR_DEPRESSIYA',
  issue_fatigue: 'XRONIKI_YORGUNLUQ',
};

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loadingDot, setLoadingDot] = useState(0);
  const submitMutation = useSubmitOnboarding();

  const store = useOnboardingStore();

  const currentStepConfig = onboardingData[currentStepIndex];
  const totalQuestionSteps = onboardingData.filter(s => s.type !== 'loading_state').length;
  const isAnalyzing = currentStepConfig.type === 'loading_state';

  // Handle Step 5 analyzing and submission
  useEffect(() => {
    if (isAnalyzing) {
      // Trigger submission payload
      const payload = store.getPayload();
      submitMutation.mutate(payload, {
        onError: (err) => {
          console.error('Onboarding submission error:', err);
        },
      });

      const timer = setTimeout(() => {
        navigate(PATHS.DASHBOARD);
      }, 4000);

      const interval = setInterval(() => {
        setLoadingDot(prev => (prev + 1) % 3);
      }, 400);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [isAnalyzing]);

  // Validation to allow proceeding to next step
  const isStepValid = () => {
    switch (currentStepConfig.step) {
      case 1:
        return store.addressType !== null;
      case 2:
        return store.therapyFormat !== null;
      case 3:
        return store.environments.length > 0;
      case 4:
        return store.concerns.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) return;

    if (currentStepIndex < onboardingData.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      navigate(PATHS.DASHBOARD);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else {
      navigate(PATHS.HOME);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 md:p-10 bg-gradient-to-br from-[#121927] via-[#1a2636] to-[#0f172a] text-white">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-4 z-10 relative max-w-[900px] w-full mx-auto">
        <img
          src={nexusLogo}
          alt="Nexus Mind"
          className="h-8 w-auto self-start cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate(PATHS.HOME)}
        />
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#E0E0E0] hover:text-white transition-colors self-start font-medium text-[15px]"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center relative z-10 w-full max-w-[900px] mx-auto">
        <div className="bg-[#243342]/75 backdrop-blur-xl border border-white/10 w-full min-h-[480px] sm:min-h-[580px] rounded-2xl p-6 sm:p-10 flex flex-col shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
          
          {/* Progress Bar */}
          {!isAnalyzing && (
            <div className="flex gap-3 mb-6 w-full max-w-[450px] mx-auto mt-2">
              {Array.from({ length: totalQuestionSteps }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    idx === currentStepIndex
                      ? 'bg-[#9f5bff] shadow-[0_0_12px_#9f5bff]'
                      : idx < currentStepIndex
                      ? 'bg-[#9f5bff]/50'
                      : 'bg-white/15'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Header Title / Subtitle */}
          {!isAnalyzing ? (
            <div className="text-center mb-8">
              <p className="text-[13px] text-white/60 mb-2 font-medium">
                Addım {currentStepConfig.step} / {totalQuestionSteps}
              </p>
              <h2 className="text-[28px] sm:text-[34px] font-bold text-white tracking-tight">
                {currentStepConfig.question}
              </h2>
              {currentStepConfig.subtitle && (
                <p className="text-[14px] text-white/70 mt-2">{currentStepConfig.subtitle}</p>
              )}
            </div>
          ) : (
            <div className="text-center mb-6 mt-4">
              <h2 className="text-[28px] sm:text-[36px] font-bold text-white tracking-tight">
                {currentStepConfig.message || 'Qeydlər analiz olunur'}
              </h2>
            </div>
          )}

          {/* Step Contents */}

          {/* STEP 1: Salutation (Single Choice Circular Avatars) */}
          {currentStepConfig.step === 1 && (
            <div className="flex flex-wrap justify-center gap-8 sm:gap-16 my-auto items-center py-6">
              {currentStepConfig.options?.map((option: OnboardingOptionConfig) => {
                const mappedEnum = GENDER_MAP[option.id];
                const isSelected = store.addressType === mappedEnum;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => store.setAddressType(mappedEnum)}
                    className="flex flex-col items-center gap-5 transition-all duration-300 group focus:outline-none"
                  >
                    <div
                      className={`w-[130px] h-[130px] sm:w-[170px] sm:h-[170px] rounded-full p-[3.5px] transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#b070ff] to-[#6020c0] scale-105 shadow-[0_0_25px_rgba(176,112,255,0.5)]'
                          : 'bg-white/10 hover:bg-gradient-to-br hover:from-[#9050d0]/60 hover:to-[#5015a0]/60 hover:scale-105'
                      }`}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-[#1E293B]">
                        {option.image && IMAGE_MAP[option.image] ? (
                          <img
                            src={IMAGE_MAP[option.image]}
                            alt={option.label}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/50">
                            Avatar
                          </div>
                        )}
                      </div>
                    </div>
                    <span
                      className={`text-[20px] sm:text-[24px] font-medium transition-colors ${
                        isSelected ? 'text-white font-semibold' : 'text-white/80 group-hover:text-white'
                      }`}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 2: Therapy Format & Counter Suboptions */}
          {currentStepConfig.step === 2 && (
            <div className="w-full max-w-[720px] mx-auto my-auto flex flex-col gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentStepConfig.options?.map((option: OnboardingOptionConfig) => {
                  const mappedEnum = THERAPY_MAP[option.id];
                  const isSelected = store.therapyFormat === mappedEnum;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => store.setTherapyFormat(mappedEnum)}
                      className={`flex items-center p-4 rounded-xl transition-all duration-300 gap-4 text-left border ${
                        isSelected
                          ? 'bg-white/15 border-[#9f5bff] shadow-[0_0_20px_rgba(159,91,255,0.3)]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="w-[64px] h-[64px] rounded-full overflow-hidden flex-shrink-0 bg-[#1E293B]">
                        {option.image && IMAGE_MAP[option.image] ? (
                          <img
                            src={IMAGE_MAP[option.image]}
                            alt={option.label}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">
                            Icon
                          </div>
                        )}
                      </div>
                      <span className="text-[20px] font-medium text-white">{option.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sub-options for Ailə (Family) */}
              {store.therapyFormat === 'AILE' && (
                <div className="mt-4 p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-4 animate-fade-in">
                  <p className="text-[14px] text-white/70 font-medium">Ailə tərkibini qeyd edin:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Valideyn Counter */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-[16px] font-medium text-white">Valideyn</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => store.setParentCount(store.parentCount - 1)}
                          disabled={store.parentCount <= 0}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center font-semibold text-[18px]">
                          {store.parentCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => store.setParentCount(store.parentCount + 1)}
                          className="w-8 h-8 rounded-full bg-[#9f5bff] hover:bg-[#b070ff] flex items-center justify-center transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Uşaq Counter */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-[16px] font-medium text-white">Uşaq</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => store.setChildCount(store.childCount - 1)}
                          disabled={store.childCount <= 0}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center font-semibold text-[18px]">
                          {store.childCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => store.setChildCount(store.childCount + 1)}
                          className="w-8 h-8 rounded-full bg-[#9f5bff] hover:bg-[#b070ff] flex items-center justify-center transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-options for Dostlar (Friends) */}
              {store.therapyFormat === 'DOSTLAR' && (
                <div className="mt-4 p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-4 animate-fade-in">
                  <p className="text-[14px] text-white/70 font-medium">Dost tərkibini qeyd edin:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Xanım Counter */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-[16px] font-medium text-white">Xanım</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => store.setFemaleCount(store.femaleCount - 1)}
                          disabled={store.femaleCount <= 0}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center font-semibold text-[18px]">
                          {store.femaleCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => store.setFemaleCount(store.femaleCount + 1)}
                          className="w-8 h-8 rounded-full bg-[#9f5bff] hover:bg-[#b070ff] flex items-center justify-center transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Bəy Counter */}
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-[16px] font-medium text-white">Bəy</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => store.setMaleCount(store.maleCount - 1)}
                          disabled={store.maleCount <= 0}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center font-semibold text-[18px]">
                          {store.maleCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => store.setMaleCount(store.maleCount + 1)}
                          className="w-8 h-8 rounded-full bg-[#9f5bff] hover:bg-[#b070ff] flex items-center justify-center transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Environment Selection (Multiple Choice - Max 3) */}
          {currentStepConfig.step === 3 && (
            <div className="w-full max-w-[740px] mx-auto my-auto py-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {currentStepConfig.options?.map((option: OnboardingOptionConfig) => {
                  const mappedEnum = ENV_MAP[option.id];
                  const isSelected = store.environments.includes(mappedEnum);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => store.toggleEnvironment(mappedEnum, currentStepConfig.maxSelections || 3)}
                      className={`flex flex-col items-center justify-center p-5 rounded-xl transition-all duration-300 gap-3 border ${
                        isSelected
                          ? 'bg-white/15 border-[#9f5bff] shadow-[0_0_20px_rgba(159,91,255,0.35)] scale-[1.02]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] rounded-full overflow-hidden flex-shrink-0 bg-[#1E293B]">
                        {option.image && IMAGE_MAP[option.image] ? (
                          <img
                            src={IMAGE_MAP[option.image]}
                            alt={option.label}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
                            Image
                          </div>
                        )}
                      </div>
                      <span className="text-[17px] sm:text-[19px] font-medium text-white text-center">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Concerns Selection (Multiple Choice - Max 3) */}
          {currentStepConfig.step === 4 && (
            <div className="w-full max-w-[740px] mx-auto my-auto py-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {currentStepConfig.options?.map((option: OnboardingOptionConfig) => {
                  const mappedEnum = ISSUE_MAP[option.id];
                  const isSelected = store.concerns.includes(mappedEnum);
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => store.toggleConcern(mappedEnum, currentStepConfig.maxSelections || 3)}
                      className={`flex flex-col items-center justify-center p-5 rounded-xl transition-all duration-300 gap-3 border ${
                        isSelected
                          ? 'bg-white/15 border-[#9f5bff] shadow-[0_0_20px_rgba(159,91,255,0.35)] scale-[1.02]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] rounded-full overflow-hidden flex-shrink-0 bg-[#1E293B]">
                        {option.image && IMAGE_MAP[option.image] ? (
                          <img
                            src={IMAGE_MAP[option.image]}
                            alt={option.label}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
                            Image
                          </div>
                        )}
                      </div>
                      <span className="text-[17px] sm:text-[19px] font-medium text-white text-center">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Loading / Analyzing State */}
          {isAnalyzing && (
            <div className="flex flex-col items-center flex-1 justify-center py-6">
              <div className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full overflow-hidden bg-[#1E293B] shadow-[0_0_45px_rgba(159,91,255,0.3)] mb-10 border-2 border-[#9f5bff]/50 relative">
                {IMAGE_MAP['analyzing.png'] ? (
                  <img
                    src={IMAGE_MAP['analyzing.png']}
                    alt="analyzing"
                    className="w-full h-full object-cover animate-pulse"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#2a3a46] text-white/40">
                    Analyzing
                  </div>
                )}
              </div>

              {/* Animated Dots */}
              <div className="flex gap-3">
                {[0, 1, 2].map((idx) => {
                  const isGlowing = loadingDot === idx;
                  return (
                    <div
                      key={idx}
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                        isGlowing
                          ? 'bg-[#ffb040] shadow-[0_0_12px_rgba(255,176,64,0.8)] scale-125'
                          : 'bg-white/30'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Action Navigation Buttons */}
          {!isAnalyzing && (
            <div className={`mt-auto pt-6 flex ${currentStepIndex > 0 ? 'justify-between' : 'justify-end'}`}>
              {currentStepIndex > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl transition-all duration-300 text-[16px] font-medium"
                >
                  {currentStepConfig.actions?.secondary || 'Geri'}
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`bg-[#9f5bff] hover:bg-[#b070ff] text-white px-10 py-3 rounded-xl transition-all duration-300 text-[16px] font-medium shadow-[0_0_20px_rgba(159,91,255,0.4)] ${
                  !isStepValid() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {currentStepConfig.actions?.primary ||
                  (currentStepIndex === totalQuestionSteps - 1 ? 'Əsas səhifə' : 'Sonrakı')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
