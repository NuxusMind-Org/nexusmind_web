import { Heart, Sparkles, BookOpen, Users, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import purpleRoom from '@/assets/purple_room.png';
import avatar1 from '@/assets/avatar1.png';
import avatar2 from '@/assets/avatar2.png';
import avatar3 from '@/assets/avatar3.png';
import { ScrollReveal } from '../ScrollReveal';
import { BorderGlow } from '@/components';

const GLOW = {
  colors: ['rgba(0, 242, 255, 0.95)', 'rgba(192, 132, 252, 0.55)'] as [string, string],
  glowRadius: 180,
  borderWidth: 1.5,
  fillOpacity: 0,
  rounded: '24px',
};

const glassCard =
  'h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] p-6 sm:p-8 flex flex-col relative overflow-hidden';

export const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="features"
      className="relative w-full min-h-0 md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-[72px] py-10 md:py-20 scroll-mt-20"
    >
      <ScrollReveal className="w-full mx-auto flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="text-[30px] sm:text-[44px] font-bold text-white mb-4 tracking-tight leading-snug ponnala-nudge">
            {t('features.title', 'Daxili tarazlığı tap, özünü daha yaxşı anla.')}
          </h2>
          <p className="text-[16px] sm:text-[20px] text-white/80 font-medium ponnala-nudge">
            {t('features.subtitle', 'Psixoloji dəstək və özünüinkişaf üçün təhlükəsiz bir məkan')}
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BorderGlow className="sm:col-span-2 lg:col-span-2" {...GLOW}>
            <div className={`${glassCard} pb-[17px]`}>
              <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2 sm:gap-3 mb-4">
                <Heart size={24} className="text-[#00f2ff] shrink-0" strokeWidth={2} />
                <h3 className="text-white text-[20px] sm:text-[26px] font-medium tracking-wide ponnala-nudge">
                  {t('features.card1Title', 'Sənin hisslərin önəmlidir.')}
                </h3>
              </div>
              <p className="text-white/80 text-[14px] sm:text-[20px] leading-relaxed max-w-[700px] mb-8 ponnala-nudge">
                {t('features.card1Desc', 'Bu platforma düşüncələrini anlamaq, emosiyalarını idarə etmək və gündəlik streslə daha sağlam şəkildə başa çıxmaq üçün hazırlanıb. Sən burada tək deyilsən.Sevdiyin bir məkan seç və terapiyaya başla.')}
              </p>
              <div className="w-full h-[180px] sm:h-[220px] rounded-[16px] overflow-hidden mt-auto">
                <img src={purpleRoom} alt="Room" className="w-full h-full object-cover object-center border border-white/10 opacity-90" />
              </div>
            </div>
          </BorderGlow>

          <BorderGlow {...GLOW}>
            <div className={glassCard}>
              <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2 sm:gap-3 mb-6">
                <Sparkles size={24} className="text-[#00f2ff] shrink-0" strokeWidth={2} />
                <h3 className="text-white text-[20px] sm:text-[24px] font-medium tracking-wide ponnala-nudge">
                  {t('features.card2Title', 'Gündəlik Rituallar')}
                </h3>
              </div>
              <p className="text-white/80 text-[14px] sm:text-[20px] leading-relaxed flex-1 ponnala-nudge">
                {t('features.card2Desc', 'Kiçik addımlarla psixoloji rifahını gücləndir.Nəfəs məşqləri,qısa meditasiya və gündəlik refleksiya ilə özünü daha balanslı hiss et.')}
              </p>
              <button className="text-white flex items-center gap-2 text-[14px] sm:text-[15px] hover:opacity-80 transition-opacity mt-8 font-medium cursor-pointer">
                <span className="ponnala-nudge">{t('features.card2Cta', 'Bütün ritualları gör')}</span> <ArrowRight size={18} />
              </button>
            </div>
          </BorderGlow>

          <BorderGlow {...GLOW}>
            <div className={glassCard}>
              <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2 sm:gap-3 mb-6">
                <BookOpen size={24} className="text-[#00f2ff] shrink-0" strokeWidth={2} />
                <h3 className="text-white text-[20px] sm:text-[24px] font-medium tracking-wide ponnala-nudge">
                  {t('features.card3Title', 'Gündəlik Notlar')}
                </h3>
              </div>
              <p className="text-white/80 text-[14px] sm:text-[15px] leading-relaxed ponnala-nudge">
                {t('features.card3Desc', 'Düşüncələrini yaz və özünü daha yaxşı tanı.Gündəlik hisslərini qeyd edərək emosional vəziyyətini izləyə, öz inkişafını görə bilərsən.')}
              </p>
            </div>
          </BorderGlow>

          <BorderGlow className="sm:col-span-2 lg:col-span-2" {...GLOW}>
            <div className={`${glassCard} sm:flex-row justify-between items-start sm:items-center gap-6`}>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2 sm:gap-3 mb-4">
                  <Users size={24} className="text-[#00f2ff] shrink-0" strokeWidth={2} />
                  <h3 className="text-white text-[20px] sm:text-[24px] font-medium tracking-wide ponnala-nudge">
                    {t('features.card4Title', 'Dəstək və paylaşım icması')}
                  </h3>
                </div>
                <p className="text-white/80 text-[14px] sm:text-[15px] leading-relaxed max-w-[480px] ponnala-nudge">
                  {t('features.card4Desc', 'Oxşar təcrübələr yaşayan insanlarla təhlükəsiz mühitdə fikirlərini paylaş, dəstək al və tək olmadığını hiss et.')}
                </p>
              </div>
              <div className="flex -space-x-3 items-end pb-2">
                <img src={avatar1} alt="Avatar" className="w-12 h-12 rounded-full border-[2.5px] border-white/20 object-cover bg-slate-800" />
                <img src={avatar2} alt="Avatar" className="w-12 h-12 rounded-full border-[2.5px] border-white/20 object-cover bg-slate-800" />
                <img src={avatar3} alt="Avatar" className="w-12 h-12 rounded-full border-[2.5px] border-white/20 object-cover bg-slate-800" />
              </div>
            </div>
          </BorderGlow>
        </div>
      </ScrollReveal>
    </section>
  );
};
