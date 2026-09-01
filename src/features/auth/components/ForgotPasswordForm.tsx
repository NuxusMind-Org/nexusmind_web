import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { PATHS } from '@/routes/paths';
import nexusMindLogo from '@/assets/svg/NexusMindLogo.svg';
import { forgotPasswordSchema } from '../schemas/forgot-password.schema';
import type { ForgotPasswordFormInput, ForgotPasswordFormOutput } from '../schemas/forgot-password.schema';
import { useForgotPassword } from '../hooks/useForgotPassword';

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const forgotPasswordMutation = useForgotPassword();
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormInput, unknown, ForgotPasswordFormOutput>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: ForgotPasswordFormOutput) => {
    try {
      await forgotPasswordMutation.mutateAsync({ email: data.email });
      setSubmittedEmail(data.email);
      // Navigate to reset password page carrying the email in route state
      setTimeout(() => {
        navigate(PATHS.NEW_PASSWORD, { state: { email: data.email } });
      }, 1500);
    } catch {
      // Even if network or server issue occurs, user can retry
    }
  };

  const getErrorMessage = (error: unknown): string => {
    if (!error) return 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.';
    const axiosErr = error as AxiosError<{ message?: string; error?: string } | string>;
    if (typeof axiosErr.response?.data === 'string' && axiosErr.response.data.trim()) {
      return axiosErr.response.data;
    }
    if (typeof axiosErr.response?.data === 'object' && axiosErr.response?.data) {
      if (axiosErr.response.data.message) return axiosErr.response.data.message;
      if (axiosErr.response.data.error) return axiosErr.response.data.error;
    }
    return 'Şifrə bərpası sorğusu göndərilərkən xəta baş verdi. Yenidən cəhd edin.';
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
          Şifrənizi yeniləməyiniz üçün sizə e-mail ilə təsdiq kodu göndərəcəyik.
        </p>
      </div>

      {submittedEmail ? (
        <div className="flex flex-col gap-6 animate-fade-in">
          <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-sm py-4 px-4 rounded-lg leading-relaxed text-center">
            Əgər daxil etdiyiniz email sistemdə mövcuddursa, təsdiq kodu göndərildi. Növbəti mərhələyə yönləndirilirsiniz...
          </div>
          <Button
            type="button"
            variant="glass"
            size="lg"
            className="w-full !rounded-lg bg-white/10 hover:bg-white/15"
            onClick={() => navigate(PATHS.NEW_PASSWORD, { state: { email: submittedEmail } })}
          >
            Davam et
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <Input
            label="Email ünvanı"
            type="email"
            placeholder="xxxxxx@gmail.com"
            {...register('email')}
            error={errors.email?.message}
          />

          {forgotPasswordMutation.isError && (
            <div className="text-red-400 text-xs text-center font-medium bg-red-950/30 border border-red-500/20 py-2.5 px-3 rounded-md">
              {getErrorMessage(forgotPasswordMutation.error)}
            </div>
          )}

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
            <Button
              type="submit"
              variant="glass"
              size="lg"
              className="w-full !border-0 !rounded-lg bg-white/5 hover:bg-white/10"
              isLoading={isSubmitting || forgotPasswordMutation.isPending}
            >
              Təsdiq kodu göndər
            </Button>
          </div>
        </form>
      )}

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

