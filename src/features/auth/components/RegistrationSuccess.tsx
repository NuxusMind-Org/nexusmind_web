import { Link, useLocation } from 'react-router-dom';
import { Handshake } from 'lucide-react';
import { Button } from '@/components/button';
import { PATHS } from '@/routes/paths';

export const RegistrationSuccess = () => {
  const location = useLocation();
  const email = location.state?.email || 'xxxxxxxx@gmail.com';

  return (
    <div className="w-full h-full flex flex-col justify-center items-center max-w-[420px] mx-auto px-6 py-8 text-center">
      {/* Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-[100px] h-[100px] rounded-full bg-[#1A4F65] flex items-center justify-center shadow-[0_0_32px_rgba(0,242,255,0.15)]">
          <Handshake size={52} className="text-white" strokeWidth={1.5} />
        </div>
      </div>

      {/* Text */}
      <h1 className="text-[28px] font-bold text-white mb-6 tracking-tight leading-tight">
        NexusMind - a xoş gəlmisiniz !
      </h1>
      <p className="text-[22px] text-white font-medium mb-12">
        {email}
      </p>

      {/* Button */}
      <div className="relative w-full group">
        <div 
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-500 to-white/90 pointer-events-none transition-opacity group-hover:opacity-80"
          style={{
            padding: '1.5px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />
        <Link to={PATHS.ONBOARDING} className="w-full block">
          <Button
            type="button"
            variant="glass"
            size="lg"
            className="w-full !border-0 !rounded-lg bg-white/5 hover:bg-white/10"
          >
            Başlayaq
          </Button>
        </Link>
      </div>
    </div>
  );
};
