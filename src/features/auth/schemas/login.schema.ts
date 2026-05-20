import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, 'İstifadəçi adı daxil edilməlidir'),
  password: z.string().min(1, 'Şifrə daxil edilməlidir'),
});

export type LoginFormInput = z.input<typeof loginSchema>;
export type LoginFormOutput = z.output<typeof loginSchema>;
