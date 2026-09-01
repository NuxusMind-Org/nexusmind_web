import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, KeyRound, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { PATHS } from '@/routes/paths';
import nexusMindLogo from '@/assets/svg/NexusMindLogo.svg';
import { newPasswordSchema } from '../schemas/new-password.schema';
import type { NewPasswordFormInput, NewPasswordFormOutput } from '../schemas/new-password.schema';
import { useResetPassword } from '../hooks/useResetPassword';
import { authApi } from '../api/auth.api';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

export const NewPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve email passed from Forgot Password page
  const initialEmail = location.state?.email || '';
  const [email, setEmail] = useState<string>(initialEmail);

  const resetPasswordMutation = useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Resend cooldown timer (60 seconds)
  const [resendCooldown, setResendCooldown] = useState(60);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordFormInput, unknown, NewPasswordFormOutput>({
    resolver: zodResolver(newPasswordSchema),
    mode: 'onTouched',
  });

  const passwordValue = watch('newPassword', '');

  const onSubmit = async (data: NewPasswordFormOutput) => {
    if (!email) {
      return;
    }
    try {
      await resetPasswordMutation.mutateAsync({
        email,
        otp: data.otp.trim(),
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      setIsSuccess(true);
      setTimeout(() => {
        navigate(PATHS.LOGIN);
      }, 2000);
    } catch {
      // Handled via resetPasswordMutation.error
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0 || !email || isResending) return;
    setIsResending(true);
    setResendStatus(null);
    try {
      await authApi.forgotPassword({ email });
      setResendCooldown(60);
      setResendStatus('Yeni təsdiq kodu email ünvanınıza göndərildi.');
    } catch {
      setResendStatus('Kodu yenidən göndərmək mümkün olmadı. Zəhmət olmasa bir az sonra cəhd edin.');
    } finally {
      setIsResending(false);
    }
  };

  const getErrorMessage = (error: unknown): string => {
    if (!error) return 'Xəta baş verdi. Məlumatları yoxlayıb yenidən cəhd edin.';
    const axiosErr = error as AxiosError<{ message?: string; error?: string } | string>;
    if (typeof axiosErr.response?.data === 'string' && axiosErr.response.data.trim()) {
      return axiosErr.response.data;
    }
    if (typeof axiosErr.response?.data === 'object' && axiosErr.response?.data) {
      if (axiosErr.response.data.message) return axiosErr.response.data.message;
      if (axiosErr.response.data.error) return axiosErr.response.data.error;
    }
    return 'Şifrəni yeniləmək mümkün olmadı. Təsdiq kodunu və şifrə tələblərini yoxlayın.';
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-[420px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link to={PATHS.HOME} className="flex items-center mb-6 self-start w-fit hover:opacity-80 transition-opacity">
          <img src={nexusMindLogo} alt="Nexus Mind Logo" className="h-10 object-contain cursor-pointer" />
        </Link>
        <h1 className="text-[32px] font-bold text-white mb-2 tracking-tight">Yeni şifrə təyin et</h1>
        {email ? (
          <p className="text-[13px] text-[#A1A1AA] leading-relaxed">
            <span className="text-brand font-medium">{email}</span> ünvanına göndərilən təsdiq kodunu və yeni şifrənizi daxil edin.
          </p>
        ) : (
          <p className="text-[13px] text-[#A1A1AA] leading-relaxed">
            Email ünvanınızı, sizə göndərilən təsdiq kodunu və yeni şifrənizi daxil edin.
          </p>
        )}
      </div>

      {isSuccess ? (
        <div className="flex flex-col items-center text-center gap-4 py-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-xl font-bold text-white">Şifrəniz uğurla yeniləndi!</h2>
          <p className="text-sm text-gray-300">
            Giriş səhifəsinə yönləndirilirsiniz...
          </p>
          <Button
            type="button"
            variant="glass"
            size="lg"
            className="w-full mt-4 !rounded-lg bg-white/10 hover:bg-white/15"
            onClick={() => navigate(PATHS.LOGIN)}
          >
            Daxil ol
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Fallback Email Input if user arrived without state */}
          {!initialEmail && (
            <Input
              label="Email ünvanı"
              type="email"
              placeholder="xxxxxx@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}

          {/* OTP Input */}
          <div className="flex flex-col gap-1">
            <Input
              label="Təsdiq kodu (OTP)"
              placeholder="Email ilə göndərilən kod"
              {...register('otp')}
              error={errors.otp?.message}
              rightElement={<KeyRound size={18} className="text-white/40" />}
            />
            {email && (
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendCooldown > 0 || isResending}
                  className={`text-[11px] font-semibold tracking-wide transition-colors ${
                    resendCooldown > 0 || isResending
                      ? 'text-ui-muted/50 cursor-not-allowed'
                      : 'text-brand hover:text-white cursor-pointer'
                  }`}
                >
                  {resendCooldown > 0
                    ? `Kodu yenidən göndər (${resendCooldown}s)`
                    : 'Kodu yenidən göndər'}
                </button>
              </div>
            )}
          </div>

          {resendStatus && (
            <div className="text-xs text-brand bg-brand/10 border border-brand/20 py-2 px-3 rounded-md">
              {resendStatus}
            </div>
          )}

          {/* New Password */}
          <div className="flex flex-col gap-1">
            <Input
              label="Yeni şifrə"
              type={showPassword ? 'text' : 'password'}
              placeholder="Ən az 8 simvol"
              {...register('newPassword')}
              error={errors.newPassword?.message}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-white transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
            <PasswordStrengthIndicator password={passwordValue} />
            <p className="text-[11px] text-white/50 mt-1">
              Tələblər: 8–50 simvol, ən az 1 böyük hərf, 1 kiçik hərf və 1 rəqəm.
            </p>
          </div>

          {/* Confirm Password */}
          <Input
            label="Yeni şifrənin təkrarı"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Şifrəni təkrar daxil edin"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="hover:text-white transition-colors cursor-pointer"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          {resetPasswordMutation.isError && (
            <div className="text-red-400 text-xs text-center font-medium bg-red-950/30 border border-red-500/20 py-2.5 px-3 rounded-md">
              {getErrorMessage(resetPasswordMutation.error)}
            </div>
          )}

          <div className="relative mt-2 w-full group">
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
              isLoading={isSubmitting || resetPasswordMutation.isPending}
            >
              Şifrəni yenilə
            </Button>
          </div>
        </form>
      )}

      <div className="mt-6 text-center">
        <p className="text-[14px] text-ui-muted">
          Şifrənizi xatırladınız?{' '}
          <Link to={PATHS.LOGIN} className="text-[#8B5CF6] hover:text-white transition-colors font-medium">
            Daxil ol
          </Link>
        </p>
      </div>
    </div>
  );
};

