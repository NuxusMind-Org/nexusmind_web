import { ArrowRight } from 'lucide-react';
import { TrainingCard } from './TrainingCard';
import type { Training } from '../../constants/trainings';

interface TrainingsGridProps {
  trainings: Training[];
  onRegister: (training: Training) => void;
}

export const TrainingsGrid = ({ trainings, onRegister }: TrainingsGridProps) => {
  const eyaniTrainings = trainings.filter((t) => t.type === 'eyani').slice(0, 2);
  const onlineTrainings = trainings.filter((t) => t.type === 'online').slice(0, 2);

  return (
    <div className="w-full flex flex-col gap-16">
      {/* 1. Əyani Təlimlər Section */}
      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-1.5 h-6 bg-[#A682FF] rounded-full mr-3" />
            <h2 className="text-[22px] sm:text-[26px] font-semibold text-white font-sans tracking-tight">
              Əyani Təlimlər
            </h2>
          </div>
          <button className="flex items-center gap-1 text-[14px] text-white/80 hover:text-[#00f2ff] transition-colors cursor-pointer border-0 bg-transparent outline-none font-medium">
            <span>Hamısına bax</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eyaniTrainings.map((training) => (
            <TrainingCard
              key={training.id}
              training={training}
              onRegister={onRegister}
            />
          ))}
        </div>
      </div>

      {/* 2. Onlayn Təlimlər Section */}
      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-1.5 h-6 bg-[#A682FF] rounded-full mr-3" />
            <h2 className="text-[22px] sm:text-[26px] font-semibold text-white font-sans tracking-tight">
              Onlayn Təlimlər
            </h2>
          </div>
          <button className="flex items-center gap-1 text-[14px] text-white/80 hover:text-[#00f2ff] transition-colors cursor-pointer border-0 bg-transparent outline-none font-medium">
            <span>Hamısına bax</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {onlineTrainings.map((training) => (
            <TrainingCard
              key={training.id}
              training={training}
              onRegister={onRegister}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
