import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@/components';
import vrConsultation from '@/assets/vr_consultation.png';
import { PATHS } from '@/routes/paths';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import { JournalHistorySkeleton } from '../components/skeletons';
import { useAuthStore } from '@/store/authStore';
import {
  useTodayJournal,
  useJournalHistory,
  useSaveJournal,
  useDeleteJournal,
} from '@/hooks/useJournal';
import type { JournalEntryResponse, JournalMood } from '@/api/types';

export const JournalPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAuthStore();

  const [selectedMood, setSelectedMood] = useState<number>(3); // Default normal
  const [noteText, setNoteText] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [selectedNote, setSelectedNote] = useState<JournalEntryResponse | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [historyPage, setHistoryPage] = useState<number>(0);

  const hasInitializedText = useRef<boolean>(false);

  // Queries (only enabled if authenticated)
  const { data: todayEntry } = useTodayJournal();
  const { data: recentHistory, isLoading: isHistoryLoading } = useJournalHistory({ page: 0, size: 5 });
  const { data: modalHistory } = useJournalHistory({ page: historyPage, size: 6 });

  // Mutations
  const saveJournalMutation = useSaveJournal();
  const deleteJournalMutation = useDeleteJournal();

  const today = new Date();
  const locale = i18n.language === 'az' ? 'az-AZ' : i18n.language === 'ru' ? 'ru-RU' : 'en-US';
  const currentDateFormatted = today.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const moods = [
    {
      id: 1,
      journalMood: 'VERY_GOOD' as JournalMood,
      label: t('journal.happy', 'Xoşbəxt'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
    },
    {
      id: 2,
      journalMood: 'GOOD' as JournalMood,
      label: t('journal.calm', 'Sakit'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 14.5c1 .5 2 .5 3 .5s2 0 3-.5" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
    },
    {
      id: 3,
      journalMood: 'NEUTRAL' as JournalMood,
      label: t('journal.normal', 'Normal'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 15h8" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
    },
    {
      id: 4,
      journalMood: 'LOW' as JournalMood,
      label: t('journal.tired', 'Yorğun'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 16c1.5-1 2.5-1 4-1s2.5 0 4 1" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
    },
    {
      id: 5,
      journalMood: 'VERY_LOW' as JournalMood,
      label: t('journal.sad', 'Kədərli'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 16s1.5-2 4-2 4 2 4 2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
    },
  ];

  // Initialize editor text and mood once today's entry is loaded
  useEffect(() => {
    if (todayEntry) {
      if (!hasInitializedText.current) {
        setNoteText(todayEntry.thoughts || '');
        hasInitializedText.current = true;
      }
      if (todayEntry.mood) {
        const matched = moods.find(m => m.journalMood === todayEntry.mood);
        if (matched) setSelectedMood(matched.id);
      }
    }
  }, [todayEntry]);

  const formatNoteDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-').map(Number);
      if (parts.length === 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString(locale, { day: 'numeric', month: 'short' }).toUpperCase();
      }
    } catch {
      // fallback
    }
    return dateStr;
  };

  const handleSaveNote = async () => {
    if (!isAuthenticated) {
      navigate(PATHS.LOGIN);
      return;
    }

    const currentMoodObj = moods.find(m => m.id === selectedMood) || moods[2];
    setSaveStatus('saving');
    try {
      await saveJournalMutation.mutateAsync({
        thoughts: noteText,
        mood: currentMoodObj.journalMood,
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2500);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white bg-landing-gradient">
      <LandingNavbar activePage="journal" />

      {/* Page Content */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[40px] pb-[80px] flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          <div>
            <h1 className="text-[42px] sm:text-[56px] font-sans font-light text-white mb-2 leading-tight tracking-tight">
              {t('journal.title', 'Gündəlik')} <span className="text-[#c39ffd] font-light">{t('journal.titleHighlight', 'Qeydlərim')}</span>
            </h1>
            <p className="text-white/80 text-[16px] sm:text-[18px]">
              {t('journal.subtitle', 'Düşüncələrinizi və emosiyalarınızı qeyd edin.')}
            </p>
          </div>

          {/* Mood Selector */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-3 py-6 sm:p-8 border border-white/10 shadow-xl">
            <h3 className="text-white text-[16px] sm:text-[18px] mb-6 sm:mb-8 font-medium text-left">
              {t('journal.moodQuestion', 'Bu gün özünü necə hiss edirsən?')}
            </h3>
            <div className="grid grid-cols-5 gap-1 sm:gap-4 items-center justify-items-center w-full">
              {moods.map((mood) => (
                <div
                  key={mood.id}
                  className="flex flex-col items-center gap-2 sm:gap-3 cursor-pointer group"
                  onClick={() => setSelectedMood(mood.id)}
                >
                  <div
                    className={`w-10 h-10 min-[375px]:w-12 min-[375px]:h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      selectedMood === mood.id
                        ? 'bg-[#9333ea] scale-110 shadow-[0_0_20px_rgba(147,51,234,0.5)]'
                        : 'bg-[#2b6a8c] group-hover:bg-[#327ba3]'
                    }`}
                  >
                    {mood.icon}
                  </div>
                  <span className="text-white/60 text-[8px] min-[375px]:text-[9px] sm:text-[11px] tracking-tight sm:tracking-widest uppercase font-medium text-center whitespace-nowrap">
                    {mood.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Text Area Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col min-h-[450px] relative overflow-hidden">
            {/* Left margin line for notebook aesthetic */}
            <div className="absolute left-[16px] sm:left-[32px] top-0 bottom-0 w-[2px] bg-white/20" />
            <div className="absolute left-[20px] sm:left-[36px] top-0 bottom-0 w-[1px] bg-white/10" />

            <div className="flex justify-between items-end mb-6 relative z-10 pl-6 sm:pl-8">
              <div>
                <h4 className="text-white/50 text-[11px] tracking-[0.2em] uppercase font-light mb-2">
                  {t('journal.todayThoughts', 'BUGÜNKÜ DÜŞÜNCƏLƏR')}
                </h4>
                <h3 className="text-white text-[24px] sm:text-[28px] font-sans font-medium">
                  {t('journal.whatThinking', 'Nə düşünürsən?')}
                </h3>
              </div>
              <span className="text-white/60 text-[13px] font-medium hidden sm:block">
                {currentDateFormatted}
              </span>
            </div>

            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full flex-1 bg-transparent text-white text-[18px] resize-none outline-none placeholder:text-white/80 leading-[32px] relative z-10 pl-6 sm:pl-8"
              placeholder={t('journal.placeholder', 'Düşüncələrinizi bura yazın...')}
              style={{
                backgroundImage:
                  'repeating-linear-gradient(transparent, transparent 31px, rgba(255, 255, 255, 0.1) 31px, rgba(255, 255, 255, 0.1) 32px)',
                backgroundAttachment: 'local',
                backgroundPosition: '0 4px',
              }}
            />

            <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 sm:gap-4 mt-6 sm:mt-8 w-full relative z-10 pl-6 sm:pl-8">
              {/* Save Status Feedback */}
              {saveStatus === 'saved' && (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-medium px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <AppIcon icon="lucide:check" size={14} /> {t('common.saved', 'Yadda saxlanıldı')}
                </span>
              )}

              {/* Saxla Button */}
              <button
                onClick={handleSaveNote}
                disabled={saveStatus === 'saving'}
                className="w-full sm:w-auto px-7 py-3 bg-[#d8b4fe] text-[#2D1B44] font-semibold rounded-xl hover:bg-[#c084fc] transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(216,180,254,0.4)] whitespace-nowrap text-center cursor-pointer outline-none flex items-center justify-center gap-2"
              >
                {saveStatus === 'saving' ? (
                  <>
                    <AppIcon icon="lucide:loader-2" size={16} className="animate-spin" />
                    <span>{t('common.saving', 'Yadda saxlanılır...')}</span>
                  </>
                ) : (
                  <span>{t('journal.save', 'Saxla')}</span>
                )}
              </button>

              {/* Psixoloqa göndər Button */}
              <button
                onClick={() => {
                  if (!isAuthenticated) navigate(PATHS.LOGIN);
                  else navigate(PATHS.EXPERTS);
                }}
                className="w-full sm:w-auto px-7 py-3 bg-transparent border-2 border-[#d8b4fe] text-[#d8b4fe] hover:text-white font-semibold rounded-xl hover:bg-[#d8b4fe]/15 hover:border-[#c084fc] transition-all duration-300 whitespace-nowrap text-center cursor-pointer outline-none"
              >
                {t('journal.sendToPsychologist', 'Psixoloqa göndər')}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[350px] xl:w-[400px] flex flex-col gap-6 lg:mt-[104px]">
          {/* History Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col">
            <h3 className="text-white/80 text-[16px] mb-8 flex items-center gap-2 font-medium">
              <AppIcon icon="lucide:history" size={18} className="text-[#00f2ff]" />
              {t('journal.pastNotes', 'Keçmiş qeydlərim')}
            </h3>

            {isAuthenticated ? (
              <div className="flex flex-col gap-6">
                {isHistoryLoading ? (
                  <JournalHistorySkeleton />
                ) : recentHistory?.content && recentHistory.content.length > 0 ? (
                  recentHistory.content.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedNote(item)}
                      className="relative pl-5 border-l border-white/15 cursor-pointer group transition-colors"
                    >
                      <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
                      <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1 font-medium">
                        {formatNoteDate(item.createdAt)}
                      </p>
                      <p className="text-white/80 text-[13px] line-clamp-2 leading-relaxed group-hover:text-white">
                        {item.thoughts || t('journal.emptyThought', '(Boş qeyd)')}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-white/50 text-xs py-4 text-center">
                    {t('journal.noPastNotes', 'Hələ ki qeyd yoxdur.')}
                  </p>
                )}

                <button
                  onClick={() => setIsHistoryModalOpen(true)}
                  className="w-full mt-4 py-3 border border-white/20 rounded-xl text-white text-[12px] font-medium tracking-widest hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {t('journal.seeAll', 'HAMISINA BAX')}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="relative pl-5 border-l border-white/10">
                  <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
                  <p className="text-white/50 text-[10px] uppercase tracking-wider mb-2 font-medium">NÜMUNƏ</p>
                  <h4 className="text-white font-medium mb-1">Huzurlu bir dəniz sahilində...</h4>
                  <p className="text-white/60 text-[13px] line-clamp-2 leading-relaxed">Bu gün özümü daha sakit və toparlanmış hiss edirəm.</p>
                </div>
                <button
                  onClick={() => navigate(PATHS.LOGIN)}
                  className="w-full mt-4 py-3 border border-white/20 rounded-xl text-white text-[12px] font-light tracking-widest hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {t('nav.login', 'Giriş et')}
                </button>
              </div>
            )}
          </div>

          {/* VR Consultation Mini Box */}
          <div className="w-full h-[180px] rounded-2xl overflow-hidden relative group cursor-pointer shadow-xl border border-white/10 hidden sm:block">
            <img
              src={vrConsultation}
              alt="VR Consultation"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#eeb3b3]/30 backdrop-blur-xl border border-white/20 rounded-xl p-4">
              <h4 className="text-[14px] font-light text-[#111] mb-1">{t('vr.title', 'VR KONSULTASİYA')}</h4>
              <p className="text-[9px] text-[#222] font-light line-clamp-2">
                {t('vr.description', 'Burada evdən çölə çıxmadan istədiyin konfort zonanı seçə və orada zaman keçirərək sakitləşə bilərsən.')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* History Modal */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#141124]/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col text-white max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <AppIcon icon="lucide:book-open" size={20} className="text-[#00f2ff]" />
                <span>{t('journal.historyTitle', 'Bütün Qeydlərim')}</span>
              </h2>
              <button
                onClick={() => setIsHistoryModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <AppIcon icon="lucide:x" size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 my-4 flex flex-col gap-3 pr-1">
              {modalHistory?.content && modalHistory.content.length > 0 ? (
                modalHistory.content.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-start justify-between gap-4"
                  >
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => {
                        setNoteText(item.thoughts || '');
                        setIsHistoryModalOpen(false);
                      }}
                    >
                      <span className="text-[11px] font-semibold text-[#00f2ff] uppercase tracking-wider block mb-1">
                        {formatNoteDate(item.createdAt)}
                      </span>
                      <p className="text-sm text-white/90 line-clamp-3 leading-relaxed">
                        {item.thoughts || '(Boş qeyd)'}
                      </p>
                    </div>

                    <button
                      onClick={() => item.id && deleteJournalMutation.mutate(item.id)}
                      className="text-white/40 hover:text-rose-400 p-2 rounded-lg hover:bg-white/5 transition-colors"
                      title={t('common.delete', 'Sil')}
                    >
                      <AppIcon icon="lucide:trash-2" size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-white/40 text-sm">
                  {t('journal.noPastNotes', 'Hələ ki qeyd yoxdur.')}
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {modalHistory?.totalPages && modalHistory.totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  disabled={historyPage === 0}
                  onClick={() => setHistoryPage((p) => Math.max(0, p - 1))}
                  className="px-4 py-2 rounded-xl bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/15 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <AppIcon icon="lucide:chevron-left" size={16} /> {t('common.prev', 'Əvvəlki')}
                </button>
                <span className="text-xs text-white/60">
                  {historyPage + 1} / {modalHistory.totalPages}
                </span>
                <button
                  disabled={historyPage >= (modalHistory.totalPages ?? 1) - 1}
                  onClick={() => setHistoryPage((p) => p + 1)}
                  className="px-4 py-2 rounded-xl bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/15 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  {t('common.next', 'Növbəti')} <AppIcon icon="lucide:chevron-right" size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Note Reader Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#141124]/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-semibold text-[#00f2ff] uppercase tracking-wider">
                {formatNoteDate(selectedNote.createdAt)}
              </span>
              <button
                onClick={() => setSelectedNote(null)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <AppIcon icon="lucide:x" size={20} />
              </button>
            </div>
            <p className="my-6 text-sm text-white/90 leading-relaxed whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
              {selectedNote.thoughts}
            </p>
            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  setNoteText(selectedNote.thoughts || '');
                  setSelectedNote(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#d8b4fe] text-[#2D1B44] font-semibold text-xs hover:bg-[#c084fc] transition-colors"
              >
                {t('journal.loadIntoEditor', 'Redaktora Köçür')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer — full width */}
      <Footer />
    </div>
  );
};
