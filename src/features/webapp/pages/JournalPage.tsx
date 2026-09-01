import { useState, useEffect, useMemo, useRef } from 'react';
import { History, Check, Loader2, Trash2, X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { MoodSelector } from '../components/MoodSelector';
import {
  useTodayJournal,
  useJournalHistory,
  useSaveJournal,
  useDeleteJournal,
} from '../hooks/useJournal';
import type { JournalEntryResponse, JournalMood } from '@/api/types';

const AZ_MONTHS = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
  'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
];

const MOOD_COLORS: Record<string, { bg: string; dot: string; label: string }> = {
  VERY_LOW: { bg: 'bg-[#ea4335]/15 text-[#ea4335]', dot: 'bg-[#ea4335] shadow-[0_0_8px_#ea4335]', label: 'Çox Pis' },
  LOW: { bg: 'bg-[#fbbc05]/15 text-[#fbbc05]', dot: 'bg-[#fbbc05] shadow-[0_0_8px_#fbbc05]', label: 'Pis' },
  NEUTRAL: { bg: 'bg-[#34a853]/15 text-[#34a853]', dot: 'bg-[#34a853] shadow-[0_0_8px_#34a853]', label: 'Normal' },
  GOOD: { bg: 'bg-[#46bdc6]/15 text-[#46bdc6]', dot: 'bg-[#46bdc6] shadow-[0_0_8px_#46bdc6]', label: 'Yaxşı' },
  VERY_GOOD: { bg: 'bg-[#4285f4]/15 text-[#4285f4]', dot: 'bg-[#4285f4] shadow-[0_0_8px_#4285f4]', label: 'Əla' },
};

export const JournalPage = () => {
  const [noteText, setNoteText] = useState<string>('');
  const [currentMood, setCurrentMood] = useState<JournalMood>('NEUTRAL');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [selectedNote, setSelectedNote] = useState<JournalEntryResponse | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [historyPage, setHistoryPage] = useState<number>(0);

  const hasInitializedText = useRef<boolean>(false);

  // 1. Fetch Today's Journal Entry
  const { data: todayEntry, isLoading: isTodayLoading } = useTodayJournal();

  // 2. Fetch Recent Past Notes for Sidebar
  const { data: recentHistory, isLoading: isHistoryLoading } = useJournalHistory({ page: 0, size: 5 });

  // 3. Fetch Paginated History for Modal
  const { data: modalHistory } = useJournalHistory({ page: historyPage, size: 6 });

  // 4. Mutations
  const saveJournalMutation = useSaveJournal();
  const deleteJournalMutation = useDeleteJournal();

  // Initialize editor text and mood once today's entry is loaded
  useEffect(() => {
    if (todayEntry) {
      if (!hasInitializedText.current) {
        setNoteText(todayEntry.thoughts || '');
        hasInitializedText.current = true;
      }
      if (todayEntry.mood) {
        setCurrentMood(todayEntry.mood);
      }
    }
  }, [todayEntry]);

  const todayFormatted = useMemo(() => {
    const now = new Date();
    const day = now.getDate();
    const month = AZ_MONTHS[now.getMonth()];
    const year = now.getFullYear();
    return `${day} ${month}, ${year}`;
  }, []);

  const formatNoteDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-').map(Number);
    if (parts.length === 3) {
      const day = parts[2];
      const month = AZ_MONTHS[parts[1] - 1]?.toUpperCase() || '';
      return `${day} ${month}`;
    }
    return dateStr;
  };

  const handleSaveNote = async () => {
    const effectiveMood = currentMood || 'NEUTRAL';
    setSaveStatus('saving');
    try {
      await saveJournalMutation.mutateAsync({
        mood: effectiveMood,
        thoughts: noteText,
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
  };

  const handleDeleteNote = async (id?: number) => {
    if (!id) return;
    if (window.confirm('Bu qeydi silmək istədiyinizə əminsiniz?')) {
      try {
        await deleteJournalMutation.mutateAsync(id);
        setSelectedNote(null);
      } catch (err) {
        console.error('Failed to delete journal entry:', err);
      }
    }
  };

  return (
    <div className="w-full flex flex-col rounded-[20px] md:rounded-[38.93px] overflow-hidden shadow-2xl bg-white animate-fade-in min-h-[calc(100vh-64px)] pb-8 sm:pb-12">
      {/* Top Header Section Card with Pastel Gradient */}
      <div
        className="w-full rounded-t-[20px] md:rounded-t-[38.93px] pt-8 sm:pt-14 pb-6 sm:pb-8 px-4 sm:px-6 md:px-[48px] flex flex-col justify-between h-auto min-h-[320px] sm:min-h-[380px] md:min-h-[442px] shrink-0"
        style={{
          background: 'linear-gradient(135deg, #CBE8FC 0%, #DDD4F8 33%, #F9D8E8 66%, #FFF5E6 100%)',
        }}
      >
        {/* Main Centered Header */}
        <h1 className="text-[24px] sm:text-[32px] md:text-[46.72px] font-normal text-[#1E0A42] text-center tracking-[-0.96px] leading-[32px] sm:leading-[42px] md:leading-[59.84px] w-full">
          Çəkinmədən bütün qeydlərini et.
        </h1>

        {/* Bottom half containing question, emojis and slider (Auto-submit disabled on journal page) */}
        <div className="w-full flex flex-col mb-2">
          <MoodSelector
            className="w-full flex flex-col"
            titlePl="pl-[36px] md:pl-[40px] mb-6"
            autoSubmit={false}
            initialJournalMood={todayEntry?.mood}
            onMoodChange={(journalMood) => {
              setCurrentMood(journalMood);
            }}
          />
        </div>
      </div>

      {/* Second Section Container */}
      <div className="px-4 sm:px-8 md:px-12 py-6 sm:py-10 flex flex-col w-full max-w-[1231px] mx-auto text-left">
        {/* Row 1: Left Column Header Row */}
        <div className="flex justify-between items-end mb-6 w-full max-w-[880px]">
          <div>
            <h3 className="text-[22px] md:text-[31.15px] font-normal text-[#1E0A42] tracking-[-0.96px] leading-[32px] md:leading-[59.84px] font-['Lexend']">
              Günün düşüncələri
            </h3>
            <p className="text-[15px] md:text-[16px] font-normal text-[#9633D8] tracking-[0px] leading-[30px] md:leading-[36px] font-['Kite_One',_sans-serif]">
              Nə barədə düşünürsünüz?
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Save Status Indicator */}
            {saveStatus !== 'idle' && (
              <div className="text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-medium transition-all font-['Lexend']">
                {saveStatus === 'saving' && (
                  <span className="text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Loader2 size={12} className="animate-spin" /> Yadda saxlanılır...
                  </span>
                )}
                {saveStatus === 'saved' && (
                  <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Check size={12} /> Qeyd saxlanıldı
                  </span>
                )}
                {saveStatus === 'error' && (
                  <span className="text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                    Xəta baş verdi
                  </span>
                )}
              </div>
            )}
            <span className="text-sm text-gray-400 font-normal mb-1 font-['Lexend']">
              {todayFormatted}
            </span>
          </div>
        </div>

        {/* Row 2: Cards container */}
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          {/* Note Editor Card */}
          <div className="w-full lg:w-[880px] lg:shrink-0 bg-white border-2 border-gray-200 rounded-[24px] sm:rounded-[40px] pt-[24px] sm:pt-[40px] pr-[24px] sm:pr-[40px] pb-[32px] sm:pb-[48px] pl-[24px] sm:pl-[40px] shadow-sm flex flex-col h-[350px] sm:h-[400px] md:h-[500px] min-h-[350px] sm:min-h-[400px] md:min-h-[500px] relative overflow-hidden">
            {/* Left margin lines for notebook aesthetic */}
            <div className="absolute left-[16px] sm:left-[32px] top-0 bottom-0 w-[2px] bg-red-400/30" />
            <div className="absolute left-[20px] sm:left-[36px] top-0 bottom-0 w-[1px] bg-red-400/20" />
            
            <textarea
              value={noteText}
              onChange={handleTextChange}
              placeholder={isTodayLoading ? "Qeydlər yüklənir..." : "Səhifə sənindir..."}
              className="w-full h-full bg-transparent text-gray-800 placeholder-gray-400 text-base font-normal resize-none focus:outline-none font-['Lexend'] leading-[32px] z-10 relative"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(0, 0, 0, 0.08) 31px, rgba(0, 0, 0, 0.08) 32px)',
                backgroundAttachment: 'local',
                backgroundPosition: '0 4px',
              }}
            />

            {/* Bottom Actions Bar inside Notebook */}
            <div className="flex items-center justify-end gap-3 z-10 pt-2 border-t border-gray-100/60 mt-auto">
              <button
                onClick={handleSaveNote}
                disabled={saveJournalMutation.isPending}
                className="px-6 py-2.5 rounded-xl bg-[#482476] hover:bg-[#38166D] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                {saveJournalMutation.isPending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Check size={14} />
                )}
                <span>Yadda saxla</span>
              </button>
            </div>
          </div>

          {/* Right Column - Keçmiş Qeydlər Sidebar Card */}
          <div className="w-full lg:w-[319px] lg:shrink-0 bg-[#482476] border-[0.74px] border-[#6F7B9E] rounded-[20px] sm:rounded-[23.63px] p-5 sm:p-[23.63px] flex flex-col justify-between h-auto min-h-[350px] sm:min-h-[400px] lg:h-[500px] gap-5 sm:gap-[23.63px] shadow-lg">
            {/* Header */}
            <div className="flex items-center gap-3">
              <History size={20} className="text-white/80" />
              <h4 className="text-lg font-medium text-white tracking-wide font-['Lexend']">
                Keçmiş Qeydlər
              </h4>
            </div>

            {/* Past Notes List */}
            <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-1">
              {isHistoryLoading ? (
                <div className="flex flex-col items-center justify-center py-10 text-white/50 gap-2">
                  <Loader2 size={24} className="animate-spin" />
                  <span className="text-xs font-['Lexend']">Qeydlər yüklənir...</span>
                </div>
              ) : !recentHistory?.content || recentHistory.content.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-white/50">
                  <BookOpen size={32} className="opacity-40 mb-2" />
                  <p className="text-xs font-['Lexend']">Hələki keçmiş qeyd yoxdur.</p>
                </div>
              ) : (
                recentHistory.content.map((note) => {
                  const moodConfig = note.mood ? MOOD_COLORS[note.mood] : MOOD_COLORS.NEUTRAL;
                  return (
                    <div
                      key={note.id}
                      onClick={() => setSelectedNote(note)}
                      className="flex justify-between items-start group cursor-pointer p-2.5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className="flex flex-col pr-3">
                        <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider font-['Lexend']">
                          {formatNoteDate(note.entryDate)}
                        </span>
                        <h5 className="text-sm font-semibold text-white mt-0.5 leading-snug group-hover:text-[#46bdc6] transition-colors font-['Lexend'] line-clamp-1">
                          {note.thoughts?.split('\n')[0] || 'Düşüncələr...'}
                        </h5>
                        <p className="text-[11px] text-white/70 mt-1 leading-normal line-clamp-2 font-['Lexend']">
                          {note.thoughts || 'Qeyd mətni yoxdur.'}
                        </p>
                      </div>
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${moodConfig.dot} flex-shrink-0 mt-1.5`}
                        title={moodConfig.label}
                      />
                    </div>
                  );
                })
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                setHistoryPage(0);
                setIsHistoryModalOpen(true);
              }}
              className="w-full bg-white text-[#482476] py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-colors shadow-md cursor-pointer font-['Lexend']"
            >
              HAMISINI GÖR
            </button>
          </div>
        </div>
      </div>

      {/* 5. Note Detail Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 shadow-2xl flex flex-col gap-5 relative text-left">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider font-['Lexend']">
                  {formatNoteDate(selectedNote.entryDate)}
                </span>
                <h3 className="text-xl font-bold text-[#1E0A42] font-['Lexend'] mt-0.5">
                  Günün qeydi
                </h3>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Mood Tag */}
            {selectedNote.mood && (
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${MOOD_COLORS[selectedNote.mood]?.bg || 'bg-gray-100 text-gray-700'}`}>
                  Əhval: {MOOD_COLORS[selectedNote.mood]?.label || selectedNote.mood}
                </span>
              </div>
            )}

            {/* Note Content */}
            <div className="bg-[#F9FAFC] rounded-2xl p-5 border border-gray-100 max-h-[300px] overflow-y-auto">
              <p className="text-gray-800 text-sm sm:text-base font-normal leading-relaxed whitespace-pre-wrap font-['Lexend']">
                {selectedNote.thoughts || 'Bu gün üçün mətn qeyd edilməyib.'}
              </p>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleDeleteNote(selectedNote.id)}
                disabled={deleteJournalMutation.isPending}
                className="flex items-center gap-1.5 text-red-500 hover:text-red-600 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Trash2 size={15} />
                <span>Qeydi sil</span>
              </button>
              <button
                onClick={() => setSelectedNote(null)}
                className="px-6 py-2.5 rounded-xl bg-[#482476] text-white text-xs font-semibold hover:bg-[#38166D] transition-colors cursor-pointer"
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. All History Paginated Modal ("HAMISINI GÖR") */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[28px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl flex flex-col gap-5 relative text-left max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <History size={22} className="text-[#482476]" />
                <h3 className="text-xl font-bold text-[#1E0A42] font-['Lexend']">
                  Bütün Keçmiş Qeydlər
                </h3>
              </div>
              <button
                onClick={() => setIsHistoryModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* List */}
            <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-1">
              {!modalHistory?.content || modalHistory.content.length === 0 ? (
                <div className="py-16 text-center text-gray-400 font-['Lexend']">
                  Keçmiş qeyd tapılmadı.
                </div>
              ) : (
                modalHistory.content.map((note) => {
                  const moodConfig = note.mood ? MOOD_COLORS[note.mood] : MOOD_COLORS.NEUTRAL;
                  return (
                    <div
                      key={note.id}
                      onClick={() => {
                        setSelectedNote(note);
                      }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-[#F8FAFC] hover:bg-[#F0F3FA] border border-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col flex-1 pr-4">
                        <span className="text-[11px] font-bold text-[#482476] uppercase tracking-wider font-['Lexend']">
                          {formatNoteDate(note.entryDate)}
                        </span>
                        <p className="text-sm font-semibold text-[#1E0A42] font-['Lexend'] mt-0.5 line-clamp-1">
                          {note.thoughts || 'Qeyd mətni yoxdur.'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${moodConfig.bg}`}>
                          {moodConfig.label}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNote(note.id);
                          }}
                          className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          title="Sil"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination Controls */}
            {modalHistory && modalHistory.totalPages && modalHistory.totalPages > 1 && (
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 font-['Lexend']">
                <button
                  onClick={() => setHistoryPage((p) => Math.max(0, p - 1))}
                  disabled={historyPage === 0}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} /> Əvvəlki
                </button>
                <span className="text-xs text-gray-500 font-medium">
                  Səhifə {historyPage + 1} / {modalHistory.totalPages}
                </span>
                <button
                  onClick={() => setHistoryPage((p) => Math.min((modalHistory.totalPages || 1) - 1, p + 1))}
                  disabled={historyPage >= (modalHistory.totalPages || 1) - 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  Növbəti <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

