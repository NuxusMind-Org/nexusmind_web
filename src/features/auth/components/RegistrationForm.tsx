import { useState } from 'react';
import nexusMindLogo from '@/assets/svg/NexusMindLogo.svg';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { PATHS } from '@/routes/paths';
import { registrationSchema } from '../schemas/registration.schema';
import type { RegistrationFormValues } from '../schemas/registration.schema';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { useRegister } from '../hooks/useRegister';
import { AxiosError } from 'axios';

export const RegistrationForm = () => {
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    mode: 'onTouched',
  });

  const passwordValue = useWatch({
    control,
    name: 'password',
  });

  const normalizePhone = (phone: string): string => {
    const digits = phone.replace(/[^\d+]/g, '');
    if (digits.startsWith('994')) {
      return '+' + digits;
    }
    if (digits.startsWith('0')) {
      return '+994' + digits.substring(1);
    }
    if (!digits.startsWith('+')) {
      return '+994' + digits;
    }
    return digits;
  };

  const onSubmit = (data: RegistrationFormValues) => {
    const parts = data.fullName.trim().split(/\s+/);
    const name = parts[0] || '';
    const surname = parts.slice(1).join(' ') || '';

    registerMutation.mutate({
      dto: {
        name,
        surname,
        age: Number(data.age),
        email: data.email,
        password: data.password,
        phone: normalizePhone(data.phoneNumber),
      },
      rawPassword: data.password,
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-[420px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to={PATHS.HOME} className="flex items-center mb-6 self-start w-fit hover:opacity-80 transition-opacity">
          <img src={nexusMindLogo} alt="Nexus Mind Logo" className="h-10 object-contain cursor-pointer" />
        </Link>
        <h1 className="text-[32px] font-bold text-white mb-1 tracking-tight">Hesab yarat</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="Tam ad"
          placeholder="Rafiq Səfərov"
          {...register('fullName')}
          error={errors.fullName?.message}
        />

        <Input
          label="Email ünvanı"
          type="email"
          placeholder="xxxxxxxx@gmail.com"
          {...register('email')}
          error={errors.email?.message}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            label="Yaş"
            placeholder="xx"
            containerClassName="w-1/3"
            {...register('age')}
            error={errors.age?.message}
          />
          <Input
            label="Telefon nömrəsi"
            placeholder="+994 (55) xxx-xx-xx"
            containerClassName="w-2/3"
            {...register('phoneNumber')}
            error={errors.phoneNumber?.message}
          />
        </div>

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
          <PasswordStrengthIndicator password={passwordValue} />
        </div>

        <Input
          label="Şifrə Təsdiqi"
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

        {registerMutation.isError && (
          <div className="text-red-400 text-xs mt-2 text-center font-medium bg-red-950/30 border border-red-500/20 py-2 px-3 rounded-md">
            {((registerMutation.error as AxiosError<{ message?: string }>).response?.data?.message) || 'Qeydiyyat zamanı xəta baş verdi. Məlumatları yenidən yoxlayın.'}
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
            isLoading={isSubmitting || registerMutation.isPending}
          >
            Qeydiyyatdan keç
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-[14px] text-ui-muted">
          Artıq hesabın var ?{' '}
          <Link to={PATHS.LOGIN} className="text-accent hover:text-white transition-colors font-medium">
            Daxil ol
          </Link>
        </p>
      </div>
    </div>
  );
};
