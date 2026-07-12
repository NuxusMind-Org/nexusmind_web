import { TESTIMONIALS } from '../../constants/testimonials';
import { ScrollReveal } from '../ScrollReveal';

export const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="relative w-full min-h-0 md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-[72px] py-10 md:py-20 scroll-mt-20"
    >
      <ScrollReveal className="w-full max-w-[1100px] mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-[30px] sm:text-[44px] font-bold text-white mb-3 tracking-tight">
            Real həyat hekayələri
          </h2>
          <p className="text-[15px] sm:text-[19px] text-white/80">
            İstifadəçilərimizin təcrübələri (50,000+ istifadəçidən)
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-[8px] p-6 sm:p-10 flex flex-col shadow-xl border border-transparent min-h-[300px]"
            >
              <p className="text-[#155a6d] text-[14px] sm:text-[16px] leading-relaxed mb-8 flex-1 font-medium">
                {testimonial.text}
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-[50px] h-[50px] rounded-full object-cover shadow-md"
                />
                <div className="flex flex-col">
                  <span className="text-[#1a2b3c] font-bold text-[15px]">{testimonial.author}</span>
                  <span className="text-[#667085] text-[13px]">{testimonial.profession}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};
