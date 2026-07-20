import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export const SettingsPage = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col gap-6 text-left animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Tənzimləmələr</h1>
        <p className="text-gray-400 text-xs mt-1">Sistem və təhlükəsizlik tənzimləmələrini idarə edin.</p>
      </div>

      <div className="p-8 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <span className="text-sm text-gray-300 relative z-10 font-medium">
          Tənzimləmələr bölməsi tezliklə aktiv olacaq.
        </span>

        {/* Action item: Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-200 text-sm font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer w-fit shadow-md z-10"
        >
          <LogOut size={18} className="text-red-400" />
          Sistemdən çıxış
        </button>
      </div>
    </div>
  );
};
