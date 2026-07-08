import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { PATHS } from '@/routes/paths';
import nexusMindLogo from '@/assets/svg/NexusMindLogo.svg';
import { newPasswordSchema } from '../schemas/new-password.schema';
import type { NewPasswordFormInput, NewPasswordFormOutput } from '../schemas/new-password.schema';

export const NewPasswordForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordFormInput, any, NewPasswordFormOutput>({
    resolver: zodResolver(newPasswordSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: NewPasswordFormOutput) => {
    // API Call goes here
    console.log('New Password data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock network
    navigate(PATHS.LOGIN);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-[420px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to={PATHS.HOME} className="flex items-center mb-6 self-start w-fit hover:opacity-80 transition-opacity">
          <img src={nexusMindLogo} alt="Nexus Mind Logo" className="h-10 object-contain cursor-pointer" />
        </Link>
        <h1 className="text-[32px] font-bold text-white mb-1 tracking-tight">Yeni şifrə yarat</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="Yeni şifrə"
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

        <Input
          label="Yeni şifrə təkrar"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Ən az 8 simvol"
          {...register('passwordConfirmation')}
          error={errors.passwordConfirmation?.message}
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="hover:text-white transition-colors"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <div className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            id="rememberMe"
            className="w-4 h-4 rounded-[4px] border-[#4F4F6C] bg-transparent text-[#8B5CF6] focus:ring-[#8B5CF6] focus:ring-offset-0 cursor-pointer"
            {...register('rememberMe')}
          />
          <label htmlFor="rememberMe" className="text-[12px] font-medium text-ui-muted uppercase tracking-wide cursor-pointer select-none">
            YADDA SAXLA
          </label>
        </div>

        <div className="relative mt-4 w-full group">
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-white/90 pointer-events-none transition-opacity group-hover:opacity-80"
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
            className="w-full !border-0 !rounded-full bg-white/5 hover:bg-white/10"
            isLoading={isSubmitting}
          >
            Şifrəni təyin et
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-[14px] text-ui-muted">
          Artıq hesabın var ?{' '}
          <Link to={PATHS.LOGIN} className="text-[#8B5CF6] hover:text-white transition-colors font-medium">
            Daxil ol
          </Link>
        </p>
      </div>
    </div>
  );
};
