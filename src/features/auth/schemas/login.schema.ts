import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email daxil edilməlidir').email('Düzgün email daxil edin'),
  password: z.string().min(1, 'Şifrə daxil edilməlidir'),
});

export type LoginFormInput = z.input<typeof loginSchema>;
export type LoginFormOutput = z.output<typeof loginSchema>;
