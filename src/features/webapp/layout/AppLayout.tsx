import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

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
      {/* 1. Permanent Navigation Sidebar */}
      <Sidebar isExpanded={isSidebarExpanded} onToggle={toggleSidebar} />

      {/* 2. Content Shell */}
      <div
        className={`flex-1 h-full overflow-hidden transition-all duration-300 ${
          isSidebarExpanded ? 'pl-[300px]' : 'pl-[80px]'
        }`}
      >
        {/* Scrollable primary window */}
        <main className="h-full overflow-y-auto bg-transparent p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
