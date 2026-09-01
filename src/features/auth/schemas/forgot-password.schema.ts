import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email ünvanı daxil edilməlidir')
    .email('Düzgün email formatı daxil edin'),
});

export type ForgotPasswordFormInput = z.input<typeof forgotPasswordSchema>;
export type ForgotPasswordFormOutput = z.output<typeof forgotPasswordSchema>;

