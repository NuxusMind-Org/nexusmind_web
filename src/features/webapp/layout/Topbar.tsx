import { useLocation } from 'react-router-dom';
import { Bell, Search, User as UserIcon } from 'lucide-react';
import { useMe } from '@/features/auth/hooks/useMe';
import { PATHS } from '@/routes/paths';

export const Topbar = () => {
  const location = useLocation();
  const { data: userEmail, isLoading } = useMe();

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case PATHS.DASHBOARD:
        return 'Dashboard';
      case PATHS.JOURNAL:
        return 'Habits & Rituals';
      case PATHS.CHAT:
        return 'Psychologist Chat';
      case PATHS.BLOG:
        return 'Explore Blogs';
      case PATHS.PROFILE:
        return 'Profile Settings';
      default:
        return 'Portal';
    }
  };

  return (
    <header className="h-[70px] w-full bg-[#0D1117] border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
      {/* Dynamic Title */}
      <h2 className="text-xl font-bold text-white tracking-tight">
        {getPageTitle(location.pathname)}
      </h2>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative max-w-[240px] hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search dashboard..."
            className="w-full bg-white/[0.03] border border-white/5 hover:border-white/10 focus:border-[#00F2FF]/50 text-white rounded-xl pl-9 pr-4 py-1.5 text-xs outline-none transition-colors"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-8 h-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 flex items-center justify-center transition-colors cursor-pointer">
          <Bell size={16} className="text-gray-300" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00F2FF]" />
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3 border-l border-white/5 pl-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00F2FF] to-purple-600 flex items-center justify-center shadow-md">
            <UserIcon size={14} className="text-white" />
          </div>
          <div className="flex flex-col text-left hidden sm:flex">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Pasient
            </span>
            <span className="text-xs text-white font-medium truncate max-w-[120px]">
              {isLoading ? 'Loading...' : userEmail || 'user@nexusmind.az'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
