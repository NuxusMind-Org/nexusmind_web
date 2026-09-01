import { useState, useEffect, useRef } from 'react';
import { Check, Loader2, Clock } from 'lucide-react';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useUpdateMood } from '@/features/auth/hooks/useUpdateMood';
import type { PatientMood, JournalMood } from '@/api/types';

interface Mood {
  id: string;
  label: string;
  color: string;
  position: number;
  backendMood: PatientMood;
  journalMood: JournalMood;
  renderEmoji: (isActive: boolean) => React.ReactNode;
}

interface MoodSelectorProps {
  showTitle?: boolean;
  className?: string;
  titlePl?: string;
  initialJournalMood?: JournalMood;
  autoSubmit?: boolean;
  onMoodChange?: (journalMood: JournalMood, patientMood: PatientMood) => void;
}

const MOODS: Mood[] = [
  {
    id: 'very_bad',
    label: 'Çox Pis',
    color: 'text-[#ea4335]',
    position: 0,
    backendMood: 'SAD',
    journalMood: 'VERY_LOW',
    renderEmoji: (isActive) => (
      <svg
        viewBox="0 0 64 64"
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-md cursor-pointer transition-all duration-300 ${
          isActive ? 'scale-110 ring-4 ring-[#ea4335]/30' : 'hover:scale-105 opacity-80 hover:opacity-100'
        }`}
      >
        <circle cx="32" cy="32" r="30" fill="#ea4335" />
        <path d="M20,24 L28,32 M28,24 L20,32" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M36,24 L44,32 M44,24 L36,32" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M20,46 C24,39 40,39 44,46" stroke="white" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'bad',
    label: 'Pis',
    color: 'text-[#fbbc05]',
    position: 25,
    backendMood: 'TIRED',
    journalMood: 'LOW',
    renderEmoji: (isActive) => (
      <svg
        viewBox="0 0 64 64"
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-md cursor-pointer transition-all duration-300 ${
          isActive ? 'scale-110 ring-4 ring-[#fbbc05]/30' : 'hover:scale-105 opacity-80 hover:opacity-100'
        }`}
      >
        <circle cx="32" cy="32" r="30" fill="#fbbc05" />
        <circle cx="23" cy="26" r="3.5" fill="white" />
        <circle cx="41" cy="26" r="3.5" fill="white" />
        <path d="M22,45 Q32,36 42,45" stroke="white" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'normal',
    label: 'Normal',
    color: 'text-[#34a853]',
    position: 50,
    backendMood: 'NORMAL',
    journalMood: 'NEUTRAL',
    renderEmoji: (isActive) => (
      <svg
        viewBox="0 0 64 64"
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-md cursor-pointer transition-all duration-300 ${
          isActive ? 'scale-110 ring-4 ring-[#34a853]/30' : 'hover:scale-105 opacity-80 hover:opacity-100'
        }`}
      >
        <circle cx="32" cy="32" r="30" fill="#34a853" />
        <circle cx="23" cy="26" r="3.5" fill="white" />
        <circle cx="41" cy="26" r="3.5" fill="white" />
        <line x1="22" y1="43" x2="42" y2="43" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'good',
    label: 'Yaxşı',
    color: 'text-[#46bdc6]',
    position: 75,
    backendMood: 'CALM',
    journalMood: 'GOOD',
    renderEmoji: (isActive) => (
      <svg
        viewBox="0 0 64 64"
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-md cursor-pointer transition-all duration-300 ${
          isActive ? 'scale-110 ring-4 ring-[#46bdc6]/30' : 'hover:scale-105 opacity-80 hover:opacity-100'
        }`}
      >
        <circle cx="32" cy="32" r="30" fill="#46bdc6" />
        <circle cx="23" cy="26" r="3.5" fill="white" />
        <circle cx="41" cy="26" r="3.5" fill="white" />
        <path d="M22,39 Q32,49 42,39" stroke="white" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'excellent',
    label: 'Əla',
    color: 'text-[#4285f4]',
    position: 100,
    backendMood: 'HAPPY',
    journalMood: 'VERY_GOOD',
    renderEmoji: (isActive) => (
      <svg
        viewBox="0 0 64 64"
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-md cursor-pointer transition-all duration-300 ${
          isActive ? 'scale-110 ring-4 ring-[#4285f4]/30' : 'hover:scale-105 opacity-80 hover:opacity-100'
        }`}
      >
        <circle cx="32" cy="32" r="30" fill="#4285f4" />
        <path d="M23,17 L25,22 L30,23 L25,24 L23,29 L21,24 L16,23 L21,22 Z" fill="white" />
        <path d="M41,17 L43,22 L48,23 L43,24 L41,29 L39,24 L34,23 L39,22 Z" fill="white" />
        <path d="M20,38 Q32,50 44,38 Z" fill="white" />
      </svg>
    ),
  },
];

const REVERSE_MOOD_MAP: Record<PatientMood, { id: string; position: number }> = {
  SAD: { id: 'very_bad', position: 0 },
  TIRED: { id: 'bad', position: 25 },
  NORMAL: { id: 'normal', position: 50 },
  CALM: { id: 'good', position: 75 },
  HAPPY: { id: 'excellent', position: 100 },
};

const REVERSE_JOURNAL_MOOD_MAP: Record<JournalMood, { id: string; position: number }> = {
  VERY_LOW: { id: 'very_bad', position: 0 },
  LOW: { id: 'bad', position: 25 },
  NEUTRAL: { id: 'normal', position: 50 },
  GOOD: { id: 'good', position: 75 },
  VERY_GOOD: { id: 'excellent', position: 100 },
};

export const MoodSelector = ({
  showTitle = true,
  className = "w-full bg-white px-4 sm:px-6 md:px-[48px] py-8 sm:py-12 flex flex-col justify-start select-none",
  titlePl = "pl-[20px] md:pl-[40px] mb-6",
  initialJournalMood,
  autoSubmit = true,
  onMoodChange,
}: MoodSelectorProps) => {
  const { data: user } = useCurrentUser();
  const updateMoodMutation = useUpdateMood();

  const [activeMoodId, setActiveMoodId] = useState<string>('normal');
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'pending' | 'saving' | 'saved' | 'error'>('idle');

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasUserInteracted = useRef(false);

  // Sync initial mood from journal or backend when user profile loads
  useEffect(() => {
    if (!hasUserInteracted.current) {
      if (initialJournalMood && REVERSE_JOURNAL_MOOD_MAP[initialJournalMood]) {
        const moodConfig = REVERSE_JOURNAL_MOOD_MAP[initialJournalMood];
        setActiveMoodId(moodConfig.id);
        setSliderValue(moodConfig.position);
      } else if (user && 'mood' in user && user.mood) {
        const moodConfig = REVERSE_MOOD_MAP[user.mood as PatientMood];
        if (moodConfig) {
          setActiveMoodId(moodConfig.id);
          setSliderValue(moodConfig.position);
        }
      }
    }
  }, [user, initialJournalMood]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const getNearestMood = (val: number): Mood => {
    return MOODS.reduce((prev, curr) => {
      return Math.abs(curr.position - val) < Math.abs(prev.position - val) ? curr : prev;
    });
  };

  const scheduleMoodSubmission = (moodId: string) => {
    if (!autoSubmit) return;
    hasUserInteracted.current = true;
    const moodItem = MOODS.find((m) => m.id === moodId);
    if (!moodItem) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setSaveStatus('pending');

    // Automatically submit in 5 seconds after picking / sliding
    timerRef.current = setTimeout(async () => {
      if (!user?.id) {
        setSaveStatus('idle');
        return;
      }

      setSaveStatus('saving');
      try {
        await updateMoodMutation.mutateAsync({
          patientId: user.id,
          mood: moodItem.backendMood,
        });
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } catch {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    }, 5000);
  };

  const handleSelectMood = (mood: Mood) => {
    hasUserInteracted.current = true;
    setActiveMoodId(mood.id);
    setSliderValue(mood.position);
    if (autoSubmit) {
      scheduleMoodSubmission(mood.id);
    }
    onMoodChange?.(mood.journalMood, mood.backendMood);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    hasUserInteracted.current = true;
    const val = parseInt(e.target.value, 10);
    setSliderValue(val);
    const nearest = getNearestMood(val);
    if (nearest.id !== activeMoodId) {
      setActiveMoodId(nearest.id);
    }
    if (autoSubmit) {
      scheduleMoodSubmission(nearest.id);
    }
    onMoodChange?.(nearest.journalMood, nearest.backendMood);
  };

  const snapToNearestMood = () => {
    hasUserInteracted.current = true;
    const nearest = getNearestMood(sliderValue);
    setSliderValue(nearest.position);
    setActiveMoodId(nearest.id);
    if (autoSubmit) {
      scheduleMoodSubmission(nearest.id);
    }
    onMoodChange?.(nearest.journalMood, nearest.backendMood);
  };

  return (
    <div className={className}>
      {/* 1. Section Header aligned with slider container */}
      {showTitle && (
        <div className={`text-left w-full ${titlePl}`}>
          <h2 className="text-[22px] md:text-[31.15px] font-normal text-[#1E0A42] tracking-[-0.96px] leading-[32px] md:leading-[59.84px]">
            Bu gün necə hiss edirsən
          </h2>
        </div>
      )}

      {/* Main Wrapper matching the layout style of Qeydlərim page */}
      <div className="w-full max-w-[1231px] mx-auto relative flex flex-col">
        {/* 2. Emojis Row distributed evenly with matching horizontal margins */}
        <div className="flex justify-between items-center mb-6 relative w-full px-[20px] md:px-[40px]">
          {MOODS.map((mood) => {
            const isActive = mood.id === activeMoodId;
            return (
              <div
                key={mood.id}
                onClick={() => handleSelectMood(mood)}
                className="flex flex-col items-center cursor-pointer group w-16 md:w-20 justify-center text-center"
              >
                {mood.renderEmoji(isActive)}
                <span
                  className={`text-[10px] font-bold mt-2 tracking-wider transition-colors duration-200 uppercase ${
                    isActive ? mood.color : 'text-[#2A2B42]/50 group-hover:text-[#2A2B42]'
                  }`}
                >
                  {mood.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* 3. Custom sliding Color Gradient Bar aligned with centers of outer emojis */}
        <div className="relative h-7 flex items-center mx-[52px] md:mx-[80px]">
          {/* Custom styled background track */}
          <div className="absolute inset-x-0 h-3 rounded-full bg-gradient-to-r from-[#ea4335] via-[#fbbc05] via-[#34a853] via-[#46bdc6] to-[#4285f4] shadow-inner" />
          
          {/* Custom styled thumb positioned exactly by percentage */}
          <div
            className="absolute top-1/2 w-[8px] h-7 bg-[#2A2B42] border border-white rounded-full shadow-md pointer-events-none transition-all duration-150 active:scale-110"
            style={{
              left: `${sliderValue}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Invisible native range input overlay to handle mouse/touch inputs */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            onMouseUp={snapToNearestMood}
            onTouchEnd={snapToNearestMood}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* 4. Non-intrusive auto-save status indicator */}
        {autoSubmit && saveStatus !== 'idle' && (
          <div className="flex justify-center items-center mt-3 animate-fade-in">
            <div
              className={`text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-medium transition-all ${
                saveStatus === 'pending'
                  ? 'bg-purple-50 text-[#482476] border border-purple-200'
                  : saveStatus === 'saving'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : saveStatus === 'saved'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-red-50 text-red-600 border border-red-200'
              }`}
            >
              {saveStatus === 'pending' && (
                <>
                  <Clock size={13} className="animate-pulse" />
                  <span>5 saniyə sonra yadda saxlanılacaq...</span>
                </>
              )}
              {saveStatus === 'saving' && (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Əhvalınız yadda saxlanılır...</span>
                </>
              )}
              {saveStatus === 'saved' && (
                <>
                  <Check size={13} className="text-emerald-600" />
                  <span>Əhvalınız qeydə alındı</span>
                </>
              )}
              {saveStatus === 'error' && (
                <span>Əhvalı yadda saxlamaq mümkün olmadı.</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

