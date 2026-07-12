import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { PATHS } from '@/routes/paths';
import nexusMindLogo from '@/assets/svg/NexusMindLogo.svg';
import { loginSchema } from '../schemas/login.schema';
import type { LoginFormInput, LoginFormOutput } from '../schemas/login.schema';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput, unknown, LoginFormOutput>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = async () => {
    // TODO: Implement login API call
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock network
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-[420px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to={PATHS.HOME} className="flex items-center mb-6 self-start w-fit hover:opacity-80 transition-opacity">
          <img src={nexusMindLogo} alt="Nexus Mind Logo" className="h-10 object-contain cursor-pointer" />
        </Link>
        <h1 className="text-[32px] font-bold text-white mb-1 tracking-tight">Daxil ol</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="İstifadəçi adı"
          placeholder="xxxxxxxxxx"
          {...register('username')}
          error={errors.username?.message}
        />

        <div className="flex flex-col gap-1">
          <Input
            label="Şifrə"
            type={showPassword ? 'text' : 'password'}
            placeholder="Ən az 8 simvol"
            {...register('password')}
            error={errors.password?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
          <div className="flex justify-end mt-1">
            <Link to={PATHS.FORGOT_PASSWORD} className="text-[10px] text-brand hover:text-white font-semibold tracking-wide uppercase transition-colors">
              ŞİFRƏNİ UNUTMUSAN ?
            </Link>
          </div>
        </div>

        <div className="relative mt-4 w-full group">
          <div 
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-500 to-white/90 pointer-events-none transition-opacity group-hover:opacity-80"
            style={{
              padding: '1.5px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
          />
          <Button
            type="submit"
            variant="glass"
            size="lg"
            className="w-full !border-0 !rounded-lg bg-white/5 hover:bg-white/10"
            isLoading={isSubmitting}
          >
            Daxil ol
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-[14px] text-ui-muted">
          Hesabın yoxdur ?{' '}
          <Link to={PATHS.REGISTER} className="text-brand hover:text-white transition-colors font-medium">
            Qeydiyyatdan keç
          </Link>
        </p>
      </div>
    </div>
  );
};
