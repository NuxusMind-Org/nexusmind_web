import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
import { Button } from '@/components/button';
import { verifyOtpSchema } from '../schemas/verify-otp.schema';
import type { VerifyOtpFormInput, VerifyOtpFormOutput } from '../schemas/verify-otp.schema';
import { useVerifyOtp } from '../hooks/useVerifyOtp';
import { authApi } from '../api/auth.api';
import { AxiosError } from 'axios';

export const VerifyOtpForm = () => {
  const location = useLocation();
  const email = location.state?.email || 'xxxxxxxx@gmail.com';
  const isRegistrationFlow = location.state?.isRegistrationFlow || false;
  
  const verifyOtpMutation = useVerifyOtp();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Timer state (5 minutes = 300 seconds)
  const [timeLeft, setTimeLeft] = useState(300);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpFormInput, unknown, VerifyOtpFormOutput>({
    resolver: zodResolver(verifyOtpSchema),
    mode: 'onSubmit',
  });

  useEffect(() => {
    register('otp');
  }, [register]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedOtp = value.slice(0, 6).split('');
      const newOtp = [...otp];
      pastedOtp.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      setValue('otp', newOtp.join(''), { shouldValidate: true });
      
      const nextEmptyIndex = newOtp.findIndex(v => v === '');
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setValue('otp', newOtp.join(''), { shouldValidate: true });

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = () => {
    const loginCreds = location.state?.password
      ? { email, password: location.state.password }
      : undefined;

    verifyOtpMutation.mutate({
      verify: {
        email,
        otp: otp.join(''),
      },
      login: isRegistrationFlow ? loginCreds : undefined,
    });
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;
    try {
      await authApi.sendOtp(email);
      setTimeLeft(300);
    } catch (err) {
      console.error('OTP resend failed:', err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-[420px] mx-auto px-6 py-8">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-[88px] h-[88px] rounded-full bg-[#113B4A] flex items-center justify-center shadow-[0_0_24px_rgba(0,242,255,0.15)]">
          <MailCheck size={44} className="text-white" strokeWidth={1.5} />
        </div>
      </div>

      {/* Header */}
      <div className="mb-8 text-center animate-fade-in">
        <h1 className="text-[28px] font-bold text-white mb-2 tracking-tight">
          {isRegistrationFlow ? 'Qeydiyyatın təsdiqi' : 'Şifrənin bərpası'}
        </h1>
        <p className="text-gray-400 text-xs mb-2">
          {isRegistrationFlow ? 'Təsdiq kodu email ünvanınıza göndərildi:' : ''}
        </p>
        <p className="text-[18px] text-[#00F2FF] font-medium">
          {email}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-[52px] h-[52px] bg-transparent border rounded-[8px] text-center text-[24px] text-white font-medium focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-colors ${
                errors.otp ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-[#4F4F6C]'
              }`}
            />
          ))}
        </div>
        
        {errors.otp && (
          <p className="text-red-400 text-xs text-center -mt-2">{errors.otp.message}</p>
        )}

        <div className="text-center text-white text-[14px]">
          {formatTime(timeLeft)}
        </div>

        {verifyOtpMutation.isError && (
          <div className="text-red-400 text-xs mt-2 text-center font-medium bg-red-950/30 border border-red-500/20 py-2 px-3 rounded-md">
            {((verifyOtpMutation.error as AxiosError<{ message?: string }>).response?.data?.message) || 'Daxil etdiyiniz təsdiq kodu yanlışdır.'}
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
            isLoading={isSubmitting || verifyOtpMutation.isPending}
          >
            {isRegistrationFlow ? 'Təsdiqlə və Daxil ol' : 'Növbəti'}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-[14px] text-ui-muted">
          Kodu əldə etmədin ?{' '}
          <button 
            type="button"
            onClick={handleResend}
            disabled={timeLeft > 0}
            className={`font-medium transition-colors ${timeLeft > 0 ? 'text-ui-muted/50 cursor-not-allowed' : 'text-[#8B5CF6] hover:text-white'}`}
          >
            Yenidən göndərin
          </button>
        </p>
      </div>
    </div>
  );
};
