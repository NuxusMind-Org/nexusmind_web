import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import nexusLogo from '@/assets/svg/UpdatedNexusMindNavbarLogo.svg';
import { useTranslation } from 'react-i18next';
import { LanguageSelector, AppIcon } from '@/components';
import { useAuthStore } from '@/store/authStore';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';

type ActivePage =
  | 'landing'
  | 'journal'
  | 'psychologist'
  | 'blog'
  | 'articles'
  | 'news'
  | 'gallery'
  | 'trainings'
  | 'experts'
  | 'sessions'
  | 'profile'
  | 'settings'
  | 'notifications'
  | 'mini-games';

interface LandingNavbarProps {
  activePage: ActivePage;
  activeSection?: number | string;
  scrollToSection?: (id: string) => void;
}

export const LandingNavbar = ({ activePage, activeSection, scrollToSection }: LandingNavbarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const headerElementRef = useRef<HTMLElement | null>(null);
  const [headerBottom, setHeaderBottom] = useState(73);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const { data: user } = useCurrentUser();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const userName = user?.name?.trim() || t('webapp.dashboard.defaultName', 'Dostum');
  const userInitial = userName.charAt(0).toUpperCase();

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

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
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Measure the viewport-relative bottom of the sticky header and keep it
  // updated whenever the header's size changes (e.g. on resize or font-load).
  const headerRef = useCallback((node: HTMLElement | null) => {
    headerElementRef.current = node;
  }, []);

  useEffect(() => {
    const node = headerElementRef.current;
    if (!node) return;

    const measure = () => {
      setHeaderBottom(node.getBoundingClientRect().bottom);
    };

    // Initial measurement
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(node);

    // Also update on scroll because `sticky` moves the bounding rect
    window.addEventListener('scroll', measure, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', measure);
    };
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
    { id: 'hero', label: t('nav.home', 'Əsas səhifə'), type: 'scroll' as const, index: 0 },
    { id: 'experts', label: t('nav.experts', 'Mütəxəssislər'), type: 'scroll' as const, index: 9 },
    ...(isAuthenticated
      ? [{ id: 'sessions', label: t('webapp.sidebar.sessions', 'Seanslarım'), type: 'route' as const, path: PATHS.SESSIONS, page: 'sessions' as const }]
      : []),
    {
      id: 'media',
      label: t('nav.media', 'Media'),
      type: 'dropdown' as const,
      items: [
        { label: t('nav.news', 'Xəbərlər'), path: PATHS.NEWS, page: 'news' as const },
        { label: t('nav.gallery', 'Qalereya'), path: PATHS.GALLERY, page: 'gallery' as const },
      ]
    },
    {
      id: 'pillars',
      label: t('nav.education', 'Maariflənmə'),
      type: 'dropdown' as const,
      items: [
        { label: t('nav.blog', 'Blog'), path: PATHS.BLOG, page: 'blog' as const },
        { label: t('nav.articles', 'Məqalələr'), path: PATHS.ARTICLE, page: 'articles' as const },
        { label: t('nav.trainings', 'Təlimlər'), path: PATHS.TRAININGS, page: 'trainings' as const },
      ]
    },
    { id: 'journal', label: t('nav.journal', 'Qeydlərim'), type: 'navigate' as const },
    { id: 'vr', label: t('nav.vrConsultation', 'Vr konsultasiya'), type: 'scroll' as const, index: 7 },
  ];

  const handleItemClick = (item: any) => {
    if (item.type === 'dropdown') {
      setOpenDropdownId(prev => prev === item.id ? null : item.id);
      return;
    }
    setIsMobileMenuOpen(false);
    setOpenDropdownId(null);
    if (item.type === 'route' && item.path) {
      navigate(item.path);
    } else if (item.type === 'scroll') {
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
        top: `${headerBottom}px`,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(18, 14, 38, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        padding: '20px 16px calc(24px + env(safe-area-inset-bottom, 0px)) 16px',
        opacity: isMobileMenuOpen ? 1 : 0,
        pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
      }}
    >
      <div className="glass-card rounded-2xl p-2.5 sm:p-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col gap-1 w-full max-w-lg mx-auto">
        <nav className="flex flex-col gap-1">
          {navItems.map((item, index) => {
            if (item.type === 'dropdown') {
              const isDropdownActive = item.items.some(subItem => subItem.page === activePage);
              const isDropdownOpen = openDropdownId === item.id;
              return (
                <div key={item.id} className="w-full flex flex-col">
                  <button
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className={`text-left py-3 px-3.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer w-full bg-transparent border-0 outline-none ${
                      isDropdownActive
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-white/80 hover:text-white hover:bg-white/5 active:bg-white/10'
                    }`}
                    style={{
                      transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(12px)',
                      opacity: isMobileMenuOpen ? 1 : 0,
                      transition: `transform 400ms cubic-bezier(0.25,1,0.5,1) ${index * 40}ms, opacity 400ms ease ${index * 40}ms, background-color 150ms ease`,
                    }}
                  >
                    <span className="ponnala-nudge">{item.label}</span>
                    <AppIcon
                      icon="lucide:chevron-down"
                      size={16}
                      className={`transition-transform duration-300 ${
                        isDropdownOpen ? 'rotate-180 text-white' : 'text-white/50'
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col gap-0.5 rounded-lg bg-white/[0.03] px-1 py-0.5 my-1 ${
                      isDropdownOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    {item.items.map((subItem) => {
                      const isSubActive = activePage === subItem.page;
                      return (
                        <button
                          key={subItem.path}
                          type="button"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setOpenDropdownId(null);
                            navigate(subItem.path);
                          }}
                          className={`text-left py-2.5 px-3.5 text-[14px] rounded-lg transition-colors flex items-center justify-between w-full bg-transparent border-0 outline-none cursor-pointer ${
                            isSubActive
                              ? 'text-white font-semibold bg-white/10'
                              : 'text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10'
                          }`}
                        >
                          <span className="ponnala-nudge">{subItem.label}</span>
                          {isSubActive ? (
                            <AppIcon icon="lucide:check" size={14} className="text-white/80 shrink-0" />
                          ) : (
                            <AppIcon icon="lucide:chevron-right" size={14} className="text-white/30 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const isActive = item.type === 'scroll'
              ? (activePage === 'landing' && (activeSection === item.index || (activeSection as any) === item.id)) || (activePage === item.id)
              : item.type === 'route'
              ? activePage === item.page
              : activePage === 'journal';

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item)}
                className={`text-left py-3 px-3.5 rounded-xl transition-colors cursor-pointer w-full bg-transparent border-0 outline-none flex items-center justify-between ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-white/80 hover:text-white hover:bg-white/5 active:bg-white/10'
                }`}
                style={{
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(12px)',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transition: `transform 400ms cubic-bezier(0.25,1,0.5,1) ${index * 40}ms, opacity 400ms ease ${index * 40}ms, background-color 150ms ease`,
                }}
              >
                <span className="inline-block ponnala-nudge">{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] shadow-[0_0_8px_rgba(0,242,255,0.6)] shrink-0" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Profile or Login section inside the same card */}
        {isAuthenticated ? (
          <div className="flex flex-col gap-1 pt-2 border-t border-white/10 mt-1">
            {/* User Info Header */}
            <div className="px-3 py-2.5 rounded-xl bg-white/[0.04] flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-[#9f5bff] to-[#00f2ff] p-[1.5px] shrink-0">
                {user?.profileImageUrl ? (
                  <img src={user.profileImageUrl} alt={userName} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#1b142d] flex items-center justify-center text-sm font-bold text-white">
                    {userInitial}
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[14px] font-semibold text-white truncate">{userName}</span>
                <span className="text-[12px] text-white/50 truncate">{user?.email || ''}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate(PATHS.PROFILE);
              }}
              className="group/item flex items-center justify-between text-white/80 hover:text-[#00f2ff] py-2.5 px-3 text-[14px] font-medium transition-colors cursor-pointer w-full text-left bg-transparent border-0 outline-none rounded-lg active:bg-white/5"
            >
              <div className="flex items-center gap-2.5">
                <AppIcon icon="lucide:user" size={16} className="text-white/60 group-hover/item:text-[#00f2ff] transition-colors" />
                <span className="ponnala-nudge">{t('webapp.sidebar.profile', 'Profilim')}</span>
              </div>
              <AppIcon icon="lucide:chevron-right" size={14} className="text-white/40 group-hover/item:text-[#00f2ff] group-hover/item:translate-x-0.5 transition-all" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate(PATHS.SETTINGS);
              }}
              className="group/item flex items-center justify-between text-white/80 hover:text-[#00f2ff] py-2.5 px-3 text-[14px] font-medium transition-colors cursor-pointer w-full text-left bg-transparent border-0 outline-none rounded-lg active:bg-white/5"
            >
              <div className="flex items-center gap-2.5">
                <AppIcon icon="lucide:settings" size={16} className="text-white/60 group-hover/item:text-[#00f2ff] transition-colors" />
                <span className="ponnala-nudge">{t('webapp.sidebar.settings', 'Tənzimləmələr')}</span>
              </div>
              <AppIcon icon="lucide:chevron-right" size={14} className="text-white/40 group-hover/item:text-[#00f2ff] group-hover/item:translate-x-0.5 transition-all" />
            </button>

            <div className="h-[1px] bg-white/10 my-1" />

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                logout();
                navigate(PATHS.HOME);
              }}
              className="group/item flex items-center justify-between text-rose-300/90 hover:text-rose-300 py-2.5 px-3 text-[14px] font-medium transition-colors cursor-pointer w-full text-left bg-transparent border-0 outline-none rounded-lg active:bg-rose-500/10"
            >
              <div className="flex items-center gap-2.5">
                <AppIcon icon="lucide:log-out" size={16} className="text-rose-400/80 group-hover/item:text-rose-300 transition-colors" />
                <span className="ponnala-nudge">{t('webapp.settings.logout', 'Çıxış et')}</span>
              </div>
              <AppIcon icon="lucide:chevron-right" size={14} className="text-rose-400/40 group-hover/item:text-rose-300 group-hover/item:translate-x-0.5 transition-all" />
            </button>
          </div>
        ) : (
          <div className="pt-2 border-t border-white/10 mt-1">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setOpenDropdownId(null);
                navigate(PATHS.LOGIN);
              }}
              className="w-full py-3.5 rounded-xl text-center text-white text-[15px] font-semibold bg-gradient-to-r from-[#9f5bff] to-[#00f2ff] hover:opacity-95 active:opacity-90 transition-opacity cursor-pointer shadow-[0_8px_24px_rgba(159,91,255,0.25)] border-0 outline-none"
            >
              <span className="inline-block ponnala-nudge">{t('nav.login', 'Giriş et')}</span>
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );

  const isSolid = isScrolled || isMobileMenuOpen;

  return (
    <>
      <header
        ref={headerRef}
        className={`w-full px-4 sm:px-8 md:px-[72px] py-4 flex items-center justify-between z-50 fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ${
          isSolid
            ? 'bg-[#16122d]/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/25'
            : 'bg-transparent border-b border-transparent'
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
                    <span className="ponnala-nudge">{item.label}</span>
                    <AppIcon icon="lucide:chevron-down" size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                  </button>

                  {/* pt-2 is a hover bridge so the pointer never leaves the group between trigger and card */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-48 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto transition-opacity duration-200 z-50">
                    <div className="glass-card rounded-lg p-3 flex flex-col gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                      {item.items.map((subItem) => (
                        <button
                          key={subItem.path}
                          onClick={() => navigate(subItem.path)}
                          className="group/item flex items-center justify-between text-white/80 hover:text-[#00f2ff] py-2 px-3 text-[14px] font-medium transition-colors cursor-pointer w-full text-left bg-transparent border-0 outline-none"
                        >
                          <span className="ponnala-nudge">{subItem.label}</span>
                          <AppIcon icon="lucide:chevron-right" size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-[#00f2ff]" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            const isActive = item.type === 'scroll'
              ? (activePage === 'landing' && (activeSection === item.index || (activeSection as any) === item.id)) || (activePage === item.id)
              : item.type === 'route'
              ? activePage === item.page
              : activePage === 'journal';

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-[#00f2ff] hover:after:opacity-100 z-50 cursor-pointer pointer-events-auto outline-none focus:outline-none focus-visible:outline-none ${isActive ? 'text-white after:opacity-100' : 'text-white/60 hover:text-white after:opacity-0'
                  }`}
              >
                <span className="inline-block ponnala-nudge">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Actions: Language Selector + (Profile & Notifications OR Login Button) */}
        <div className="hidden md:flex items-center gap-4 z-50">
          <LanguageSelector direction="down" />

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* Notifications Button */}
              <button
                type="button"
                onClick={() => navigate(PATHS.NOTIFICATIONS)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors relative cursor-pointer"
                aria-label="Notifications"
              >
                <AppIcon icon="lucide:bell" size={18} />
              </button>

              {/* User Menu Container */}
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(prev => !prev)}
                  className="flex items-center gap-2.5 py-1.5 pl-1.5 pr-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition-all duration-200 cursor-pointer text-white"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-[#9f5bff] to-[#00f2ff] p-[1.5px] shadow-sm">
                    {user?.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt={userName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-[#1b142d] flex items-center justify-center text-[13px] font-bold text-white">
                        {userInitial}
                      </div>
                    )}
                  </div>
                  <span className="text-[14px] font-medium max-w-[110px] truncate text-white/90">
                    {userName}
                  </span>
                  <AppIcon
                    icon="lucide:chevron-down"
                    size={14}
                    className={`text-white/60 transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-60 glass-card rounded-lg p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-50 text-white flex flex-col gap-1 animate-fade-in">
                    {/* User Info Header */}
                    <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2.5 mb-1">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-[#9f5bff] to-[#00f2ff] p-[1.5px] shrink-0">
                        {user?.profileImageUrl ? (
                          <img
                            src={user.profileImageUrl}
                            alt={userName}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-[#1b142d] flex items-center justify-center text-[12px] font-bold text-white">
                            {userInitial}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[14px] font-semibold text-white truncate">{userName}</span>
                        <span className="text-[12px] text-white/50 truncate">{user?.email || ''}</span>
                      </div>
                    </div>

                    {/* Links */}
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate(PATHS.PROFILE);
                      }}
                      className="group/item flex items-center justify-between text-white/80 hover:text-[#00f2ff] py-2 px-3 text-[14px] font-medium transition-colors cursor-pointer w-full text-left bg-transparent border-0 outline-none rounded-md"
                    >
                      <div className="flex items-center gap-2.5">
                        <AppIcon icon="lucide:user" size={15} className="text-white/60 group-hover/item:text-[#00f2ff] transition-colors" />
                        <span className="ponnala-nudge">{t('webapp.sidebar.profile', 'Profilim')}</span>
                      </div>
                      <AppIcon
                        icon="lucide:chevron-right"
                        size={14}
                        className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-[#00f2ff]"
                      />
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate(PATHS.SESSIONS);
                      }}
                      className="group/item flex items-center justify-between text-white/80 hover:text-[#00f2ff] py-2 px-3 text-[14px] font-medium transition-colors cursor-pointer w-full text-left bg-transparent border-0 outline-none rounded-md"
                    >
                      <div className="flex items-center gap-2.5">
                        <AppIcon icon="lucide:calendar" size={15} className="text-white/60 group-hover/item:text-[#00f2ff] transition-colors" />
                        <span className="ponnala-nudge">{t('webapp.sidebar.sessions', 'Seanslarım')}</span>
                      </div>
                      <AppIcon
                        icon="lucide:chevron-right"
                        size={14}
                        className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-[#00f2ff]"
                      />
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        navigate(PATHS.SETTINGS);
                      }}
                      className="group/item flex items-center justify-between text-white/80 hover:text-[#00f2ff] py-2 px-3 text-[14px] font-medium transition-colors cursor-pointer w-full text-left bg-transparent border-0 outline-none rounded-md"
                    >
                      <div className="flex items-center gap-2.5">
                        <AppIcon icon="lucide:settings" size={15} className="text-white/60 group-hover/item:text-[#00f2ff] transition-colors" />
                        <span className="ponnala-nudge">{t('webapp.sidebar.settings', 'Tənzimləmələr')}</span>
                      </div>
                      <AppIcon
                        icon="lucide:chevron-right"
                        size={14}
                        className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-[#00f2ff]"
                      />
                    </button>

                    <div className="h-[1px] bg-white/10 my-1" />

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                        navigate(PATHS.HOME);
                      }}
                      className="group/item flex items-center justify-between text-white/80 hover:text-rose-400 py-2 px-3 text-[14px] font-medium transition-colors cursor-pointer w-full text-left bg-transparent border-0 outline-none rounded-md"
                    >
                      <div className="flex items-center gap-2.5">
                        <AppIcon icon="lucide:log-out" size={15} className="text-white/60 group-hover/item:text-rose-400 transition-colors" />
                        <span className="ponnala-nudge">{t('webapp.settings.logout', 'Çıxış et')}</span>
                      </div>
                      <AppIcon
                        icon="lucide:chevron-right"
                        size={14}
                        className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-rose-400"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
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

                <span className="relative z-10 ponnala-nudge">{t('nav.login', 'Giriş et')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Header Actions (Language Selector + Hamburger) */}
        <div className="flex md:hidden items-center gap-1 z-50">
          <LanguageSelector direction="down" />

          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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
                <AppIcon icon="lucide:menu" size={24} />
              </div>
              {/* Close Icon */}
              <div
                className="absolute transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  transform: isMobileMenuOpen ? 'rotate(0) scale(1)' : 'rotate(90deg) scale(0.5)',
                  opacity: isMobileMenuOpen ? 1 : 0,
                }}
              >
                <AppIcon icon="lucide:x" size={24} />
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* Spacer for non-landing pages so content isn't hidden under the fixed navbar */}
      {activePage !== 'landing' && (
        <div className="w-full h-[72px] sm:h-[80px] md:h-[88px] shrink-0 pointer-events-none" aria-hidden="true" />
      )}

      {/* Mobile drawer rendered into document.body via Portal */}
      {mobileDrawer}
    </>
  );
};
