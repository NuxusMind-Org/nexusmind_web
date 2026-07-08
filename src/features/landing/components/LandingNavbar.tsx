import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import nexusLogo from '@/assets/svg/NexusMindLogo.svg';

type ActivePage = 'landing' | 'journal' | 'psychologist';

interface LandingNavbarProps {
  activePage: ActivePage;
  activeSection?: number;
  scrollToSection?: (id: string) => void;
}

export const LandingNavbar = ({ activePage, activeSection, scrollToSection }: LandingNavbarProps) => {
  const navigate = useNavigate();

  const navItems = [
    { id: 'hero', label: 'Əsas səhifə', type: 'scroll', index: 0 },
    { id: 'experts', label: 'Mütəxəssislər', type: 'scroll', index: 9 },
    { id: 'testimonials', label: 'Media', type: 'scroll', index: 3 },
    { id: 'pillars', label: 'Maariflənmə', type: 'scroll', index: 2 },
    { id: 'journal', label: 'Qeydlərim', type: 'navigate' },
    { id: 'vr', label: 'Vr konsultasiya', type: 'scroll', index: 7 },
  ];

  const handleItemClick = (item: typeof navItems[0]) => {
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

  return (
    <header className="w-full px-[72px] py-4 flex items-center justify-between z-50 bg-white/5 backdrop-blur-md border-b border-white/10 shrink-0">
      <div
        onClick={() => navigate(PATHS.HOME)}
        className="flex items-center gap-2 cursor-pointer z-50 relative pointer-events-auto"
      >
        <img src={nexusLogo} alt="Nexus Mind" className="h-12 sm:h-14 w-auto" />
      </div>

      <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium z-50 relative">
        {navItems.map((item) => {
          const isActive = item.type === 'scroll'
            ? activePage === 'landing' && activeSection === item.index
            : activePage === 'journal';

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`transition-colors relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-[#00f2ff] hover:after:opacity-100 z-50 cursor-pointer pointer-events-auto ${
                isActive ? 'text-white after:opacity-100' : 'text-white/60 hover:text-white after:opacity-0'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="relative group z-50">
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9f5bff] via-[#00f2ff] to-white/90 pointer-events-none transition-opacity group-hover:opacity-100 opacity-60"
          style={{
            padding: '1.5px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
        <button
          onClick={() => navigate(PATHS.LOGIN)}
          className="px-8 py-2.5 rounded-full text-white text-[15px] font-medium bg-transparent hover:bg-white/5 transition-colors relative pointer-events-auto"
        >
          Giriş et
        </button>
      </div>
    </header>
  );
};
