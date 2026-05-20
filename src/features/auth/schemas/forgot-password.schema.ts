import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  identifier: z.string().min(1, 'İstifadəçi adı və ya e-mail daxil edilməlidir'),
});

export type ForgotPasswordFormInput = z.input<typeof forgotPasswordSchema>;
export type ForgotPasswordFormOutput = z.output<typeof forgotPasswordSchema>;
