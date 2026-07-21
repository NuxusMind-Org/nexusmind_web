import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { BottomNavigation } from './BottomNavigation';

export const AppLayout = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    return localStorage.getItem('sidebar_expanded') === 'true';
  });

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => {
      const next = !prev;
      localStorage.setItem('sidebar_expanded', String(next));
      return next;
    });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#482476] text-white relative">
      {/* 1. Desktop Sidebar — hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar isExpanded={isSidebarExpanded} onToggle={toggleSidebar} />
      </div>

      {/* 2. Content Shell */}
      <div
        className={`flex-1 h-full overflow-hidden transition-all duration-300 pl-0 ${
          isSidebarExpanded ? 'lg:pl-[300px]' : 'lg:pl-[80px]'
        }`}
      >
        {/* Scrollable primary window — responsive padding, mobile bottom-nav safe area */}
        <main className="h-full overflow-y-auto bg-transparent p-0 lg:p-8 pb-safe-bottom lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* 3. Mobile Bottom Navigation — hidden on desktop */}
      <BottomNavigation />
    </div>
  );
};

