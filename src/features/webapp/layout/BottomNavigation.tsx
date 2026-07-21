import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Video,
  Users,
  MoreHorizontal,
  Image,
  Settings,
  Bell,
  FileText,
  X,
  ChevronRight,
} from 'lucide-react';
import { PATHS } from '@/routes/paths';

/** Primary tabs shown directly in the bottom bar (max 5). */
const PRIMARY_TABS = [
  { name: 'Ana səhifə', path: PATHS.DASHBOARD, icon: Home },
  { name: 'Qeydlər', path: PATHS.WEBAPP_JOURNAL, icon: BookOpen },
  { name: 'Seanslar', path: PATHS.WEBAPP_SESSIONS, icon: Video },
  { name: 'Ekspertlər', path: PATHS.WEBAPP_EXPERTS, icon: Users },
] as const;

/** Items inside the "More" bottom sheet. */
const MORE_ITEMS = [
  {
    group: 'Media',
    items: [
      { name: 'Qalereya', path: PATHS.WEBAPP_GALLERY, icon: Image },
      { name: 'Xəbərlər', path: PATHS.WEBAPP_NEWS, icon: FileText },
    ],
  },
  {
    group: 'Maariflənmə',
    items: [
      { name: 'Məqalələr', path: PATHS.WEBAPP_ARTICLE, icon: BookOpen },
      { name: 'Bloqlar', path: PATHS.WEBAPP_BLOG, icon: FileText },
      { name: 'Təlimlər', path: PATHS.WEBAPP_TRAININGS, icon: Users },
    ],
  },
  {
    group: 'Digər',
    items: [
      { name: 'Bildirişlər', path: PATHS.WEBAPP_NOTIFICATIONS, icon: Bell },
      { name: 'Tənzimləmələr', path: PATHS.WEBAPP_SETTINGS, icon: Settings },
    ],
  },
] as const;

export const BottomNavigation = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close sheet on route change
  useEffect(() => {
    setIsSheetOpen(false);
  }, [location.pathname]);

  // Close sheet when clicking outside
  useEffect(() => {
    if (!isSheetOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        setIsSheetOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isSheetOpen]);

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSheetOpen]);

  // Check if any "More" path is active
  const isMoreActive = MORE_ITEMS.some((group) =>
    group.items.some((item) => location.pathname.startsWith(item.path.split('/:')[0]))
  );

  return (
    <>
      {/* ── Bottom Bar ──────────────────────────────────────── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-center justify-around h-[64px] bg-[#2D1544]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
          {PRIMARY_TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.path === PATHS.DASHBOARD}
                className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] py-1 transition-colors"
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={22}
                      className={`transition-colors duration-200 ${
                        isActive ? 'text-[#00F2FF]' : 'text-white/50'
                      }`}
                    />
                    <span
                      className={`text-[10px] font-medium transition-colors duration-200 ${
                        isActive ? 'text-[#00F2FF]' : 'text-white/50'
                      }`}
                    >
                      {tab.name}
                    </span>
                    {isActive && (
                      <div className="absolute bottom-[calc(env(safe-area-inset-bottom,0px)+2px)] w-5 h-[3px] rounded-full bg-[#00F2FF] shadow-[0_0_8px_rgba(0,242,255,0.5)]" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

          {/* More Button */}
          <button
            onClick={() => setIsSheetOpen(!isSheetOpen)}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] py-1 transition-colors cursor-pointer ${
              isMoreActive || isSheetOpen ? 'text-[#00F2FF]' : 'text-white/50'
            }`}
          >
            <MoreHorizontal size={22} />
            <span className="text-[10px] font-medium">Əlavə</span>
          </button>
        </div>
      </nav>

      {/* ── Bottom Sheet Overlay ──────────────────────────── */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          isSheetOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Sheet */}
        <div
          ref={sheetRef}
          className={`absolute bottom-0 left-0 right-0 bg-[#1E0A42]/98 backdrop-blur-xl border-t border-white/15 rounded-t-[24px] shadow-[0_-8px_40px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isSheetOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' }}
        >
          {/* Sheet Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 rounded-full bg-white/30" />
          </div>

          {/* Close Button */}
          <div className="flex justify-end px-5 pb-2">
            <button
              onClick={() => setIsSheetOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Sheet Content */}
          <div className="px-5 pb-4 flex flex-col gap-5 max-h-[60vh] overflow-y-auto">
            {MORE_ITEMS.map((group) => (
              <div key={group.group}>
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider mb-2 block px-1">
                  {group.group}
                </span>
                <div className="flex flex-col gap-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname.startsWith(
                      item.path.split('/:')[0]
                    );
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors min-h-[48px] ${
                          isActive
                            ? 'bg-white/10 text-[#00F2FF]'
                            : 'text-white/80 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={20} className={isActive ? 'text-[#00F2FF]' : 'text-white/60'} />
                          <span className="text-[14px] font-medium">{item.name}</span>
                        </div>
                        <ChevronRight size={16} className="text-white/30" />
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
