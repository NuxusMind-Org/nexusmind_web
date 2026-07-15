import { useState } from 'react';
import { Plus, CheckCircle2, Circle, Flame, Calendar } from 'lucide-react';

interface Ritual {
  id: number;
  title: string;
  description: string;
  time: string;
  type: string;
  completed: boolean;
}

export const RitualsPage = () => {
  const [rituals, setRituals] = useState<Ritual[]>([
    {
      id: 1,
      title: 'Səhər Meditasiyası',
      description: 'Zehni sakitləşdirmək və günə enerjili başlamaq üçün 10 dəqiqəlik nəfəs idmanı.',
      time: '08:00',
      type: 'MEDITATION',
      completed: true,
    },
    {
      id: 2,
      title: 'Su qəbulu',
      description: 'Gündəlik su balansını qorumaq üçün 500ml təmiz su için.',
      time: '10:00',
      type: 'WATER',
      completed: true,
    },
    {
      id: 3,
      title: 'Yürüş / İdman',
      description: 'Açıq havada və ya qaçış lentində sürətli gəziş.',
      time: '12:30',
      type: 'FITNESS',
      completed: false,
    },
    {
      id: 4,
      title: 'Gündəlik qeydlər (Journaling)',
      description: 'Bu gün baş verən gözəl hadisələri və ya hisslərinizi qeyd edin.',
      time: '20:00',
      type: 'JOURNALING',
      completed: false,
    },
    {
      id: 5,
      title: 'Kitab Oxumaq',
      description: 'Karyera və ya bədii ədəbiyyatdan 10 səhifə oxuyun.',
      time: '21:00',
      type: 'READING',
      completed: false,
    },
  ]);

  const toggleComplete = (id: number) => {
    setRituals(
      rituals.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const completedCount = rituals.filter((r) => r.completed).length;
  const progressPercent = Math.round((completedCount / rituals.length) * 100) || 0;

  return (
    <div className="flex flex-col gap-8 w-full text-left animate-fade-in">
      {/* Header and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Rituallarım</h1>
          <p className="text-gray-400 text-xs mt-1">Gündəlik vərdişlərinizi və mental inkişaf rituallarınızı buradan idarə edin.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-[#00F2FF] hover:from-purple-500 hover:to-[#33f5ff] text-white font-semibold text-xs shadow-md shadow-purple-500/25 cursor-pointer transition-all">
          <Plus size={14} />
          Yeni Ritual Yarat
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Tracker */}
        <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl md:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Bugünkü Davamiyyət</span>
            <span className="text-sm font-bold text-[#00F2FF] bg-[#00F2FF]/10 px-2 py-0.5 rounded-md">{progressPercent}%</span>
          </div>

          <div className="w-full bg-white/[0.03] h-2.5 rounded-full overflow-hidden mb-6">
            <div
              className="bg-gradient-to-r from-purple-600 to-[#00F2FF] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Tamamlandı: {completedCount} ritual</span>
            <span>Qaldı: {rituals.length - completedCount} ritual</span>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-gradient-to-tr from-purple-950/20 to-[#00F2FF]/5 border border-white/5 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-10px] right-[-10px] w-24 h-24 bg-[#00F2FF]/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <Flame size={20} />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-medium block">Streak</span>
              <span className="text-lg font-bold text-white">5 gün ardıcıl!</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed mt-4">
            Çox yaxşı gedirsiniz! Mental vərdişlərinizi tamamlamaq sizə psixoloji dayanıqlılıq qazandırır.
          </p>
        </div>
      </div>

      {/* Rituals List */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <Calendar size={14} className="text-purple-400" />
          Bugünkü siyahı
        </h3>

        <div className="flex flex-col gap-3">
          {rituals.map((ritual) => (
            <div
              key={ritual.id}
              onClick={() => toggleComplete(ritual.id)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 items-start ${
                ritual.completed
                  ? 'bg-white/[0.01] border-white/5 opacity-60'
                  : 'bg-white/[0.02] border-white/5 hover:border-purple-500/20 hover:bg-white/[0.03]'
              }`}
            >
              {/* Checkbox Icon */}
              <button
                className={`mt-0.5 flex-shrink-0 transition-colors ${
                  ritual.completed ? 'text-[#00F2FF]' : 'text-gray-500 hover:text-white'
                }`}
              >
                {ritual.completed ? (
                  <CheckCircle2 size={20} className="fill-[#00F2FF]/10" />
                ) : (
                  <Circle size={20} />
                )}
              </button>

              {/* Ritual Metadata */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h4 className={`text-sm font-semibold ${ritual.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                    {ritual.title}
                  </h4>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-white/[0.05] text-gray-400">
                    {ritual.type}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {ritual.description}
                </p>
              </div>

              {/* Time Indicator */}
              <div className="text-right flex-shrink-0">
                <span className="text-[10px] text-gray-500 font-semibold bg-white/[0.03] px-2.5 py-1 rounded-lg">
                  {ritual.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
