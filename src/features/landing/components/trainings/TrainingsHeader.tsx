import { useTranslation } from 'react-i18next';

export const TrainingsHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full text-left mb-10 md:mb-12">
      <h1 className="text-[42px] sm:text-[56px] font-sans font-light text-white mb-2 leading-tight tracking-tight">
        {t('trainings.headerTitle', 'Təlimlər')}
      </h1>
      <p className="text-white/80 text-[15px] sm:text-[18px] max-w-[800px] leading-relaxed">
        {t('trainings.headerSubtitle', 'Peşəkar psixoloqlarımız tərəfindən keçirilən onlayn və əyani təlimlərə qoşularaq daxili dünyanızı kəşf edin. Ruh sağlamlığınızı prioritet edin.')}
      </p>
    </div>
  );
};
