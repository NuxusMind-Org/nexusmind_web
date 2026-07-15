import { useParams } from 'react-router-dom';
import { Star, GraduationCap, Award, Video, Clock, Lock, CheckCircle2 } from 'lucide-react';
import vrConsultation from '@/assets/vr_consultation.png';
import { Footer } from '../components/Footer';
import { LandingNavbar } from '../components/LandingNavbar';
import { psychologists } from '../data/psychologists';

export const PsychologistPage = () => {
  const { id } = useParams<{ id: string }>();
  const psychologistId = id ? parseInt(id, 10) : 1;
  const psych = psychologists.find(p => p.id === psychologistId) || psychologists[0];

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-white" style={{ background: "linear-gradient(180deg, #263151 5%, #245D68 45%, #914899 95%)" }}>
      <LandingNavbar activePage="psychologist" />

      {/* Main Content Container */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[40px] pb-[80px] flex flex-col gap-8">

        <h1 className="text-[32px] sm:text-[42px] md:text-[56px] font-serif font-light text-white mb-2 leading-tight">
          Psixoloq haqqında
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Profile Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col sm:flex-row gap-6 sm:gap-8 relative items-center sm:items-start text-center sm:text-left">
              <div className="relative shrink-0">
                <img src={psych.image} alt={psych.name} className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full object-cover border-4 border-white/20 shadow-lg mx-auto" />
                <div className="absolute -bottom-3 right-0 bg-[#03C6B2] text-[#111] px-3 py-1 rounded-full text-[12px] font-light flex items-center gap-1 shadow-md">
                  <Star size={12} fill="currentColor" /> {psych.rating}
                </div>
              </div>

              <div className="flex flex-col flex-1 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-2 gap-3 sm:gap-0">
                  <div>
                    <h2 className="text-[24px] sm:text-[32px] font-light text-white leading-tight">{psych.name}</h2>
                    <p className="text-white/70 text-[14px]">{psych.experience} • {psych.title}</p>
                  </div>
                  <div className="text-[#03C6B2] font-light text-[24px] sm:text-[28px] text-center sm:text-right">
                    ${psych.price}<span className="text-[14px] text-white/70 font-normal"> /seans</span>
                  </div>
                </div>

                <p className="text-white/80 text-[15px] leading-relaxed mt-4 mb-6">
                  {psych.description}
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start mt-auto">
                  {psych.languages.map(lang => (
                    <span key={lang} className="px-3 sm:px-4 py-1.5 rounded-full border border-[#03C6B2]/20 bg-[#03C6B2]/5 text-[#03C6B2] text-[12px] sm:text-[13px]">{lang}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Row (Education & Certifications) */}
            <div className="flex flex-col md:flex-row gap-6">

              {/* Education */}
              <div className="flex-1 bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl">
                <h3 className="text-white text-[18px] font-light flex items-center gap-2 mb-6">
                  <GraduationCap className="text-white/80" size={20} /> Təhsil
                </h3>
                <div className="flex flex-col gap-5">
                  {psych.education.map((edu, i) => (
                    <div key={i} className="border-l-2 border-white/20 pl-4">
                      <h4 className="text-white font-light mb-1">{edu.uni}</h4>
                      <p className="text-white/60 text-[13px]">{edu.degree}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="flex-1 bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl">
                <h3 className="text-white text-[18px] font-light flex items-center gap-2 mb-6">
                  <Award className="text-white/80" size={20} /> Sertifikatlar
                </h3>
                <div className="flex flex-col gap-3">
                  {psych.certifications.map((cert, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-lg border border-white/5">
                      <CheckCircle2 size={18} className="text-[#00f2ff]" />
                      <span className="text-white/80 text-[13px]">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Specializations */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl">
              <h3 className="text-white text-[18px] font-light mb-6">İxtisaslaşdığı sahələr</h3>
              <div className="flex flex-wrap gap-3">
                {psych.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white/90 text-[14px]">{tag}</span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[350px] xl:w-[400px] flex flex-col gap-6">

            {/* Booking Box */}
            <div className="bg-[#2D3E50]/60 backdrop-blur-xl rounded-lg p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col">
              <h3 className="text-white text-[20px] font-medium mb-6">Məsləhət Təyin Edin</h3>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#03C6B2]/20 text-[#03C6B2] text-[10px] font-light px-2 py-1 rounded-bl-lg tracking-wider">TEZLİKLƏ</div>
                <p className="text-white/60 text-[13px] mb-1">Növbəti mövcud vaxt:</p>
                <p className="text-white font-medium text-[16px]">Sabah, 14:00 - 15:00</p>
              </div>

              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Video size={18} className="text-white/70" />
                  <span className="text-white/80 text-[14px]">Onlayn Video Seans</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-white/70" />
                  <span className="text-white/80 text-[14px]">60 dəqiqəlik görüş</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock size={18} className="text-white/70" />
                  <span className="text-white/80 text-[14px]">Məxfi və Təhlükəsiz</span>
                </div>
              </div>

              <button className="w-full py-4 bg-[#c084fc] hover:bg-[#a855f7] text-[#1e1b4b] font-light text-[16px] rounded-lg transition-colors shadow-lg">
                Seans Təyin Et
              </button>

              <p className="text-center text-white/40 text-[11px] mt-4">
                Ləğv etmə siyasəti: 24 saat əvvəl
              </p>
            </div>

            {/* VR Consultation Mini Box */}
            <div className="w-full h-[180px] rounded-lg overflow-hidden relative group cursor-pointer shadow-xl border border-white/10">
              <img src={vrConsultation} alt="VR Consultation" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#eeb3b3]/30 backdrop-blur-xl border border-white/20 rounded-lg p-4">
                <h4 className="text-[14px] font-light text-[#111] mb-1">VR KONSULTASİYA</h4>
                <p className="text-[9px] text-[#222] font-light line-clamp-2">Burada evdən çölə çıxmadan istədiyin konfort zonanı seçə və orada zaman keçirərək sakitləşə bilərsən.</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Footer — full width */}
      <Footer />
    </div>
  );
};
