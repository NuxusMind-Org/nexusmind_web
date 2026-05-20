
import { Link } from 'react-router-dom';
import nexusLogo from '@/assets/nexusmindlogo.png';
import nexie from '@/assets/nexie.png';
import nexieCloud from '@/assets/nexie_cloud.png';

export const Footer = () => {
  return (
    <div className="w-full mt-24 bg-[#2D1B44]/90 backdrop-blur-xl rounded-t-[40px] px-8 md:px-16 pt-16 pb-8 relative flex flex-col justify-between overflow-visible border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] shrink-0">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between relative h-full">
        {/* Left Side: Brand, Links, Socials */}
        <div className="flex flex-col w-full md:w-[60%] z-10 h-full">
          {/* Logo */}
          <div className="flex items-center mb-12">
            <img src={nexusLogo} alt="Nexus Mind Logo" className="h-[70px] w-auto object-contain" />
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap gap-12 md:gap-20 mb-auto">
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-bold text-[16px] mb-1">Nexus App</h4>
              <Link to="#" className="text-white/70 hover:text-white transition-colors text-[14px]">Overview</Link>
              <Link to="#" className="text-white/70 hover:text-white transition-colors text-[14px]">Features</Link>
              <Link to="#" className="text-white/70 hover:text-white transition-colors text-[14px]">Team</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-bold text-[16px] mb-1">How it works</h4>
              <Link to="#" className="text-white/70 hover:text-white transition-colors text-[14px]">For users</Link>
              <Link to="#" className="text-white/70 hover:text-white transition-colors text-[14px]">For specialists</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-white font-bold text-[16px] mb-1">Support</h4>
              <Link to="#" className="text-white/70 hover:text-white transition-colors text-[14px]">FAQ</Link>
              <Link to="#" className="text-white/70 hover:text-white transition-colors text-[14px]">Help center</Link>
            </div>
          </div>
          
          {/* Bottom Row of Left Side */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-6 mt-12 md:mt-0">
            <div className="mb-6 md:mb-0">
              <p className="text-white font-medium mb-3 text-[14px]">Download our mobile app</p>
              <div className="flex gap-3">
                <button className="bg-black/80 border border-white/10 hover:border-white/30 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[9px] text-white/60 leading-none">GET IT ON</span>
                    <span className="text-[13px] font-semibold leading-none mt-1">Google Play</span>
                  </div>
                </button>
                <button className="bg-black/80 border border-white/10 hover:border-white/30 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[9px] text-white/60 leading-none">Download on the</span>
                    <span className="text-[13px] font-semibold leading-none mt-1">App Store</span>
                  </div>
                </button>
              </div>
            </div>
            
            <div>
              <p className="text-white font-medium mb-3 text-[14px]">Follow us on</p>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-[#422B63] rounded-full flex items-center justify-center hover:bg-[#5E3F8C] cursor-pointer transition-colors shadow-lg border border-white/10">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <div className="w-10 h-10 bg-[#422B63] rounded-full flex items-center justify-center hover:bg-[#5E3F8C] cursor-pointer transition-colors shadow-lg border border-white/10">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.181a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
                </div>
                <div className="w-10 h-10 bg-[#422B63] rounded-full flex items-center justify-center hover:bg-[#5E3F8C] cursor-pointer transition-colors shadow-lg border border-white/10">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </div>
                <div className="w-10 h-10 bg-[#422B63] rounded-full flex items-center justify-center hover:bg-[#5E3F8C] cursor-pointer transition-colors shadow-lg border border-white/10">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Nexie Mascot */}
        <div className="hidden lg:flex absolute right-0 -top-[230px] w-[380px] flex-col items-center justify-end z-20 group">
          <img 
            src={nexieCloud} 
            alt="Cloud message" 
            className="w-[200px] h-auto object-contain mb-[-30px] z-10 animate-bounce drop-shadow-xl" 
          />
          <img 
            src={nexie} 
            alt="Nexie Mascot" 
            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>
      
      {/* Footer Bottom Bar */}
      <div className="w-full max-w-[1200px] mx-auto border-t border-white/10 pt-5 mt-6 relative z-10">
        <p className="text-white/50 text-[12px]">
          © 2026 Nexus Mind. Bütün hüquqlar qorunur. Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>
    </div>
  );
};
