import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const AppLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0D1117] text-white">
      {/* 1. Permanent Navigation Sidebar */}
      <Sidebar />

      {/* 2. Content Shell */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Header toolbar */}
        <Topbar />

        {/* Scrollable primary window */}
        <main className="flex-1 overflow-y-auto bg-[#090C10] p-6 lg:p-8">
          <div className="max-w-[1400px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
