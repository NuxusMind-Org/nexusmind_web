import type { DoctorDto, DoctorPriceResponse, TitleDto } from '@/api/types';
import type { Psychologist } from '@/features/landing/types/psychologist.types';
import defaultAvatar from '@/assets/avatar1.webp';
import { getLocalizedTitle } from './multilingual';

export const resolveDoctorPrice = (
  prices?: DoctorPriceResponse[],
  userAge?: number
): DoctorPriceResponse | null => {
  if (!prices || prices.length === 0) return null;
  if (userAge !== undefined) {
    const match = prices.find((p) => {
      const min = p.minAge ?? 0;
      const max = p.maxAge ?? 100;
      return userAge >= min && userAge <= max;
    });
    if (match) return match;
  }
  return prices[0];
};

export const mapDoctorToPsychologist = (
  doc: DoctorDto,
  lang: 'az' | 'en' | 'ru' = 'az',
  priceInfo?: DoctorPriceResponse | null
): Psychologist => ({
  id: doc.id || Math.random(),
  name: doc.fullName || doc.username || 'Bilinməyən Həkim',
  title: getLocalizedTitle(doc.title, lang, 'Klinik Psixoloq'),
  specialty: doc.specializations?.[0] || getLocalizedTitle(doc.title, lang, 'Klinik psixologiya'),
  experience: doc.experienceYear ? `${doc.experienceYear} illik təcrübə` : '0 illik təcrübə',
  rating: doc.rating || 5.0,
  price: priceInfo?.amount ?? (typeof doc.price === 'number' && doc.price > 0 ? doc.price : 50),
  currency: priceInfo?.currency || 'AZN',
  image: doc.imageUrl || defaultAvatar,
  description: getLocalizedTitle(doc.bio as TitleDto | string | null | undefined, lang, 'Haqqında məlumat daxil edilməyib.'),
  languages: doc.languages || [],
  tags: doc.specializations || [],
  education: (doc.education || []).map(edu => ({ uni: edu, degree: '' })),
  certifications: doc.certificates || [],
  trainings: doc.trainings || []
});
