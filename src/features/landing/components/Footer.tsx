import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import nexusLogo from '@/assets/svg/NexusMindLogo.svg';
import qrCodeDemo from '@/assets/svg/qrCodeDemo.svg';
import appInterface from '@/assets/nexusmindAppInterface.jpeg';
import { PATHS } from '@/routes/paths';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#4E1070] text-white relative mt-24 z-20 rounded-t-[40px] sm:rounded-t-[64px] shadow-2xl overflow-visible">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 pt-12 md:pt-16 pb-8 relative overflow-visible">
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 relative z-10">
          {/* Left Main Section */}
          <div className="w-full lg:w-[65%] xl:w-[60%] flex flex-col">
            {/* Header Logo */}
            <div className="flex items-center mb-10">
              <Link to={PATHS.HOME} className="inline-block">
                <img src={nexusLogo} alt="Nexus Mind Logo" className="h-[55px] sm:h-[65px] w-auto object-contain" />
              </Link>
            </div>

            {/* Content Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 mb-12">
              {/* Column 1: Quick Links */}
              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-[16px] sm:text-[17px] mb-2 tracking-wide">Cəld Keçidlər</h4>
                <Link to="#faq" className="text-white/80 hover:text-white transition-colors text-[14px] sm:text-[15px]">
                  FAQ
                </Link>
                <Link to={PATHS.HOME} className="text-white/80 hover:text-white transition-colors text-[14px] sm:text-[15px]">
                  Haqqımızda
                </Link>
                <Link to="#experts" className="text-white/80 hover:text-white transition-colors text-[14px] sm:text-[15px]">
                  Mütəxəssislər
                </Link>
              </div>

              {/* Column 2: Contact Info */}
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-[16px] sm:text-[17px] mb-1 tracking-wide">Əlaqə</h4>
                <div className="flex items-start gap-3 text-white/80 text-[14px] sm:text-[15px] leading-snug">
                  <MapPin size={18} className="shrink-0 mt-0.5 text-white/90" />
                  <span>Bakı şəhəri, Neftçilər prospekti 123, AZ1000</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 text-[14px] sm:text-[15px]">
                  <Phone size={18} className="shrink-0 text-white/90" />
                  <a href="tel:+994124000000" className="hover:text-white transition-colors">
                    +994 (12) 400 00 00
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/80 text-[14px] sm:text-[15px]">
                  <Mail size={18} className="shrink-0 text-white/90" />
                  <a href="mailto:info@ethereal-sanctuary.az" className="hover:text-white transition-colors">
                    info@ethereal-sanctuary.az
                  </a>
                </div>
              </div>

              {/* Column 3: Download App & QR Code */}
              <div className="flex flex-col gap-3">
                <h4 className="font-bold text-[16px] sm:text-[17px] mb-1 tracking-wide">Tətbiqi yükləyin</h4>

                <div className="flex items-start gap-3">
                  {/* QR Code Container */}
                  <div className="bg-white p-2 rounded-xl shadow-md shrink-0 border border-white/20">
                    <img src={qrCodeDemo} alt="Download App QR Code" className="w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] object-contain" />
                  </div>

                  {/* App Store / Play Store Buttons Stack */}
                  <div className="flex flex-col gap-2 justify-center py-1">
                    {/* Google Play Button */}
                    <a
                      href="#"
                      className="bg-black/90 hover:bg-black text-white border border-white/20 px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-all shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734c0-.38.214-.722.609-.92zm11.6 11.6l2.357-2.357-11.455-6.62 9.098 8.977zm0 1.172l-9.098 8.977 11.455-6.62-2.357-2.357zm1.414-1.414l3.197 1.848a1 1 0 0 1 0 1.732l-3.197 1.848-2.28-2.28 2.28-2.28z" />
                      </svg>
                      <div className="flex flex-col items-start leading-none text-left">
                        <span className="text-[8px] text-white/70 uppercase font-medium">GET IT ON</span>
                        <span className="text-[12px] font-bold mt-0.5">Google Play</span>
                      </div>
                    </a>

                    {/* App Store Button */}
                    <a
                      href="#"
                      className="bg-black/90 hover:bg-black text-white border border-white/20 px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-all shadow-sm"
                    >
                      <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.11-1 .04-2.18.67-2.88 1.48-.63.73-1.18 1.9-1.03 3.03 1.11.09 2.25-.58 2.92-1.4" />
                      </svg>
                      <div className="flex flex-col items-start leading-none text-left">
                        <span className="text-[8px] text-white/70 uppercase font-medium">Download on the</span>
                        <span className="text-[12px] font-bold mt-0.5">App Store</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links ("Bizi izləyin") */}
            <div className="flex flex-col gap-3 mb-10">
              <h4 className="font-bold text-[16px] sm:text-[17px] tracking-wide">Bizi izləyin</h4>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="#"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Section: Protruding Mobile Phone Mockup */}
          <div className="hidden lg:block lg:w-[35%] xl:w-[40%] relative min-h-[440px]">
            {/* Phone Frame extending vertically above top of footer, cut cleanly at bottom line */}
            <div className="absolute right-4 xl:right-10 -top-30 xl:-top-28 bottom-0 w-[280px] sm:w-[310px] xl:w-[335px] bg-black rounded-t-[48px] border-t-[8px] border-x-[8px] border-b-0 border-black shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden z-20">
              <img
                src={appInterface}
                alt="NexusMind Mobile App Interface"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full border-t border-white/20 mb-3 relative z-10" />

        {/* Copyright Footer Bar */}
        <div className="w-full flex items-center justify-start relative z-10">
          <p className="text-white/70 text-[13px] sm:text-[14px]">
            © 2026 NexusMind | Bütün hüquqlar qorunur
          </p>
        </div>
      </div>
    </footer>
  );
};
