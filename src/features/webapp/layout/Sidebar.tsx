import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  CheckSquare,
  MessageSquare,
  BookOpen,
  User,
  LogOut,
  Brain,
} from 'lucide-react';
import { PATHS } from '@/routes/paths';

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate(PATHS.LOGIN);
  };

  const navItems = [
    { name: 'Dashboard', path: PATHS.DASHBOARD, icon: Home },
    { name: 'Rituals', path: PATHS.JOURNAL, icon: CheckSquare },
    { name: 'Chat', path: PATHS.CHAT, icon: MessageSquare },
    { name: 'Blogs', path: PATHS.BLOG, icon: BookOpen },
  ];

  return (
    <aside className="w-[260px] h-full bg-[#0D1117] border-r border-white/5 flex flex-col justify-between flex-shrink-0">
      {/* Brand Logo Header */}
      <div>
        <div className="h-[70px] flex items-center px-6 border-b border-white/5">
          <NavLink to={PATHS.DASHBOARD} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-[#00F2FF] flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Brain size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-[#00F2FF] group-hover:to-white transition-all duration-300">
              NexusMind
            </span>
          </NavLink>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-[14px] font-medium ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600/20 to-[#00F2FF]/5 border border-[#00F2FF]/10 text-white font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      className={`transition-colors duration-200 ${
                        isActive
                          ? 'text-[#00F2FF]'
                          : 'text-gray-400 group-hover:text-white'
                      }`}
                    />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile / Settings & Logout */}
      <div className="p-4 border-t border-white/5 flex flex-col gap-1.5">
        <NavLink
          to={PATHS.PROFILE}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-[14px] font-medium ${
              isActive
                ? 'bg-gradient-to-r from-purple-600/20 to-[#00F2FF]/5 border border-[#00F2FF]/10 text-white font-semibold'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <User
                size={18}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-[#00F2FF]' : 'text-gray-400 group-hover:text-white'
                }`}
              />
              <span>Profile Settings</span>
            </>
          )}
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-950/10 border border-transparent hover:border-red-500/10 transition-all duration-200 text-left text-[14px] font-medium w-full"
        >
          <LogOut size={18} className="text-gray-400 group-hover:text-red-400" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
