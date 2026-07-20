import { Eye } from 'lucide-react';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import vrConsultation from '@/assets/vr_consultation.png';

export const BlogPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white" style={{ background: "linear-gradient(180deg, #263151 5%, #245D68 45%, #914899 95%)" }}>
      <LandingNavbar activePage="blog" />

      {/* Page Content */}
      <div className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[60px] pb-[80px] flex flex-col items-center gap-10">
        
        {/* Left-Aligned Header Section */}
        <div className="w-full max-w-[1295px] text-left">
          <h1 className="text-[36px] sm:text-[48px] font-semibold text-white tracking-tight leading-tight">
            Bloqlar
          </h1>
          <p className="text-white/60 text-[15px] sm:text-[16px] font-light mt-2">
            Psixologiya ilə bağlı bloqlar
          </p>
        </div>

        {/* Featured Hero Blog Card */}
        <div className="w-full max-w-[1295px] flex flex-col lg:flex-row border border-[#FFFFFF38] rounded-[12px] overflow-hidden bg-[#FFFFFF0D] backdrop-blur-md hover:border-white/30 transition-all duration-300 lg:h-[500px] lg:min-h-[500px]">
          {/* Left Block - Image */}
          <div className="w-full lg:w-[58%] aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden relative">
            <img
              src={vrConsultation}
              alt="VR Terapiya"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Right Block - Text Details */}
          <div className="w-full lg:w-[42%] p-8 sm:p-10 flex flex-col justify-between bg-transparent text-left gap-6 lg:gap-0 lg:h-full">
            {/* Header Row */}
            <div className="flex items-center justify-between w-full">
              <span className="text-white text-[11px] font-semibold tracking-wider bg-[#4C5975] px-3.5 py-1 rounded-full uppercase select-none">
                BLOQLAR
              </span>
              <span className="text-white/50 text-[13px] font-light">
                24 Mart 2026
              </span>
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-3">
              <h2 className="text-white text-[24px] sm:text-[28px] font-bold leading-tight tracking-tight hover:text-[#00f2ff] transition-colors duration-300 cursor-pointer">
                VR Terapiyasının Gələcəyi: Virtual Dünyalarda Sağalma
              </h2>
              <p className="text-white/70 text-[14px] sm:text-[15px] leading-relaxed font-light line-clamp-3 lg:line-clamp-4">
                Rəqəmsal üfüqlərin psixoloji rifahımızı necə dəyişdirdiyini və virtual reallığın travma müalicəsindəki inqilabi rolunu kəşf edin.
              </p>
            </div>

            {/* Footer Row */}
            <div className="flex items-center justify-between w-full mt-4">
              <div className="flex items-center gap-2 text-white/50 text-[14px] font-light select-none">
                <Eye className="w-4 h-4" />
                <span>130 baxış</span>
              </div>
              <button className="bg-[#5c16c5] hover:bg-[#6f25db] text-white text-[14px] font-semibold px-6 py-2.5 rounded-full cursor-pointer transition-all duration-300 select-none">
                Davamını oxu
              </button>
            </div>
          </div>
        </div>

        {/* Placeholder cards grid */}
        <div className="w-full max-w-[1295px] grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
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
