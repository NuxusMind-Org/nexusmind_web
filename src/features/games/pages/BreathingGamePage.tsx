import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import { PATHS } from '@/routes/paths';
import musicCover from '@/assets/nexusmindAppInterface.jpeg';
import { LandingNavbar } from '@/features/landing/components/LandingNavbar';
import { Footer } from '@/features/landing/components/Footer';

export const BreathingGamePage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Exercise & Audio State
  const [selectedExercise, setSelectedExercise] = useState('calming');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedAtmosphere, setSelectedAtmosphere] = useState('rain');

  // Breathing Animation / Control State
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathCount, setBreathCount] = useState(4);
  const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out'>('in');

  const exerciseOptions = [
    { key: 'calming', label: t('webapp.miniGames.breathingGame.calming', 'Sakitləşdirici') },
    { key: 'energizing', label: t('webapp.miniGames.breathingGame.energizing', 'Enerji verən') },
    { key: 'deepSleep', label: t('webapp.miniGames.breathingGame.deepSleep', 'Dərin Yuxu') },
  ];

  const atmosphereOptions = [
    { id: 'rain', label: t('webapp.miniGames.breathingGame.rain', 'Yağış'), icon: 'lucide:cloud-rain' },
    { id: 'sea', label: t('webapp.miniGames.breathingGame.sea', 'Dəniz'), icon: 'lucide:waves' },
    { id: 'forest', label: t('webapp.miniGames.breathingGame.forest', 'Meşə'), icon: 'lucide:trees' },
    { id: 'city', label: t('webapp.miniGames.breathingGame.city', 'Şəhər'), icon: 'lucide:home' },
  ];

  // Active breathing loop
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathCount((prev) => {
          if (prev <= 1) {
            setBreathPhase((currentPhase) => {
              if (currentPhase === 'in') return 'hold';
              if (currentPhase === 'hold') return 'out';
              return 'in';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isBreathingActive]);

  const handleStartToggle = () => {
    setIsBreathingActive(!isBreathingActive);
  };

  const handleReset = () => {
    setIsBreathingActive(false);
    setBreathCount(4);
    setBreathPhase('in');
  };

  const breathPhaseText =
    breathPhase === 'in'
      ? t('webapp.miniGames.breathingGame.breatheIn', 'Nəfəs Al')
      : breathPhase === 'hold'
      ? t('webapp.miniGames.breathingGame.hold', 'Saxla')
      : t('webapp.miniGames.breathingGame.breatheOut', 'Nəfəs Ver');

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="mini-games" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(PATHS.MINI_GAMES)}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer group"
          >
            <AppIcon icon="lucide:arrow-left" size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">{t('webapp.miniGames.backToTechniques', 'Bütün texnikalar')}</span>
          </button>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-sans font-light text-white tracking-tight">
              {t('webapp.miniGames.breathingGame.title', 'Nəfəs Məşqi')}
            </h1>
            <p className="text-white/60 text-xs sm:text-sm">
              {t('webapp.miniGames.breathingGame.subtitle', 'Dərindən nəfəs alın və rahatlayın')}
            </p>
          </div>

          <div className="w-20" />
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6 items-stretch w-full">
          {/* LEFT COLUMN: Exercise Type & Music Player */}
          <div className="flex flex-col gap-5">
            {/* Exercise Type Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col text-left">
              <span className="text-xs font-bold text-[#03C6B2] uppercase tracking-widest mb-4">
                {t('webapp.miniGames.breathingGame.exerciseType', 'Məşq Növü')}
              </span>
              <div className="flex flex-col gap-2.5">
                {exerciseOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setSelectedExercise(opt.key)}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all cursor-pointer ${
                      selectedExercise === opt.key
                        ? 'bg-purple-600/40 text-[#03C6B2] font-semibold border border-purple-400/30 shadow-inner'
                        : 'bg-white/5 hover:bg-white/10 text-white/80 border border-transparent'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ambient Music Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col text-left">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={musicCover}
                    alt="Music Cover"
                    className="w-12 h-12 rounded-2xl object-cover shadow-md border border-white/15"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white leading-snug">
                      {t('webapp.miniGames.breathingGame.ambientMusic', 'Sakitlik Melodiyası')}
                    </span>
                    <span className="text-xs text-white/60">
                      {t('webapp.miniGames.breathingGame.ambientArtist', 'NexusMind Zen')}
                    </span>
                  </div>
                </div>
                <AppIcon icon="lucide:music-2" size={20} className="text-[#03C6B2]" />
              </div>

              {/* Media Controls */}
              <div className="flex items-center justify-center gap-4 my-2">
                <button className="text-white/60 hover:text-white transition-colors cursor-pointer">
                  <AppIcon icon="lucide:skip-back" size={18} />
                </button>
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-10 h-10 rounded-full bg-[#03C6B2] text-[#111] hover:opacity-90 flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-lg"
                >
                  {isPlayingAudio ? (
                    <AppIcon icon="lucide:pause" size={18} fill="currentColor" />
                  ) : (
                    <AppIcon icon="lucide:play" size={18} fill="currentColor" className="ml-0.5" />
                  )}
                </button>
                <button className="text-white/60 hover:text-white transition-colors cursor-pointer">
                  <AppIcon icon="lucide:skip-forward" size={18} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden relative">
                <div className="w-1/3 h-full bg-[#03C6B2] rounded-full" />
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Breathing Visualizer & Controls */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[460px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

            {/* Concentric Breathing Circle */}
            <div className="relative flex items-center justify-center my-6">
              {/* Outer Ring */}
              <div
                className={`w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-full border-2 border-purple-400/30 flex items-center justify-center transition-all duration-1000 ${
                  isBreathingActive && breathPhase === 'in' ? 'scale-110 border-[#03C6B2]/50' : 'scale-100'
                }`}
              >
                {/* Middle Ring */}
                <div
                  className={`w-[85%] h-[85%] rounded-full border-4 border-purple-500/60 flex items-center justify-center transition-all duration-1000 shadow-[0_0_30px_rgba(168,85,247,0.2)] ${
                    isBreathingActive && breathPhase === 'in' ? 'border-[#03C6B2]' : ''
                  }`}
                >
                  {/* Inner Center Circle */}
                  <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-purple-900 to-indigo-900/90 border border-white/20 flex flex-col items-center justify-center text-white font-bold text-6xl sm:text-7xl shadow-2xl">
                    <span>{breathCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase Title */}
            <h2 className="text-2xl sm:text-3xl font-sans font-light text-white tracking-wide mt-2 mb-6">
              {breathPhaseText}
            </h2>

            {/* Controls Bar */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={handleReset}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 border border-white/15"
                title={t('webapp.miniGames.breathingGame.restart', 'Yenidən Başla')}
              >
                <AppIcon icon="lucide:rotate-ccw" size={18} />
              </button>

              <button
                onClick={handleStartToggle}
                className="px-10 py-3.5 bg-gradient-to-r from-purple-600 to-[#03C6B2] hover:opacity-90 text-white font-semibold text-base sm:text-lg rounded-full shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                {isBreathingActive
                  ? t('webapp.miniGames.breathingGame.pause', 'Dayandır')
                  : t('webapp.miniGames.breathingGame.start', 'Başla')}
              </button>

              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shadow-lg">
                <div
                  className={`w-3.5 h-3.5 rounded-full ${
                    isBreathingActive ? 'bg-emerald-400 shadow-[0_0_10px_#4ade80]' : 'bg-white/30'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Progress & Atmosphere */}
          <div className="flex flex-col gap-5">
            {/* Progress Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col text-left">
              <span className="text-xs font-bold text-[#03C6B2] uppercase tracking-widest mb-3">
                {t('webapp.miniGames.breathingGame.todayProgress', 'Bugünkü Tərəqqi')}
              </span>
              <div className="flex items-center justify-between text-xs font-semibold text-white/90 mb-2">
                <div className="w-full bg-white/15 h-2 rounded-full mr-3 overflow-hidden">
                  <div className="bg-[#03C6B2] h-full w-[75%] rounded-full" />
                </div>
                <span className="shrink-0">{`15/20 ${
                  i18n.language === 'en' ? 'min' : i18n.language === 'ru' ? 'мин' : 'dəq'
                }`}</span>
              </div>
              <p className="text-xs text-white/70 font-normal leading-relaxed">
                {t(
                  'webapp.miniGames.breathingGame.progressDesc',
                  'Gündəlik 20 dəqiqəlik hədəfinizə çatmağa 5 dəqiqə qaldı.'
                )}
              </p>
            </div>

            {/* Heart Rate Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col text-left">
              <div className="flex items-center justify-between mb-2">
                <AppIcon icon="lucide:heart" size={20} className="text-rose-400" />
                <span className="bg-white/10 text-[10px] font-semibold px-2 py-0.5 rounded-full text-[#03C6B2]">
                  {t('webapp.miniGames.breathingGame.new', 'Stabil')}
                </span>
              </div>
              <h3 className="text-base font-bold text-white font-sans">
                {t('webapp.miniGames.breathingGame.heartRate', 'Ürək Ritmi')}
              </h3>
              <p className="text-xs text-white/70 font-normal leading-relaxed mt-1">
                {t(
                  'webapp.miniGames.breathingGame.heartRateDesc',
                  'Dərin nəfəs seansı zamanı ürək döyüntüləri 12% sabitləşir.'
                )}
              </p>
            </div>

            {/* Background Atmosphere Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col text-left">
              <span className="text-xs font-bold text-[#03C6B2] uppercase tracking-widest mb-4">
                {t('webapp.miniGames.breathingGame.backgroundAtmosphere', 'Fon Atmosferi')}
              </span>
              <div className="grid grid-cols-4 gap-2">
                {atmosphereOptions.map((item) => {
                  const isSelected = selectedAtmosphere === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedAtmosphere(item.id)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600/40 border border-[#03C6B2]/50 shadow-inner'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <AppIcon
                        icon={item.icon}
                        size={20}
                        className={`mb-1 ${isSelected ? 'text-[#03C6B2]' : 'text-white'}`}
                      />
                      <span className="text-[10px] font-medium text-white/80">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
