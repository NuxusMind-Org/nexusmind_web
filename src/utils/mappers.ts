import type { DoctorDto } from '@/api/types';
import type { Psychologist } from '@/features/landing/types/psychologist.types';
import defaultAvatar from '@/assets/avatar1.png';

export const mapDoctorToPsychologist = (doc: DoctorDto): Psychologist => ({
  id: doc.id || Math.random(),
  name: doc.fullName || doc.username || 'Bilinməyən Həkim',
  title: doc.title || 'Klinik Psixoloq',
  experience: doc.experienceYear ? `${doc.experienceYear} illik təcrübə` : '0 illik təcrübə',
  rating: doc.rating || 5.0,
  price: doc.price || 50,
  image: doc.imageUrl || defaultAvatar,
  description: doc.bio || 'Haqqında məlumat daxil edilməyib.',
  languages: doc.languages || [],
  tags: doc.specializations || [],
  education: (doc.education || []).map(edu => ({ uni: edu, degree: '' })),
  certifications: doc.certificates || []
});
