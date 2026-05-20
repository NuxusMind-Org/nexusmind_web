import { z } from 'zod';

export const registrationSchema = z
  .object({
    fullName: z.string().min(2, 'Tam ad ən azı 2 simvol olmalıdır'),
    username: z.string().min(3, 'İstifadəçi adı ən azı 3 simvol olmalıdır'),
    email: z.string().email('Düzgün email daxil edin'),
    age: z
      .string()
      .regex(/^\d+$/, 'Yalnız rəqəmlər')
      .refine((n) => Number(n) >= 13, 'Yaş ən azı 13 olmalıdır'),
    phoneNumber: z.string().min(9, 'Düzgün nömrə daxil edin'),
    password: z.string().min(8, 'Şifrə ən az 8 simvol olmalıdır'),
    passwordConfirmation: z.string().min(8, 'Şifrəni təsdiq edin'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Şifrələr uyğun gəlmir',
    path: ['passwordConfirmation'],
  });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
