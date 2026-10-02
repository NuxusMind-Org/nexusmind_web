import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import { useUpdateMood } from '@/features/auth/hooks/useUpdateMood';
import type { PatientMood, JournalMood } from '@/api/types';

interface MoodOption {
  id: string;
  label: string;
  backendMood: PatientMood;
  journalMood: JournalMood;
  renderEmoji: (isActive: boolean) => React.ReactNode;
}

export const UserMoodWidget = () => {
  const { t } = useTranslation();
  const { data: user } = useCurrentUser();
  const updateMoodMutation = useUpdateMood();

  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  const MOODS: MoodOption[] = [
    {
      id: 'very_bad',
      label: t('webapp.mood.veryBad', 'Çox Pis'),
      backendMood: 'SAD',
      journalMood: 'VERY_LOW',
      renderEmoji: (isActive) => (
        <svg
          viewBox="0 0 64 64"
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md transition-all duration-300 ${
            isActive ? 'scale-110 ring-4 ring-[#ea4335]/50' : 'hover:scale-105 opacity-80 hover:opacity-100'
          }`}
        >
          <circle cx="32" cy="32" r="30" fill="#ea4335" />
          <path d="M20,24 L28,32 M28,24 L20,32" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path d="M36,24 L44,32 M44,24 L36,32" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path d="M20,46 C24,39 40,39 44,46" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'bad',
      label: t('webapp.mood.bad', 'Pis'),
      backendMood: 'TIRED',
      journalMood: 'LOW',
      renderEmoji: (isActive) => (
        <svg
          viewBox="0 0 64 64"
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md transition-all duration-300 ${
            isActive ? 'scale-110 ring-4 ring-[#fbbc05]/50' : 'hover:scale-105 opacity-80 hover:opacity-100'
          }`}
        >
          <circle cx="32" cy="32" r="30" fill="#fbbc05" />
          <circle cx="24" cy="28" r="4" fill="white" />
          <circle cx="40" cy="28" r="4" fill="white" />
          <path d="M22,46 C26,40 38,40 42,46" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'normal',
      label: t('webapp.mood.normal', 'Normal'),
      backendMood: 'NORMAL',
      journalMood: 'NEUTRAL',
      renderEmoji: (isActive) => (
        <svg
          viewBox="0 0 64 64"
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md transition-all duration-300 ${
            isActive ? 'scale-110 ring-4 ring-[#34a853]/50' : 'hover:scale-105 opacity-80 hover:opacity-100'
          }`}
        >
          <circle cx="32" cy="32" r="30" fill="#34a853" />
          <circle cx="24" cy="28" r="4" fill="white" />
          <circle cx="40" cy="28" r="4" fill="white" />
          <line x1="22" y1="44" x2="42" y2="44" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'good',
      label: t('webapp.mood.good', 'Yaxşı'),
      backendMood: 'CALM',
      journalMood: 'GOOD',
      renderEmoji: (isActive) => (
        <svg
          viewBox="0 0 64 64"
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md transition-all duration-300 ${
            isActive ? 'scale-110 ring-4 ring-[#46bdc6]/50' : 'hover:scale-105 opacity-80 hover:opacity-100'
          }`}
        >
          <circle cx="32" cy="32" r="30" fill="#46bdc6" />
          <circle cx="24" cy="28" r="4" fill="white" />
          <circle cx="40" cy="28" r="4" fill="white" />
          <path d="M22,40 C26,48 38,48 42,40" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'very_good',
      label: t('webapp.mood.excellent', 'Əla'),
      backendMood: 'HAPPY',
      journalMood: 'VERY_GOOD',
      renderEmoji: (isActive) => (
        <svg
          viewBox="0 0 64 64"
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md transition-all duration-300 ${
            isActive ? 'scale-110 ring-4 ring-[#4285f4]/50' : 'hover:scale-105 opacity-80 hover:opacity-100'
          }`}
        >
          <circle cx="32" cy="32" r="30" fill="#4285f4" />
          <path d="M18,28 Q24,20 30,28" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M34,28 Q40,20 46,28" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M20,40 C24,52 40,52 44,40 Z" fill="white" />
        </svg>
      ),
    },
  ];

  // Sync initial selection from user profile
  useEffect(() => {
    if (user?.mood && !selectedMoodId) {
      const match = MOODS.find((m) => m.backendMood === user.mood);
      if (match) setSelectedMoodId(match.id);
    }
  }, [user?.mood]);

  const handleSelectMood = (mood: MoodOption) => {
    setSelectedMoodId(mood.id);
    if (!user?.id) return;
    updateMoodMutation.mutate(
      { patientId: user.id, mood: mood.backendMood },
      {
        onSuccess: () => {
          setJustSaved(true);
          setTimeout(() => setJustSaved(false), 2500);
        },
      }
    );
  };

  return (
    <div className="w-full bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.2)] flex flex-col items-center text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <h3 className="text-lg sm:text-2xl font-light font-serif text-white">
          {t('webapp.dashboard.howDoYouFeel', 'Bu gün özünü necə hiss edirsən?')}
        </h3>
        {updateMoodMutation.isPending && (
          <AppIcon icon="lucide:loader-2" size={16} className="animate-spin text-[#00f2ff]" />
        )}
        {justSaved && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-300 font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
            <AppIcon icon="lucide:check" size={12} /> {t('common.saved', 'Yadda saxlanıldı')}
          </span>
        )}
      </div>

      <div className="grid grid-cols-5 gap-2 sm:gap-6 items-center justify-items-center w-full max-w-2xl">
        {MOODS.map((mood) => {
          const isActive = selectedMoodId === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => handleSelectMood(mood)}
              className="flex flex-col items-center gap-2 group cursor-pointer outline-none bg-transparent border-none"
            >
              {mood.renderEmoji(isActive)}
              <span
                className={`text-[10px] sm:text-xs font-medium tracking-tight uppercase transition-colors ${
                  isActive ? 'text-white font-semibold' : 'text-white/60 group-hover:text-white'
                }`}
              >
                {mood.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
