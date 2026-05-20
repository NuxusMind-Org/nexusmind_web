import { z } from 'zod';

export const newPasswordSchema = z
  .object({
    password: z.string().min(8, 'Şifrə ən az 8 simvol olmalıdır'),
    passwordConfirmation: z.string().min(8, 'Şifrəni təsdiq edin'),
    rememberMe: z.boolean().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Şifrələr uyğun gəlmir',
    path: ['passwordConfirmation'],
  });

export type NewPasswordFormInput = z.input<typeof newPasswordSchema>;
export type NewPasswordFormOutput = z.output<typeof newPasswordSchema>;
