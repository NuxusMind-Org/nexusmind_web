import type { DoctorDto } from '@/api/types';
import type { Psychologist } from '@/features/landing/types/psychologist.types';
import defaultAvatar from '@/assets/avatar1.png';
import { getLocalizedTitle } from './multilingual';

export const mapDoctorToPsychologist = (doc: DoctorDto, lang: 'az' | 'en' | 'ru' = 'az'): Psychologist => ({
  id: doc.id || Math.random(),
  name: doc.fullName || doc.username || 'Bilinməyən Həkim',
  title: getLocalizedTitle(doc.title, lang, 'Klinik Psixoloq'),
  specialty: doc.specializations?.[0] || getLocalizedTitle(doc.title, lang, 'Klinik psixologiya'),
  experience: doc.experienceYear ? `${doc.experienceYear} illik təcrübə` : '0 illik təcrübə',
  rating: doc.rating || 5.0,
  price: doc.price || 50,
  image: doc.imageUrl || defaultAvatar,
  description: getLocalizedTitle(doc.bio as any, lang, 'Haqqında məlumat daxil edilməyib.'),
  languages: doc.languages || [],
  tags: doc.specializations || [],
  education: (doc.education || []).map(edu => ({ uni: edu, degree: '' })),
  certifications: doc.certificates || []
});
