import { Heart, Sparkles, BookOpen, Users, ArrowRight } from 'lucide-react';
import purpleRoom from '@/assets/purple_room.png';
import avatar1 from '@/assets/avatar1.png';
import avatar2 from '@/assets/avatar2.png';
import avatar3 from '@/assets/avatar3.png';
import { ScrollReveal } from '../ScrollReveal';

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative w-full min-h-0 md:min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-[72px] py-10 md:py-20 scroll-mt-20"
    >
      <ScrollReveal className="w-full mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-[30px] sm:text-[44px] font-bold text-white mb-4 tracking-tight leading-snug">
            Daxili tarazlığı tap, özünü daha yaxşı anla.
          </h2>
          <p className="text-[16px] sm:text-[20px] text-white/80 font-medium">
            Psixoloji dəstək və özünüinkişaf üçün təhlükəsiz bir məkan
          </p>
        </div>

        {/* Feature Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Top Left — spans 2 cols */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[8px] p-6 sm:p-8 pb-[17px] flex flex-col overflow-hidden relative shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Heart size={24} className="text-[#00f2ff]" strokeWidth={2} />
              <h3 className="text-white text-[22px] sm:text-[26px] font-medium tracking-wide">Sənin hisslərin önəmlidir.</h3>
            </div>
            <p className="text-white/80 text-[14px] sm:text-[15px] leading-relaxed max-w-[450px] mb-8">
              Bu platforma düşüncələrini anlamaq, emosiyalarını idarə etmək və gündəlik streslə daha sağlam şəkildə başa çıxmaq üçün hazırlanıb.
              Sən burada tək deyilsən.Sevdiyin bir məkan seç və terapiyaya başla.
            </p>
            <div className="w-full h-[180px] sm:h-[220px] rounded-[8px] overflow-hidden mt-auto">
              <img src={purpleRoom} alt="Room" className="w-full h-full object-cover object-center border border-white/10 opacity-90" />
            </div>
          </div>

          {/* Top Right */}
          <div className="bg-[#2A7B9B] border border-white/10 rounded-[8px] p-6 sm:p-8 flex flex-col relative shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={24} className="text-white" strokeWidth={2} />
              <h3 className="text-white text-[22px] sm:text-[24px] font-medium tracking-wide">Gündəlik Rituallar</h3>
            </div>
            <p className="text-white/90 text-[14px] sm:text-[15px] leading-relaxed flex-1">
              Kiçik addımlarla psixoloji rifahını gücləndir.Nəfəs məşqləri,qısa meditasiya və gündəlik refleksiya ilə özünü daha balanslı hiss et.
            </p>
            <button className="text-white flex items-center gap-2 text-[14px] sm:text-[15px] hover:opacity-80 transition-opacity mt-8 font-medium cursor-pointer">
              Bütün ritualları gör <ArrowRight size={18} />
            </button>
          </div>

          {/* Bottom Left */}
          <div className="bg-[#276F8C] border border-white/10 rounded-[8px] p-6 sm:p-8 flex flex-col relative shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen size={24} className="text-white" strokeWidth={2} />
              <h3 className="text-white text-[22px] sm:text-[24px] font-medium tracking-wide">Gündəlik Notlar</h3>
            </div>
            <p className="text-white/90 text-[14px] sm:text-[15px] leading-relaxed">
              Düşhncelerinizi yaz və özünü daha yaxşı tanı.Gündəlik hisslərini qeyd edərək emosional vəziyyətini izləyə , öz inkişafını görə bilərsən.
            </p>
          </div>

          {/* Bottom Right — spans 2 cols */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[8px] p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative shadow-lg">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Users size={24} className="text-[#00f2ff]" strokeWidth={2} />
                <h3 className="text-white text-[22px] sm:text-[24px] font-medium tracking-wide">Dəstək və paylaşım icması</h3>
              </div>
              <p className="text-white/80 text-[14px] sm:text-[15px] leading-relaxed max-w-[480px]">
                Oxşar təcrübələr yaşayan insanlarla təhlükəsiz mühitdə fikirlərini paylaş, dəstək al və tək olmadığını hiss et.
              </p>
            </div>
            <div className="flex -space-x-3 items-end pb-2">
              <img src={avatar1} alt="Avatar" className="w-12 h-12 rounded-full border-[2.5px] border-[#3b4a6b] object-cover bg-slate-800" />
              <img src={avatar2} alt="Avatar" className="w-12 h-12 rounded-full border-[2.5px] border-[#3b4a6b] object-cover bg-slate-800" />
              <img src={avatar3} alt="Avatar" className="w-12 h-12 rounded-full border-[2.5px] border-[#3b4a6b] object-cover bg-slate-800" />
            </div>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
};
