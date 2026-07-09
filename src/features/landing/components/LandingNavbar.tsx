import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import nexusLogo from '@/assets/svg/NexusMindLogo.svg';
import { Menu, X } from 'lucide-react';

type ActivePage = 'landing' | 'journal' | 'psychologist';

interface LandingNavbarProps {
  activePage: ActivePage;
  activeSection?: number;
  scrollToSection?: (id: string) => void;
}

export const LandingNavbar = ({ activePage, activeSection, scrollToSection }: LandingNavbarProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(73);
  const [isMounted, setIsMounted] = useState(false);

  // Measure real header height for portal positioning
  useEffect(() => {
    setIsMounted(true);
    const header = document.querySelector('header');
    if (header) {
      const rect = header.getBoundingClientRect();
      setHeaderBottom(rect.height);
    }
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'hero', label: 'Əsas səhifə', type: 'scroll', index: 0 },
    { id: 'experts', label: 'Mütəxəssislər', type: 'scroll', index: 9 },
    { id: 'testimonials', label: 'Media', type: 'scroll', index: 3 },
    { id: 'pillars', label: 'Maariflənmə', type: 'scroll', index: 2 },
    { id: 'journal', label: 'Qeydlərim', type: 'navigate' },
    { id: 'vr', label: 'Vr konsultasiya', type: 'scroll', index: 7 },
  ];

  const handleItemClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    if (item.type === 'scroll') {
      if (activePage === 'landing' && scrollToSection) {
        scrollToSection(item.id);
      } else {
        navigate(`${PATHS.HOME}#${item.id}`);
      }
    } else {
      navigate(PATHS.JOURNAL);
    }
  };

  // Mobile drawer rendered via Portal to escape stacking contexts
  const mobileDrawer = isMounted
    ? createPortal(
        <div
          className="transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            position: 'fixed',
            inset: 0,
            top: `${headerBottom}px`,
            zIndex: 9999,
            backgroundColor: '#111827',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 24px',
            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-16px)',
            opacity: isMobileMenuOpen ? 1 : 0,
            pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '32px' }}>
            {navItems.map((item, index) => {
              const isActive = item.type === 'scroll'
                ? activePage === 'landing' && activeSection === item.index
                : activePage === 'journal';

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`text-left py-4 px-4 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive ? 'text-[#00f2ff] font-semibold nav-active-glow' : 'text-white/80 hover:text-white'
                  }`}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                    width: '100%',
                    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(16px)',
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transitionDelay: isMobileMenuOpen ? `${index * 60}ms` : '0ms',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate(PATHS.LOGIN);
            }}
            className="w-full py-3.5 rounded-full text-center text-white text-[16px] font-medium bg-gradient-to-r from-[#9f5bff] to-[#00f2ff] hover:opacity-90 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
            style={{
              border: 'none',
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transitionDelay: isMobileMenuOpen ? `${navItems.length * 60 + 80}ms` : '0ms',
            }}
          >
            Giriş et
          </button>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <header className="w-full px-4 sm:px-8 md:px-[72px] py-4 flex items-center justify-between z-50 bg-white/5 backdrop-blur-md border-b border-white/10 shrink-0 relative">
        <div
          onClick={() => {
            setIsMobileMenuOpen(false);
            if (activePage === 'landing' && scrollToSection) {
              scrollToSection('hero');
            } else {
              navigate(PATHS.HOME);
            }
          }}
          className="flex items-center gap-2 cursor-pointer z-50 relative pointer-events-auto"
        >
          <img src={nexusLogo} alt="Nexus Mind" className="h-10 sm:h-12 md:h-14 w-auto" />
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium z-50 relative">
          {navItems.map((item) => {
            const isActive = item.type === 'scroll'
              ? activePage === 'landing' && activeSection === item.index
              : activePage === 'journal';

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-[#00f2ff] hover:after:opacity-100 z-50 cursor-pointer pointer-events-auto ${
                  isActive ? 'text-white after:opacity-100' : 'text-white/60 hover:text-white after:opacity-0'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden md:block relative group z-50">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9f5bff] via-[#00f2ff] to-white/90 pointer-events-none transition-opacity group-hover:opacity-100 opacity-60"
            style={{
              padding: '1.5px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          <button
            onClick={() => navigate(PATHS.LOGIN)}
            className="px-8 py-2.5 rounded-full text-white text-[15px] font-medium bg-transparent hover:bg-white/5 transition-colors relative pointer-events-auto"
          >
            Giriş et
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-50 p-2 text-white hover:text-[#00f2ff] transition-colors cursor-pointer relative w-10 h-10 flex items-center justify-center"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            {/* Hamburger Icon */}
            <div
              className="absolute transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: isMobileMenuOpen ? 'rotate(-90deg) scale(0.5)' : 'rotate(0) scale(1)',
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
            >
              <Menu size={24} />
            </div>
            {/* Close Icon */}
            <div
              className="absolute transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: isMobileMenuOpen ? 'rotate(0) scale(1)' : 'rotate(90deg) scale(0.5)',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              <X size={24} />
            </div>
          </div>
        </button>
      </header>

      {/* Mobile drawer rendered into document.body via Portal */}
      {mobileDrawer}
    </>
  );
};
