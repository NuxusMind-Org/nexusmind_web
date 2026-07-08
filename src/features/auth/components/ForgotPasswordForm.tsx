import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { PATHS } from '@/routes/paths';
import nexusMindLogo from '@/assets/svg/NexusMindLogo.svg';
import { forgotPasswordSchema } from '../schemas/forgot-password.schema';
import type { ForgotPasswordFormInput, ForgotPasswordFormOutput } from '../schemas/forgot-password.schema';

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormInput, any, ForgotPasswordFormOutput>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: ForgotPasswordFormOutput) => {
    // API Call goes here
    console.log('Forgot Password data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock network
    navigate(PATHS.VERIFY_OTP, { state: { email: data.identifier } });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-[420px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link to={PATHS.HOME} className="flex items-center mb-6 self-start w-fit hover:opacity-80 transition-opacity">
          <img src={nexusMindLogo} alt="Nexus Mind Logo" className="h-10 object-contain cursor-pointer" />
        </Link>
        <h1 className="text-[32px] font-bold text-white mb-3 tracking-tight">Şifrənin bərpası</h1>
        <p className="text-[14px] text-[#A1A1AA] leading-relaxed">
          Şifrənizi yeniləməyiniz üçün sizə e-mail göndərəcəyik.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
          label="İstifadəçi adı"
          placeholder="xxxxxxxx@gmail.com"
          {...register('identifier')}
          error={errors.identifier?.message}
        />

        <div className="relative w-full group">
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
            Göndər
          </Button>
        </div>
      </form>

      <div className="mt-8 text-center">
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
