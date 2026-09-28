import { useTranslation } from 'react-i18next';
import { TESTIMONIALS } from '../../constants/testimonials';
import { ScrollReveal } from '../ScrollReveal';

export const TestimonialsSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="testimonials"
      className="relative w-full min-h-0 flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-[72px] py-16 md:py-24 scroll-mt-20"
    >
      <ScrollReveal className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
        <div className="text-center mb-14 md:mb-16">
          <h2 className="text-[28px] sm:text-[48px] lg:text-[64px] font-bold text-white mb-3 tracking-tight leading-tight ponnala-nudge">
            {t('testimonials.title', 'Real həyat hekayələri')}
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-[28px] p-5 sm:p-8 md:p-12 flex flex-col shadow-xl border border-transparent md:min-h-[400px]"
            >
              <p className="text-[#155a6d] text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed mb-10 flex-1 font-medium ponnala-nudge">
                {t(`testimonials.t${testimonial.id}Text`, testimonial.text)}
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-[56px] h-[56px] rounded-full object-cover shadow-md"
                />
                <div className="flex flex-col">
                  <span className="text-[#1a2b3c] font-bold text-[17px] ponnala-nudge">{testimonial.author}</span>
                  <span className="text-[#667085] text-[14px] ponnala-nudge">
                    {t(`testimonials.t${testimonial.id}Role`, testimonial.profession)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};
