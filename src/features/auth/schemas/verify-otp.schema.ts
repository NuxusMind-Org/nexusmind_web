import { z } from 'zod';

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, 'Kod 6 rəqəmli olmalıdır').regex(/^\d+$/, 'Yalnız rəqəmlər daxil edin'),
});

export type VerifyOtpFormInput = z.input<typeof verifyOtpSchema>;
export type VerifyOtpFormOutput = z.output<typeof verifyOtpSchema>;
