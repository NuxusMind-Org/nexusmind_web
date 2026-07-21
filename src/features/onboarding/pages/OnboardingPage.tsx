import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PATHS } from '@/routes/paths';
import onboardingData from '../data/onboardingData.json';
import nexusLogo from '@/assets/svg/NexusMindLogo.svg';
import { IMAGE_MAP } from '../constants/imageMap';

interface OnboardingOption {
  id: string;
  label: string;
  image: string;
}


export const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [loadingDot, setLoadingDot] = useState(0);

  const totalSteps = onboardingData.filter(q => q.layout !== 'analyzing').length;
  const currentQuestion = onboardingData[currentStep];
  const isAnalyzing = currentQuestion.layout === 'analyzing';

  useEffect(() => {
    if (isAnalyzing) {
      const timer = setTimeout(() => {
        navigate(PATHS.HOME);
      }, 5000);

      const interval = setInterval(() => {
        setLoadingDot(prev => (prev + 1) % 3);
      }, 400);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [isAnalyzing, navigate]);

  const handleOptionClick = (optionId: string) => {
    if (currentQuestion.maxSelections && currentQuestion.maxSelections > 1) {
      if (selectedOptions.includes(optionId)) {
        setSelectedOptions(selectedOptions.filter(id => id !== optionId));
      } else {
        if (selectedOptions.length < currentQuestion.maxSelections) {
          setSelectedOptions([...selectedOptions, optionId]);
        }
      }
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const handleNext = () => {
    if (selectedOptions.length > 0) {
      if (currentStep < onboardingData.length - 1) {
        setCurrentStep(prev => prev + 1);
        setSelectedOptions([]);
      } else {
        navigate(PATHS.DASHBOARD);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setSelectedOptions([]);
    } else {
      navigate(PATHS.HOME);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col gap-6 mb-4 z-10 relative">
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

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="bg-[#2a3a46]/70 backdrop-blur-md border border-white/10 w-full max-w-[800px] h-full min-h-[450px] sm:min-h-[550px] rounded-lg p-5 sm:p-8 md:p-12 relative flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

          {/* Progress Bar */}
          {!isAnalyzing && (
            <div className="flex gap-3 mb-6 w-full max-w-[450px] mx-auto mt-4">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${idx === currentStep ? 'bg-[#9f5bff] shadow-[0_0_10px_#9f5bff]' : idx < currentStep ? 'bg-[#9f5bff]/50' : 'bg-white/20'}`}
                />
              ))}
            </div>
          )}

          {!isAnalyzing ? (
            <div className="text-center mb-10">
              <p className="text-[13px] text-white/60 mb-6">Addım {currentStep + 1} / {totalSteps}</p>
              <h2 className="text-[32px] sm:text-[36px] font-bold text-white tracking-tight">
                {currentQuestion.question}
              </h2>
            </div>
          ) : (
            <div className="text-center mb-10 mt-6">
              <h2 className="text-[32px] sm:text-[36px] font-bold text-white tracking-tight mb-12">
                {currentQuestion.question}
              </h2>
            </div>
          )}

          {/* Options */}
          {isAnalyzing ? (
            <div className="flex flex-col items-center flex-1 justify-center">
              <div className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden bg-[#1E293B] shadow-[0_0_40px_rgba(159,91,255,0.2)] mb-10 sm:mb-16">
                {IMAGE_MAP[currentQuestion.image as string] ? (
                  <img src={IMAGE_MAP[currentQuestion.image as string]} alt="analyzing" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#2a3a46] text-white/30 text-[14px]">
                    Image
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                {[0, 1, 2].map((idx) => {
                  const isGlowing = loadingDot === idx;
                  return (
                    <div
                      key={idx}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${isGlowing ? 'bg-[#ffb040] shadow-[0_0_10px_rgba(255,176,64,0.6)] scale-110' : 'bg-white/40'}`}
                    />
                  );
                })}
              </div>
            </div>
          ) : currentQuestion.layout === 'cards' ? (
            <div className="w-full flex flex-col items-center mb-8 flex-1 justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 w-full max-w-[700px]">
                {currentQuestion.options.map((option: OnboardingOption) => {
                  const isSelected = selectedOptions.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionClick(option.id)}
                      className={`flex flex-col items-center justify-center p-6 rounded-lg transition-all duration-300 gap-4 ${isSelected ? 'bg-white/20 border-2 border-[#9f5bff] shadow-[0_0_15px_rgba(159,91,255,0.3)]' : 'bg-white/5 border-2 border-transparent hover:bg-white/10'}`}
                    >
                      <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full overflow-hidden flex-shrink-0 bg-[#1E293B]">
                        {IMAGE_MAP[option.image] ? (
                          <img src={IMAGE_MAP[option.image]} alt={option.label} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#2a3a46] text-white/30 text-[12px]" />
                        )}
                      </div>
                      <span className={`text-[18px] sm:text-[20px] font-medium transition-colors ${isSelected ? 'text-white' : 'text-white/90'}`}>
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {currentQuestion.maxSelections && (
                <p className="text-[13px] text-white/70 w-full max-w-[700px] text-left mt-2">
                  {currentQuestion.maxSelections} versiya seçə bilərsən
                </p>
              )}
            </div>
          ) : currentQuestion.layout === 'circles' ? (
            <div className="flex flex-wrap justify-center gap-6 sm:gap-12 md:gap-20 mb-8 flex-1 items-center">
              {currentQuestion.options.map((option: OnboardingOption) => {
                const isSelected = selectedOptions.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option.id)}
                    className="flex flex-col items-center gap-5 transition-all duration-300 group"
                  >
                    <div className={`w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px] rounded-full p-[3px] transition-all duration-300 ${isSelected ? 'bg-gradient-to-br from-[#b070ff] to-[#6020c0] scale-105 shadow-[0_0_20px_rgba(176,112,255,0.4)]' : 'bg-gradient-to-br from-[#7030a0] to-[#401080] hover:scale-105 hover:bg-gradient-to-br hover:from-[#9050d0] hover:to-[#5015a0]'}`}>
                      <div className="w-full h-full rounded-full overflow-hidden bg-[#1E293B]">
                        {IMAGE_MAP[option.image] ? (
                          <img src={IMAGE_MAP[option.image]} alt={option.label} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/50">Image</div>
                        )}
                      </div>
                    </div>
                    <span className={`text-[18px] sm:text-[20px] md:text-[24px] font-medium transition-colors ${isSelected ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 w-full max-w-[700px] mx-auto flex-1 content-center">
              {currentQuestion.options.map((option: OnboardingOption) => {
                const isSelected = selectedOptions.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option.id)}
                    className={`flex items-center p-3 rounded-lg transition-all duration-300 gap-6 ${isSelected ? 'bg-white/20 border-2 border-[#9f5bff] shadow-[0_0_15px_rgba(159,91,255,0.3)]' : 'bg-white/10 border-2 border-transparent hover:bg-white/15'}`}
                  >
                    <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full overflow-hidden flex-shrink-0 bg-[#1E293B]">
                      {IMAGE_MAP[option.image] ? (
                        <img src={IMAGE_MAP[option.image]} alt={option.label} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/50 text-xs">Image</div>
                      )}
                    </div>
                    <span className={`text-[20px] font-medium transition-colors ${isSelected ? 'text-white' : 'text-white/90'}`}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={`mt-auto flex ${currentStep > 0 ? 'justify-between' : 'justify-end'}`}>
            {currentStep > 0 && (
              <button
                onClick={() => {
                  setCurrentStep(prev => prev - 1);
                  setSelectedOptions([]);
                }}
                className="bg-[#9f5bff]/20 hover:bg-[#9f5bff]/40 text-white px-10 py-3 rounded-lg border border-transparent hover:border-[#9f5bff]/50 transition-all duration-300 text-[16px] font-medium hover:shadow-[0_0_15px_rgba(159,91,255,0.3)]"
              >
                Geri
              </button>
            )}
            {!isAnalyzing && (
              <button
                onClick={handleNext}
                disabled={selectedOptions.length === 0}
                className={`bg-[#9f5bff] hover:bg-[#b070ff] text-white px-10 py-3 rounded-lg border-0 transition-all duration-300 text-[16px] font-medium hover:shadow-[0_0_25px_rgba(159,91,255,0.5)] ${selectedOptions.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {currentStep === totalSteps - 1 ? 'Əsas səhifə' : 'Sonrakı'}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
