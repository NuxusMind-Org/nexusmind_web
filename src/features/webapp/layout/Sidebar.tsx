import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Video,
  Image,
  Book,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Brain,
  FileText,
} from 'lucide-react';
import { PATHS } from '@/routes/paths';
import nexusLogo from '@/assets/svg/NexusMindLogo.svg';
import maleAvatar from '@/assets/male_avatar.png';

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isExpanded, onToggle }: SidebarProps) => {
  const [showMaariflenmeSub, setShowMaariflenmeSub] = useState(false);
  const [showMediaSub, setShowMediaSub] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mediaPopoverRef = useRef<HTMLDivElement>(null);
  const mediaButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const navItems = [
    { name: 'Ana səhifə', path: PATHS.DASHBOARD, icon: Home },
    { name: 'Qeydlərim', path: PATHS.WEBAPP_JOURNAL, icon: BookOpen },
    { name: 'Seanslarım', path: PATHS.WEBAPP_SESSIONS, icon: Video },
    { name: 'Media', path: PATHS.WEBAPP_MEDIA, icon: Image },
    { name: 'Maariflənmə', path: PATHS.WEBAPP_ENLIGHTENMENT, icon: Book },
    { name: 'Tənzimləmələr', path: PATHS.WEBAPP_SETTINGS, icon: Settings },
  ];

  const recentSearches = [
    'Neyropsixologiya və Vr - ın sintezi',
    'Neyropsixologiya və Vr - ın sintezi',
    'Neyropsixologiya və Vr - ın sintezi',
  ];

  // Auto-close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Maariflənmə popover close condition
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMaariflenmeSub(false);
      }

      // Media popover close condition
      if (
        mediaPopoverRef.current &&
        !mediaPopoverRef.current.contains(event.target as Node) &&
        mediaButtonRef.current &&
        !mediaButtonRef.current.contains(event.target as Node)
      ) {
        setShowMediaSub(false);
      }
    };

    if (showMaariflenmeSub || showMediaSub) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMaariflenmeSub, showMediaSub]);

  return (
    <aside
      className={`fixed top-0 left-0 h-full flex z-40 bg-[#482476] border-r border-white/5 transition-all duration-300 ${
        isExpanded ? 'w-[300px]' : 'w-[80px]'
      }`}
    >
      {/* 1. Left Navigation Column (always 80px) */}
      <div className="w-[80px] h-full flex flex-col justify-between items-center py-6 border-r border-white/5 flex-shrink-0">
        {/* Top Toggle Chevron */}
        <button
          onClick={onToggle}
          className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
        >
          {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>

        {/* Middle Navigation Items */}
        <nav className="flex flex-col gap-5 w-full items-center my-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isEnlightenment = item.path === PATHS.WEBAPP_ENLIGHTENMENT;
            const isMedia = item.path === PATHS.WEBAPP_MEDIA;

            const renderButtonContent = (isActive: boolean) => (
              <div className="flex flex-col items-center group w-full px-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-white/10 backdrop-blur-[6px] border border-white/25 text-white shadow-[inset_1.5px_1.5px_3px_rgba(255,255,255,0.4),_inset_-1.5px_-1.5px_3px_rgba(0,0,0,0.2),_0_8px_16px_-4px_rgba(0,0,0,0.2)] scale-105'
                      : 'text-white/60 group-hover:text-white group-hover:bg-white/5 hover:scale-105'
                  }`}
                >
                  <Icon size={20} />
                </div>
                <span
                  className={`text-[10px] mt-1 text-center font-medium transition-colors duration-200 truncate w-full ${
                    isActive ? 'text-white font-semibold' : 'text-white/60 group-hover:text-white'
                  }`}
                >
                  {item.name}
                </span>
              </div>
            );

            if (isEnlightenment) {
              const isEnlightenmentActive = showMaariflenmeSub || ['/articles', '/dashboard/articles', '/blog', '/dashboard/blog', '/trainings', PATHS.WEBAPP_ENLIGHTENMENT].includes(location.pathname);
              return (
                <div key={item.name} className="relative w-full flex justify-center">
                  <button
                    ref={buttonRef}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMaariflenmeSub(!showMaariflenmeSub);
                      setShowMediaSub(false);
                    }}
                    className="w-full flex justify-center cursor-pointer focus:outline-none"
                  >
                    {renderButtonContent(isEnlightenmentActive)}
                  </button>

                  {/* 3. Floating Sub-Navigation Popover Card for Maariflənmə */}
                  {showMaariflenmeSub && (
                    <div
                      ref={popoverRef}
                      className="absolute z-50 bg-white border-[2.5px] border-[#E5DFDF] rounded-[32px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] w-[195px] h-auto animate-fade-in text-left"
                      style={{
                        left: isExpanded ? '305px' : '85px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <div className="flex flex-col gap-[21px] py-[14px] px-4">
                        {[
                          {name: 'Məqalələr', path: PATHS.WEBAPP_ARTICLE, icon: BookOpen},
                          {name: 'Bloqlar', path: PATHS.WEBAPP_BLOG, icon: FileText},
                          {name: 'Təlimlər', path: PATHS.TRAININGS, icon: null},
                        ].map((sub) => {
                          const isCustomIcon = sub.name === 'Təlimlər';
                          return (
                            <NavLink
                              key={sub.path}
                              to={sub.path}
                              onClick={() => setShowMaariflenmeSub(false)}
                              className="flex items-center justify-between text-[#4D2059] hover:bg-[#4D2059]/5 px-2.5 py-1.5 rounded-2xl transition-colors duration-150 cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5">
                                {isCustomIcon ? (
                                  <svg
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-[#4D2059] flex-shrink-0"
                                  >
                                    <path d="M18 19c0-2.2-1.8-4-4-4H6c-2.2 0-4 1.8-4 4" />
                                    <circle cx="10" cy="8" r="4" />
                                    <path d="M17 9a3 3 0 0 1 0 6M20 7a6 6 0 0 1 0 10" />
                                  </svg>
                                ) : (
                                  sub.icon && <sub.icon size={20} className="text-[#4D2059] flex-shrink-0" />
                                )}
                                <span className="text-[12px] font-bold tracking-tight">{sub.name}</span>
                              </div>
                              <ChevronRight size={16} className="text-[#4D2059] opacity-80" />
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            if (isMedia) {
              const isMediaActive = showMediaSub || [PATHS.WEBAPP_GALLERY, PATHS.WEBAPP_NEWS, PATHS.WEBAPP_MEDIA].includes(location.pathname);
              return (
                <div key={item.name} className="relative w-full flex justify-center">
                  <button
                    ref={mediaButtonRef}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMediaSub(!showMediaSub);
                      setShowMaariflenmeSub(false);
                    }}
                    className="w-full flex justify-center cursor-pointer focus:outline-none"
                  >
                    {renderButtonContent(isMediaActive)}
                  </button>

                  {/* 4. Floating Sub-Navigation Popover Card for Media */}
                  {showMediaSub && (
                    <div
                      ref={mediaPopoverRef}
                      className="absolute z-50 bg-white border-[2.5px] border-[#E5DFDF] rounded-[32px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] w-[195px] h-auto animate-fade-in text-left"
                      style={{
                        left: isExpanded ? '305px' : '85px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      <div className="flex flex-col gap-[21px] py-[14px] px-4">
                        {[
                          { name: 'Qalereya', path: PATHS.WEBAPP_GALLERY, icon: Image },
                          { name: 'Xəbərlər', path: PATHS.WEBAPP_NEWS, icon: null },
                        ].map((sub) => {
                          const isCustomIcon = sub.name === 'Xəbərlər';
                          return (
                            <NavLink
                              key={sub.path}
                              to={sub.path}
                              onClick={() => setShowMediaSub(false)}
                              className="flex items-center justify-between text-[#4D2059] hover:bg-[#4D2059]/5 px-2.5 py-1 rounded-2xl transition-colors duration-150 cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5">
                                {isCustomIcon ? (
                                  <svg
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-[#4D2059] flex-shrink-0"
                                  >
                                    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                                    <line x1="8" y1="17" x2="8" y2="13" />
                                    <line x1="12" y1="17" x2="12" y2="9" />
                                    <line x1="16" y1="17" x2="16" y2="11" />
                                  </svg>
                                ) : (
                                  sub.icon && <sub.icon size={20} className="text-[#4D2059] flex-shrink-0" />
                                )}
                                <span className="text-[12px] font-bold tracking-tight">{sub.name}</span>
                              </div>
                              <ChevronRight size={16} className="text-[#4D2059] opacity-80" />
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === PATHS.DASHBOARD}
                className="w-full flex justify-center"
              >
                {({ isActive: linkActive }) => {
                  const finalActive = (showMaariflenmeSub || showMediaSub) ? false : linkActive;
                  return renderButtonContent(finalActive);
                }}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions (Notifications & Profile) */}
        <div className="flex flex-col items-center gap-6 w-full">
          {/* Notifications */}
          <NavLink
            to={PATHS.WEBAPP_NOTIFICATIONS}
            className={({ isActive }) =>
              `relative w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isActive ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#482476]" />
          </NavLink>

          {/* Avatar Profile */}
          <NavLink to={PATHS.WEBAPP_PROFILE} className="relative group">
            <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-orange-400 to-yellow-300 group-hover:scale-105 transition-transform duration-300">
              <img
                src={maleAvatar}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover border-2 border-white"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </NavLink>
        </div>
      </div>

      {/* 2. Right utility column (only shown when expanded) */}
      <div
        className={`flex-1 h-full flex flex-col pt-6 pb-8 transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'w-[220px] opacity-100 px-5' : 'w-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Brand Logo Header */}
        <div className="mb-8 flex items-center h-10">
          <img src={nexusLogo} alt="Nexus Mind" className="h-10 w-auto object-contain" />
        </div>

        {/* Son axtarılanlar Panel */}
        <div className="flex flex-col flex-1 mt-4">
          <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-4 block">
            Son axtarılanlar :
          </span>

          <div className="flex flex-col gap-4">
            {recentSearches.map((search, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
              >
                {/* Green Brain Icon container */}
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Brain size={16} />
                </div>

                <span className="text-[11px] text-white/80 group-hover:text-white leading-tight font-medium">
                  {search}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>


    </aside>
  );
};
