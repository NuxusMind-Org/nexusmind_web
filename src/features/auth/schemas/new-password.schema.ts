import { z } from 'zod';

export const newPasswordSchema = z
  .object({
    otp: z
      .string()
      .trim()
      .min(1, 'Təsdiq kodu daxil edilməlidir'),
    newPassword: z
      .string()
      .min(8, 'Şifrə ən az 8 simvol olmalıdır')
      .max(50, 'Şifrə ən çox 50 simvol ola bilər')
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/,
        'Şifrədə ən az bir böyük hərf, bir kiçik hərf və bir rəqəm olmalıdır'
      ),
    confirmPassword: z
      .string()
      .min(1, 'Şifrənin təkrarı daxil edilməlidir'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Şifrələr uyğun gəlmir',
    path: ['confirmPassword'],
  });

export type NewPasswordFormInput = z.input<typeof newPasswordSchema>;
export type NewPasswordFormOutput = z.output<typeof newPasswordSchema>;

