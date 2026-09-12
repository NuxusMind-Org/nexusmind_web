import { useTranslation } from 'react-i18next';

export const GalleryHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full text-left mb-10 md:mb-12">
      <h1 className="text-[42px] sm:text-[56px] font-sans font-light text-white mb-2 leading-tight tracking-tight">
        {t('gallery.title')}
      </h1>
      <p className="text-white/80 text-[16px] md:text-[18px] max-w-[900px] leading-relaxed">
        {t('gallery.subtitle')}
      </p>
    </div>
  );
};
