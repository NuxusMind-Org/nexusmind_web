import { useState } from 'react';
import nexusMindLogo from '@/assets/nexusmindlogo.png';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { PATHS } from '@/routes/paths';
import { registrationSchema } from '../schemas/registration.schema';
import type { RegistrationFormValues } from '../schemas/registration.schema';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';

export const RegistrationForm = () => {
  const navigate = useNavigate();
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

  const onSubmit = async (data: RegistrationFormValues) => {
    // API Call goes here
    console.log('Registration data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock network
    navigate(PATHS.REGISTRATION_SUCCESS, { state: { email: data.email } });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-[420px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <img src={nexusMindLogo} alt="Nexus Mind Logo" className="h-10 object-contain" />
        </div>
        <h1 className="text-[32px] font-bold text-white mb-1 tracking-tight">Hesab yarat</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex gap-4">
          <Input
            label="Tam ad"
            placeholder="Xxx"
            {...register('fullName')}
            error={errors.fullName?.message}
          />
          <Input
            label="İstifadəçi adı"
            placeholder="Xxxxxx"
            {...register('username')}
            error={errors.username?.message}
          />
        </div>

        <Input
          label="Email ünvanı"
          type="email"
          placeholder="xxxxxxxx@gmail.com"
          {...register('email')}
          error={errors.email?.message}
        />

        <div className="flex gap-4">
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

        <div className="relative mt-2 w-full group">
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
