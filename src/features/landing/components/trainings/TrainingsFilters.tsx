import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { List, Calendar } from 'lucide-react';

interface TrainingsFiltersProps {
  activeView: 'list' | 'calendar';
  onViewChange: (view: 'list' | 'calendar') => void;
}

export const TrainingsFilters = ({ activeView, onViewChange }: TrainingsFiltersProps) => {
  const navigate = useNavigate();

  const handleConsultationClick = () => {
    navigate(`${PATHS.HOME}#experts`);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
      {/* Left side: Individual consultation button */}
      <button
        onClick={handleConsultationClick}
        className="px-6 py-2.5 rounded-lg text-white text-[14px] font-medium bg-[#581c87]/80 hover:bg-[#581c87] hover:shadow-[0_0_15px_rgba(88,28,135,0.4)] border-0 cursor-pointer transition-all duration-300 select-none outline-none block text-center"
      >
        Fərdi məsləhət al
      </button>

      {/* Right side: View switcher (List vs Calendar) */}
      <div className="bg-white/5 border border-white/10 p-1 rounded-lg flex items-center gap-1">
        <button
          onClick={() => onViewChange('list')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[14px] font-medium transition-all duration-300 cursor-pointer border-0 outline-none ${
            activeView === 'list'
              ? 'bg-white/15 text-white shadow-sm'
              : 'text-white/60 hover:text-white bg-transparent'
          }`}
        >
          <List size={16} />
          <span>Siyahı</span>
        </button>
        <button
          onClick={() => onViewChange('calendar')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[14px] font-medium transition-all duration-300 cursor-pointer border-0 outline-none ${
            activeView === 'calendar'
              ? 'bg-white/15 text-white shadow-sm'
              : 'text-white/60 hover:text-white bg-transparent'
          }`}
        >
          <Calendar size={16} />
          <span>Təqvimə bax</span>
        </button>
      </div>
    </div>
  );
};
