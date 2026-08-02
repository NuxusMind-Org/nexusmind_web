import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  RotateCcw,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Heart,
  CloudRain,
  Waves,
  Trees,
  Home,
  Music2,
} from 'lucide-react';
import { PATHS } from '@/routes/paths';
import musicCover from '@/assets/nexusmindAppInterface.jpeg';

export const BreathingGamePage = () => {
  const navigate = useNavigate();

  // Exercise & Audio State
  const [selectedExercise, setSelectedExercise] = useState('Sakitləşdirici (4-7-8)');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedAtmosphere, setSelectedAtmosphere] = useState('Yağış');

  // Breathing Animation / Control State
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathCount, setBreathCount] = useState(4);
  const [breathPhase, setBreathPhase] = useState('Nəfəs al');

  const exerciseOptions = [
    'Sakitləşdirici (4-7-8)',
    'Enerji verən',
    'Dərin yuxu',
  ];

  const atmosphereOptions = [
    { id: 'Yağış', label: 'Yağış', icon: CloudRain },
    { id: 'Dəniz', label: 'Dəniz', icon: Waves },
    { id: 'Meşə', label: 'Meşə', icon: Trees },
    { id: 'Şəhər', label: 'Şəhər', icon: Home },
  ];

  const handleStartToggle = () => {
    setIsBreathingActive(!isBreathingActive);
  };

  const handleReset = () => {
    setIsBreathingActive(false);
    setBreathCount(4);
    setBreathPhase('Nəfəs al');
  };

  return (
    <div className="w-full flex flex-col rounded-none lg:rounded-[38.93px] min-h-full overflow-hidden shadow-none lg:shadow-2xl bg-[#F8FAFC] animate-fade-in pb-12">
      {/* 1. Header Banner Section */}
      <div
        className="w-full relative px-4 sm:px-8 py-10 sm:py-12 flex flex-col items-center justify-center text-center border-b border-black/5 rounded-none lg:rounded-t-[38.93px] shrink-0"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        {/* Top-Right Close Button */}
        <button
          onClick={() => navigate(PATHS.WEBAPP_MINI_GAMES)}
          className="absolute top-5 right-5 sm:top-8 sm:right-8 text-[#1E0A42]/70 hover:text-[#1E0A42] hover:bg-black/5 p-2 rounded-full transition-colors cursor-pointer z-10"
          aria-label="Kapat"
        >
          <X size={24} />
        </button>

        {/* Centered Main Title */}
        <h1 className="text-[26px] sm:text-[34px] md:text-[42px] font-normal text-[#1E0A42] tracking-[-0.96px] leading-tight font-['Lexend',_sans-serif] max-w-[900px]">
          Standart texnika ilə nəfəs al !
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg font-semibold text-[#7B2CBF] mt-1.5 font-['Lexend',_sans-serif]">
          İlkin olaraq texnikanı öyrənməyi unutma
        </p>
      </div>

      {/* 2. Main Game Layout Grid */}
      <div className="px-4 sm:px-6 md:px-10 py-8 flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-6 w-full max-w-[1280px] mx-auto flex-1">
        
        {/* LEFT COLUMN: Exercise Type & Music Player */}
        <div className="w-full lg:w-[300px] xl:w-[330px] flex flex-col gap-5 shrink-0">
          
          {/* Card 1: MƏŞQ NÖVÜ */}
          <div className="bg-[#351465] text-white rounded-[24px] p-5 sm:p-6 shadow-md flex flex-col text-left">
            <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest mb-4">
              MƏŞQ NÖVÜ
            </span>
            <div className="flex flex-col gap-2.5">
              {exerciseOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedExercise(opt)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all cursor-pointer ${
                    selectedExercise === opt
                      ? 'bg-white/20 text-white font-semibold border border-white/30 shadow-inner'
                      : 'bg-white/5 hover:bg-white/10 text-white/80 border border-transparent'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Card 2: Sakitlik Musiqisi (Audio Player) */}
          <div className="bg-[#351465] text-white rounded-[24px] p-5 sm:p-6 shadow-md flex flex-col text-left">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={musicCover}
                  alt="Music Cover"
                  className="w-12 h-12 rounded-xl object-cover shadow-sm border border-white/10"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-snug">
                    Sakitlik Musiqisi
                  </span>
                  <span className="text-xs text-white/60">
                    NexusMind Ambient
                  </span>
                </div>
              </div>
              <Music2 size={18} className="text-white/60" />
            </div>

            {/* Media Controls */}
            <div className="flex items-center justify-center gap-4 my-2">
              <button className="text-white/70 hover:text-white transition-colors cursor-pointer">
                <SkipBack size={18} />
              </button>
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-9 h-9 rounded-full bg-white text-[#351465] hover:bg-gray-100 flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow"
              >
                {isPlayingAudio ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
              </button>
              <button className="text-white/70 hover:text-white transition-colors cursor-pointer">
                <SkipForward size={18} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/20 rounded-full mt-3 overflow-hidden relative">
              <div className="w-1/3 h-full bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Breathing Circle Widget & Controls */}
        <div className="flex-1 flex flex-col items-center justify-center py-6 px-2 w-full">
          {/* Concentric Breathing Circle */}
          <div className="relative flex items-center justify-center my-4">
            {/* Outer Ring */}
            <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] rounded-full border-[3px] border-[#7B2CBF]/30 flex items-center justify-center transition-all duration-1000">
              {/* Middle Ring */}
              <div className="w-[85%] h-[85%] rounded-full border-[5px] border-[#7B2CBF] flex items-center justify-center transition-all duration-1000 shadow-[0_0_20px_rgba(123,44,191,0.2)]">
                {/* Inner Circle */}
                <div className="w-[82%] h-[82%] rounded-full bg-[#351465] flex items-center justify-center text-white font-bold text-[56px] sm:text-[72px] md:text-[84px] shadow-2xl transition-all duration-1000">
                  {breathCount}
                </div>
              </div>
            </div>
          </div>

          {/* Phase Title Below Circle */}
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#1E0A42] tracking-tight font-['Lexend',_sans-serif] mt-2 mb-6">
            {breathPhase}
          </h2>

          {/* Controls Bar Underneath */}
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-12 h-12 rounded-full bg-[#9B6AD6]/40 hover:bg-[#9B6AD6]/60 text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
              title="Yenidən başlat"
            >
              <RotateCcw size={20} />
            </button>

            {/* Main Action Button */}
            <button
              onClick={handleStartToggle}
              className="px-10 sm:px-12 py-3.5 bg-white hover:bg-gray-50 text-[#351465] font-bold text-base sm:text-lg rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              {isBreathingActive ? 'Pauza' : 'Başla'}
            </button>

            {/* Status Indicator Circle */}
            <div className="w-12 h-12 rounded-full bg-[#9B6AD6]/40 flex items-center justify-center shadow-md">
              <div className={`w-4 h-4 rounded-full ${isBreathingActive ? 'bg-[#4ADE80] shadow-[0_0_10px_#4ADE80]' : 'bg-gray-300'}`} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Today's Progress, Heart Rate & Background Atmosphere */}
        <div className="w-full lg:w-[300px] xl:w-[330px] flex flex-col gap-5 shrink-0">
          
          {/* Card 1: BUGÜNKÜ TƏRƏQQİ */}
          <div className="bg-[#351465] text-white rounded-[24px] p-5 sm:p-6 shadow-md flex flex-col text-left">
            <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest mb-3">
              BUGÜNKÜ TƏRƏQQİ
            </span>
            <div className="flex items-center justify-between text-xs font-semibold text-white/90 mb-1.5">
              <div className="w-full bg-white/20 h-2 rounded-full mr-3 overflow-hidden">
                <div className="bg-white h-full w-[75%] rounded-full" />
              </div>
              <span className="shrink-0">15/20 dəq</span>
            </div>
            <p className="text-xs text-white/70 font-normal leading-relaxed mt-2">
              Hədəfə çatmağa 5 dəqiqə qaldı. Davam edin!
            </p>
          </div>

          {/* Card 2: Ürək ritmi */}
          <div className="bg-[#351465] text-white rounded-[24px] p-5 sm:p-6 shadow-md flex flex-col text-left relative">
            <div className="flex items-center justify-between mb-2">
              <Heart size={20} className="text-white" />
              <span className="bg-white/10 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white/70">
                Yeni
              </span>
            </div>
            <h3 className="text-base font-bold text-white font-['Lexend',_sans-serif]">
              Ürək ritmi
            </h3>
            <p className="text-xs text-white/70 font-normal leading-relaxed mt-1">
              Nəfəs məşqi ürək ritminizi 12% aşağı salır.
            </p>
          </div>

          {/* Card 3: FON ŞƏKLİ */}
          <div className="bg-[#351465] text-white rounded-[24px] p-5 sm:p-6 shadow-md flex flex-col text-left">
            <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest mb-4">
              FON ŞƏKLİ
            </span>
            <div className="grid grid-cols-4 gap-2.5">
              {atmosphereOptions.map((item) => {
                const IconComponent = item.icon;
                const isSelected = selectedAtmosphere === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedAtmosphere(item.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white/20 border border-white/40 shadow-inner'
                        : 'bg-white/5 hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <IconComponent size={20} className="text-white mb-1" />
                    <span className="text-[10px] font-medium text-white/80">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
