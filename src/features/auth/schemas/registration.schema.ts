import { z } from 'zod';

export const registrationSchema = z
  .object({
    fullName: z.string().min(2, 'Tam ad ən azı 2 simvol olmalıdır'),
    email: z.string().email('Düzgün email daxil edin'),
    age: z
      .string()
      .regex(/^\d+$/, 'Yalnız rəqəmlər')
      .refine((n) => {
        const val = Number(n);
        return val >= 17 && val <= 45;
      }, 'Yaş 17 ilə 45 arasında olmalıdır'),
    phoneNumber: z.string().min(9, 'Düzgün nömrə daxil edin'),
    password: z
      .string()
      .min(8, 'Şifrə ən az 8 simvol olmalıdır')
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/,
        'Şifrədə ən azı bir rəqəm, bir kiçik və bir böyük hərf olmalıdır'
      ),
    passwordConfirmation: z.string().min(8, 'Şifrəni təsdiq edin'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Şifrələr uyğun gəlmir',
    path: ['passwordConfirmation'],
  });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
