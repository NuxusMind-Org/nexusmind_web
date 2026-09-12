import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import nexusLogo from '@/assets/svg/UpdatedNexusMindNavbarLogo.svg';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/components';

type ActivePage = 'landing' | 'journal' | 'psychologist' | 'blog' | 'articles' | 'news' | 'gallery' | 'trainings';

interface LandingNavbarProps {
  activePage: ActivePage;
  activeSection?: number;
  scrollToSection?: (id: string) => void;
}

export const LandingNavbar = ({ activePage, activeSection, scrollToSection }: LandingNavbarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [headerBottom, setHeaderBottom] = useState(73);
  const [isScrolled, setIsScrolled] = useState(false);

  const loginBtnRef = useRef<HTMLButtonElement>(null);
  const targetPos = useRef({ x: 81, y: 19 });
  const currentPos = useRef({ x: 81, y: 19 });
  const isHoveringBtn = useRef(false);
  const animFrameId = useRef<number | null>(null);

  const updateSpotlight = () => {
    if (!loginBtnRef.current) return;

    // Smooth trailing interpolation (0.12 factor provides a silky, slightly slowed-down response)
    const dx = targetPos.current.x - currentPos.current.x;
    const dy = targetPos.current.y - currentPos.current.y;

    currentPos.current.x += dx * 0.12;
    currentPos.current.y += dy * 0.12;

    const x = currentPos.current.x;
    const y = currentPos.current.y;
    const rectWidth = 162.18;

    const t = Math.max(0, Math.min(1, x / rectWidth));

    // Color progression based on landing page gradient: #914899 (purple) -> #245D68 (teal) -> #263151 (blue)
    let r: number, g: number, b: number;
    let r2: number, g2: number, b2: number;

    if (t < 0.5) {
      const p = t * 2;
      // Purple (168, 85, 247) to Cyan/Teal (0, 235, 255)
      r = Math.round(168 + (0 - 168) * p);
      g = Math.round(85 + (235 - 85) * p);
      b = Math.round(247 + (255 - 247) * p);

      // Secondary: #914899 (145, 72, 153) to #245D68 (36, 93, 104)
      r2 = Math.round(145 + (36 - 145) * p);
      g2 = Math.round(72 + (93 - 72) * p);
      b2 = Math.round(153 + (104 - 153) * p);
    } else {
      const p = (t - 0.5) * 2;
      // Cyan/Teal (0, 235, 255) to Blue (59, 130, 246)
      r = Math.round(0 + (59 - 0) * p);
      g = Math.round(235 + (130 - 235) * p);
      b = Math.round(255 + (246 - 255) * p);

      // Secondary: #245D68 (36, 93, 104) to #263151 (38, 49, 81)
      r2 = Math.round(36 + (38 - 36) * p);
      g2 = Math.round(93 + (49 - 93) * p);
      b2 = Math.round(104 + (81 - 104) * p);
    }

    const el = loginBtnRef.current;
    el.style.setProperty('--mouse-x', `${x.toFixed(2)}px`);
    el.style.setProperty('--mouse-y', `${y.toFixed(2)}px`);
    el.style.setProperty('--spotlight-color', `rgb(${r}, ${g}, ${b})`);
    el.style.setProperty('--spotlight-color-end', `rgb(${r2}, ${g2}, ${b2})`);
    el.style.setProperty('--spotlight-fill', `rgba(${r}, ${g}, ${b}, 0.16)`);

    if (isHoveringBtn.current || Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
      animFrameId.current = requestAnimationFrame(updateSpotlight);
    } else {
      animFrameId.current = null;
    }
  };

  const handleLoginMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    targetPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (!animFrameId.current) {
      animFrameId.current = requestAnimationFrame(updateSpotlight);
    }
  };

  const handleLoginMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    isHoveringBtn.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    targetPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (!animFrameId.current) {
      animFrameId.current = requestAnimationFrame(updateSpotlight);
    }
  };

  const handleLoginMouseLeave = () => {
    isHoveringBtn.current = false;
  };

  useEffect(() => {
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Track window scroll position to toggle navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    { id: 'hero', label: t('nav.home', 'Əsas səhifə'), type: 'scroll', index: 0 },
    { id: 'experts', label: t('nav.experts', 'Mütəxəssislər'), type: 'scroll', index: 9 },
    {
      id: 'media',
      label: t('nav.media', 'Media'),
      type: 'dropdown',
      items: [
        { label: t('nav.news', 'Xəbərlər'), path: PATHS.NEWS, page: 'news' as const },
        { label: t('nav.gallery', 'Qalereya'), path: PATHS.GALLERY, page: 'gallery' as const },
      ]
    },
    {
      id: 'pillars',
      label: t('nav.education', 'Maariflənmə'),
      type: 'dropdown',
      items: [
        { label: t('nav.blog', 'Blog'), path: PATHS.BLOG, page: 'blog' as const },
        { label: t('nav.articles', 'Məqalələr'), path: PATHS.ARTICLE, page: 'articles' as const },
        { label: t('nav.trainings', 'Təlimlər'), path: PATHS.TRAININGS, page: 'trainings' as const },
      ]
    },
    { id: 'journal', label: t('nav.journal', 'Qeydlərim'), type: 'navigate' },
    { id: 'vr', label: t('nav.vrConsultation', 'Vr konsultasiya'), type: 'scroll', index: 7 },
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
        padding: '32px 24px calc(32px + env(safe-area-inset-bottom, 0px)) 24px',
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
                  className={`text-left py-4 px-4 flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isDropdownActive ? 'text-[#00f2ff] font-semibold nav-active-glow' : 'text-white/80 hover:text-white'
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
                  className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col bg-white/[0.02] ${isDropdownOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
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
                      className={`text-left py-3 px-8 text-[14px] transition-colors flex items-center justify-between ${activePage === subItem.page ? 'text-[#00f2ff]' : 'text-white/60 hover:text-white'
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
              className={`text-left py-4 px-4 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? 'text-[#00f2ff] font-semibold nav-active-glow' : 'text-white/80 hover:text-white'
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
        {t('nav.login', 'Giriş et')}
      </button>
    </div>,
    document.body
  );

  const isSolid = isScrolled || isMobileMenuOpen;

  return (
    <>
      <header
        ref={headerRef}
        className={`w-full px-4 sm:px-8 md:px-[72px] py-4 flex items-center justify-between z-50 border-b border-white/10 shrink-0 sticky top-0 transition-all duration-300 ease-in-out ${isSolid ? 'bg-[#253D57] shadow-lg' : 'navbar-glass'
          }`}
      >
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
                    className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-[#00f2ff] hover:after:opacity-100 z-50 cursor-pointer pointer-events-auto flex items-center gap-1.5 ${isDropdownActive ? 'text-white after:opacity-100' : 'text-white/60 hover:text-white after:opacity-0'
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
                className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-[#00f2ff] hover:after:opacity-100 z-50 cursor-pointer pointer-events-auto ${isActive ? 'text-white after:opacity-100' : 'text-white/60 hover:text-white after:opacity-0'
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions: Language Selector + Login Button */}
        <div className="hidden md:flex items-center gap-4 z-50">
          <LanguageSelector direction="down" />

          <div className="relative group">
            <button
              ref={loginBtnRef}
              onClick={() => navigate(PATHS.LOGIN)}
              onMouseMove={handleLoginMouseMove}
              onMouseEnter={handleLoginMouseEnter}
              onMouseLeave={handleLoginMouseLeave}
              className="relative w-[162.18px] h-[38.78px] rounded-[20.53px] flex items-center justify-center text-white text-[15px] font-medium transition-all duration-300 hover:opacity-90 cursor-pointer pointer-events-auto"
              style={{
                background: 'linear-gradient(180deg, rgba(104, 1, 254, 0.06) 0%, rgba(217, 217, 217, 0.06) 100%)',
                boxShadow: '0 9.13px 36.5px 0 rgba(104, 1, 255, 0.12)',
              }}
            >
              {/* Outer Angular Gradient Border (Idle base) */}
              <div
                className="absolute -inset-[1.14px] rounded-[21.67px] pointer-events-none transition-opacity duration-500 ease-out"
                style={{
                  padding: '1.14px',
                  background:
                    'conic-gradient(from 315deg, #6700FF 0%, rgba(255, 255, 255, 0.04) 25%, #FFFFFF 50%, rgba(255, 255, 255, 0.07) 75%, #6700FF 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />

              {/* Glowing Spotlight Border (Cursor-Tracking from Purple to Blue) */}
              <div
                className="absolute -inset-[1.14px] rounded-[21.67px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out bg-[radial-gradient(120px_circle_at_var(--mouse-x)_var(--mouse-y),var(--spotlight-color,#a855f7)_0%,var(--spotlight-color-end,#6366f1)_50%,transparent_100%)]"
                style={{
                  padding: '1.14px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />

              {/* Subtle Fill Reflection (Cursor-Tracking from Purple to Blue) */}
              <div
                className="absolute inset-0 rounded-[20.53px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out bg-[radial-gradient(140px_circle_at_var(--mouse-x)_var(--mouse-y),var(--spotlight-fill,rgba(168,85,247,0.15)),transparent_70%)]"
              />

              <span className="relative z-10">{t('nav.login', 'Giriş et')}</span>
            </button>
          </div>
        </div>

        {/* Mobile Header Actions (Language Selector + Hamburger) */}
        <div className="flex md:hidden items-center gap-1 z-50">
          <LanguageSelector direction="down" />

          <button
            onClick={() => {
              const nextOpen = !isMobileMenuOpen;
              setIsMobileMenuOpen(nextOpen);
              if (!nextOpen) {
                setOpenDropdownId(null);
              }
            }}
            className="p-2 text-white hover:text-[#00f2ff] transition-colors cursor-pointer relative w-10 h-10 flex items-center justify-center"
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
        </div>
      </header>

      {/* Mobile drawer rendered into document.body via Portal */}
      {mobileDrawer}
    </>
  );
};
