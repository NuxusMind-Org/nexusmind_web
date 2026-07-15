import { Link } from 'react-router-dom';
import {
  Compass,
  MessageSquare,
  Activity,
  Flame,
  Award,
  Sparkles,
} from 'lucide-react';
import { PATHS } from '@/routes/paths';

export const DashboardPage = () => {
  const stats = [
    {
      title: 'Daily Streak',
      value: '5 gün',
      desc: 'Davamlı inkişaf',
      icon: Flame,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Tamamlanmış Rituallar',
      value: '3/5',
      desc: 'Bugünkü hədəf',
      icon: Award,
      color: 'text-[#00F2FF] bg-[#00F2FF]/10 border-[#00F2FF]/20',
    },
    {
      title: 'Yeni Mesajlar',
      value: '0',
      desc: 'Psixoloqunuzdan',
      icon: MessageSquare,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/50 via-indigo-900/30 to-[#0D1117] border border-white/5 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[200px] h-[200px] bg-[#00F2FF]/5 rounded-full blur-[65px] pointer-events-none" />

        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-2 text-[#00F2FF] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles size={14} />
            <span>Xoş gəldiniz</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Mental sağlamlığınız bizim üçün vacibdir.
          </h1>
          <p className="text-gray-400 text-sm max-w-[600px] leading-relaxed">
            Hər gün kiçik addımlarla daha yaxşı bir mental vəziyyətə sahib ola bilərsiniz. Gəlin bu günün rituallarına nəzər yetirək.
          </p>
        </div>

        <Link
          to={PATHS.JOURNAL}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-[#00F2FF] hover:from-purple-500 hover:to-[#33f5ff] text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:shadow-[#00F2FF]/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative z-10 flex-shrink-0"
        >
          Rituallara Başla
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white/[0.02] border border-white/5 hover:border-white/10 p-6 rounded-2xl flex items-center justify-between transition-all duration-300 hover:translate-y-[-2px] group"
            >
              <div className="flex flex-col text-left">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
                  {stat.title}
                </span>
                <span className="text-2xl font-bold text-white mb-1 group-hover:text-[#00F2FF] transition-colors">
                  {stat.value}
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  {stat.desc}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${stat.color}`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommended Section / Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rituals Widget Preview */}
        <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl text-left">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity size={18} className="text-[#00F2FF]" />
              Günün Ritualları
            </h3>
            <Link
              to={PATHS.JOURNAL}
              className="text-xs text-[#00F2FF] hover:underline"
            >
              Hamısına bax
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { title: 'Səhər Meditasiyası', time: '08:00', type: 'MEDITATION', done: true },
              { title: 'Yürüş / İdman', time: '12:30', type: 'FITNESS', done: false },
              { title: 'Kitab Oxumaq', time: '21:00', type: 'READING', done: false },
            ].map((ritual, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={ritual.done}
                    readOnly
                    className="w-4 h-4 rounded border-gray-600 bg-transparent text-[#00F2FF] focus:ring-[#00F2FF]"
                  />
                  <span className={`text-xs ${ritual.done ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                    {ritual.title}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 font-semibold bg-white/[0.04] px-2 py-0.5 rounded-md">
                  {ritual.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Message Helper */}
        <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl text-left flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Compass size={18} className="text-purple-500" />
              Sürətli Dəstək
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-6">
              Özünüzü pis hiss edirsiniz və ya kiminləsə danışmağa ehtiyacınız var? Bizim professional psixoloqlarımız hər an sizə kömək etməyə hazırdır.
            </p>
          </div>

          <Link
            to="/chat"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 hover:bg-purple-950/10 text-white font-semibold text-xs transition-all duration-300"
          >
            <MessageSquare size={14} className="text-purple-400" />
            Psixoloq ilə Əlaqə
          </Link>
        </div>
      </div>
    </div>
  );
};
