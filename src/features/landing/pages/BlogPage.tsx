import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';

export const BlogPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white" style={{ background: 'linear-gradient(260.37deg, #263151 -4.41%, #245D68 51.97%, #914899 100%)', backgroundAttachment: 'fixed' }}>
      <LandingNavbar activePage="blog" />

      {/* Page Content */}
      <div className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[60px] pb-[80px] flex flex-col items-center">
        <div className="w-full max-w-[1100px] text-center mb-16">
          <h1 className="text-[42px] sm:text-[56px] font-serif font-light text-white mb-4 leading-tight">
            Bizim <span className="text-[#c39ffd] font-light">Blog</span>
          </h1>
          <p className="text-white/80 text-[16px] sm:text-[18px] max-w-[650px] mx-auto">
            Ruh sağlamlığı, emosional rifah və fərdi inkişaf haqqında ən son məqalələr, məsləhətlər və faydalı məlumatlar.
          </p>
        </div>

        {/* Placeholder cards grid */}
        <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 shadow-xl hover:translate-y-[-4px] transition-transform duration-300">
              <div className="w-full h-[200px] bg-[#2a3a46]/50 flex items-center justify-center border-b border-white/10 text-white/30 text-[14px]">
                Şəkil Placeholder
              </div>
              <div className="p-6">
                <span className="text-[#c39ffd] text-[12px] font-medium uppercase tracking-wider">MÜASİR TERAPİYA</span>
                <h3 className="text-white text-[20px] font-semibold mt-2 mb-3 leading-snug">Rəqəmsal dövrdə daxili sakitliyi necə qorumalı?</h3>
                <p className="text-white/60 text-[14px] leading-relaxed mb-6 line-clamp-3">
                  Gündəlik rəqəmsal səs-küyün emosional vəziyyətimizə təsirləri və mindfullness vasitəsilə diqqətimizi toplamağın yolları.
                </p>
                <button className="text-[#00f2ff] hover:underline text-[14px] font-medium flex items-center gap-1 cursor-pointer">
                  Davamını oxu <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
