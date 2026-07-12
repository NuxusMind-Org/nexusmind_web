import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import nexusLogo from '@/assets/svg/NexusMindLogo.svg';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

type ActivePage = 'landing' | 'journal' | 'psychologist' | 'blog' | 'articles' | 'news' | 'gallery' | 'trainings';

interface LandingNavbarProps {
  activePage: ActivePage;
  activeSection?: number;
  scrollToSection?: (id: string) => void;
}

export const LandingNavbar = ({ activePage, activeSection, scrollToSection }: LandingNavbarProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [headerBottom, setHeaderBottom] = useState(73);

  // Callback ref to measure real header height for portal positioning
  const headerRef = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      const rect = node.getBoundingClientRect();
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
    {
      id: 'media',
      label: 'Media',
      type: 'dropdown',
      items: [
        { label: 'Xəbərlər', path: PATHS.NEWS, page: 'news' as const },
        { label: 'Qalereya', path: PATHS.GALLERY, page: 'gallery' as const },
      ]
    },
    {
      id: 'pillars',
      label: 'Maariflənmə',
      type: 'dropdown',
      items: [
        { label: 'Blog', path: PATHS.BLOG, page: 'blog' as const },
        { label: 'Məqalələr', path: PATHS.ARTICLE, page: 'articles' as const },
        { label: 'Təlimlər', path: PATHS.TRAININGS, page: 'trainings' as const },
      ]
    },
    { id: 'journal', label: 'Qeydlərim', type: 'navigate' },
    { id: 'vr', label: 'Vr konsultasiya', type: 'scroll', index: 7 },
  ] as const;

  const handleItemClick = (item: typeof navItems[number]) => {
    if (item.type === 'dropdown') {
      setOpenDropdownId(prev => prev === item.id ? null : item.id);
      return;
    }
    setIsMobileMenuOpen(false);
    setOpenDropdownId(null);
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
  const mobileDrawer = createPortal(
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
          if (item.type === 'dropdown') {
            const isDropdownActive = item.items.some(subItem => subItem.page === activePage);
            const isDropdownOpen = openDropdownId === item.id;
            return (
              <div key={item.id} className="w-full flex flex-col">
                <button
                  onClick={() => handleItemClick(item)}
                  className={`text-left py-4 px-4 flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isDropdownActive ? 'text-[#00f2ff] font-semibold nav-active-glow' : 'text-white/80 hover:text-white'
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
                  <span>{item.label}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#00f2ff]' : 'text-white/60'}`}
                  />
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col bg-white/[0.02] ${
                    isDropdownOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                  style={{
                    borderBottom: isDropdownOpen ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}
                >
                  {item.items.map((subItem) => (
                    <button
                      key={subItem.path}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setOpenDropdownId(null);
                        navigate(subItem.path);
                      }}
                      className={`text-left py-3 px-8 text-[14px] transition-colors flex items-center justify-between ${
                        activePage === subItem.page ? 'text-[#00f2ff]' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <span>{subItem.label}</span>
                      <ChevronRight
                        size={14}
                        className={activePage === subItem.page ? 'text-[#00f2ff]' : 'text-white/40'}
                      />
                    </button>
                  ))}
                </div>
              </div>
            );
          }

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
          setOpenDropdownId(null);
          navigate(PATHS.LOGIN);
        }}
        className="w-full py-3.5 rounded-lg text-center text-white text-[16px] font-medium bg-gradient-to-r from-[#9f5bff] to-[#00f2ff] hover:opacity-90 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
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
  );

  return (
    <>
      <header ref={headerRef} className="w-full px-4 sm:px-8 md:px-[72px] py-4 flex items-center justify-between z-50 bg-white/5 backdrop-blur-md border-b border-white/10 shrink-0 sticky top-0">
        <div
          onClick={() => {
            setIsMobileMenuOpen(false);
            setOpenDropdownId(null);
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
            if (item.type === 'dropdown') {
              const isDropdownActive = item.items.some(subItem => subItem.page === activePage);
              return (
                <div key={item.id} className="relative group py-2">
                  <button
                    className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-[#00f2ff] hover:after:opacity-100 z-50 cursor-pointer pointer-events-auto flex items-center gap-1.5 ${
                      isDropdownActive ? 'text-white after:opacity-100' : 'text-white/60 hover:text-white after:opacity-0'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Card */}
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="glass-card rounded-lg p-3 flex flex-col gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                      {item.items.map((subItem) => (
                        <button
                          key={subItem.path}
                          onClick={() => navigate(subItem.path)}
                          className="group/item flex items-center justify-between text-white/80 hover:text-[#00f2ff] py-2 px-3 text-[14px] font-medium transition-colors cursor-pointer w-full text-left bg-transparent border-0 outline-none"
                        >
                          <span>{subItem.label}</span>
                          <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-[#00f2ff]" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

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
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#9f5bff] via-[#00f2ff] to-white/90 pointer-events-none transition-opacity group-hover:opacity-100 opacity-60"
            style={{
              padding: '1.5px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />
          <button
            onClick={() => navigate(PATHS.LOGIN)}
            className="px-8 py-2.5 rounded-lg text-white text-[15px] font-medium bg-transparent hover:bg-white/5 transition-colors relative pointer-events-auto"
          >
            Giriş et
          </button>
        </div>

        <button
          onClick={() => {
            const nextOpen = !isMobileMenuOpen;
            setIsMobileMenuOpen(nextOpen);
            if (!nextOpen) {
              setOpenDropdownId(null);
            }
          }}
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
