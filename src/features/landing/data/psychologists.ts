import therapist1 from '@/assets/therapist1.png';
import avatar1 from '@/assets/avatar1.png';
import avatar2 from '@/assets/avatar2.png';
import avatar3 from '@/assets/avatar3.png';
import type { Psychologist } from '../types/psychologist.types';

export const psychologists: Psychologist[] = [
  {
    id: 1,
    name: "Səlvi Əliyeva",
    title: "Klinik Psixoloq",
    experience: "9 illik təcrübə",
    rating: 4.8,
    price: 58,
    image: therapist1,
    description: "İnsanların emosional balansını bərpa etməyə və gündəlik stresslə mübarizə aparmağa kömək edən təcrübəli psixoloqdur. O, fərdi konsultasiya, stress idarəetməsi və mindfulness terapiyası sahəsində fəaliyyət göstərir.",
    languages: ["English", "French", "Turkish"],
    tags: ["Psixoloq", "Travma mütəxəssisi", "Həyat bələdçisi", "Stress idarəetməsi", "Klinik psixologiya", "Ailə terapiyası"],
    education: [
      { uni: "Bakı Dövlət Universiteti", degree: "Klinik Psixologiya, Bakalavr" },
      { uni: "Xarici Magistratura Proqramı", degree: "Psixoloji Məsləhət, Magistratura" }
    ],
    certifications: [
      "Koqnitiv Davranış Terapiyası (CBT)",
      "Gestalt Terapiya Metodları",
      "Mindfulness-Based Stress Reduction"
    ]
  },
  {
    id: 2,
    name: "Murad Həsənov",
    title: "Koqnitiv-Davranış Terapevti",
    experience: "6 illik təcrübə",
    rating: 4.9,
    price: 50,
    image: avatar1,
    description: "Təşviş pozuntuları, depressiya və panik atakların idarə olunmasında ixtisaslaşıb. Gənclər və böyüklərlə fərdi inkişaf yönümlü sessiyalar keçirir. Sağlam düşüncə tərzinin formalaşmasına kömək edir.",
    languages: ["Azerbaijani", "English", "Russian"],
    tags: ["KDT mütəxəssisi", "Gənclər üzrə psixoloq", "Təşviş terapiyası", "Depressiya idarəetməsi"],
    education: [
      { uni: "ADA Universiteti", degree: "Psixologiya, Bakalavr" },
      { uni: "London University", degree: "Applied Psychology, Master" }
    ],
    certifications: [
      "Advanced CBT Training",
      "Trauma-Informed Care",
      "Anxiety Management Specialist"
    ]
  },
  {
    id: 3,
    name: "Leyla Məmmədova",
    title: "Uşaq və Yeniyetmə Psixoloqu",
    experience: "12 illik təcrübə",
    rating: 5.0,
    price: 65,
    image: avatar2,
    description: "Uşaq inkişafı, yeniyetməlik problemləri və valideyn-övlad münasibətləri üzrə geniş təcrübəyə malikdir. Oyun terapiyası və ailə daxili konfliktlərin həllində peşəkar dəstək göstərir.",
    languages: ["Azerbaijani", "Russian"],
    tags: ["Uşaq psixoloqu", "Yeniyetmə psixoloqu", "Valideynlik məsləhətçisi", "Oyun terapiyası", "Ailə psixoloqu"],
    education: [
      { uni: "Xəzər Universiteti", degree: "Psixologiya, Bakalavr" },
      { uni: "Moskva Dövlət Universiteti", degree: "Uşaq Psixologiyası, Magistratura" }
    ],
    certifications: [
      "Certified Play Therapist",
      "Family System Therapy",
      "Adolescent Counseling"
    ]
  },
  {
    id: 4,
    name: "Rüstəm Quliyev",
    title: "Klinik Psixoloq",
    experience: "8 illik təcrübə",
    rating: 4.7,
    price: 55,
    image: avatar3,
    description: "Klinik depressiya, asılılıq problemləri və travma sonrası stres pozuntusu (PTSD) üzrə ekspert. Həm şəxsi konsultasiyalar, həm də qrup terapiyalarında uğurlu nəticələr əldə edir.",
    languages: ["Azerbaijani", "English"],
    tags: ["Asılılıq terapiyası", "PTSD mütəxəssisi", "Qrup terapiyası", "Klinik psixologiya", "Reabilitasiya"],
    education: [
      { uni: "Tibb Universiteti", degree: "Klinik Psixologiya, Bakalavr" },
      { uni: "Avropa Psixologiya İnstitutu", degree: "Klinik Terapiya, Magistratura" }
    ],
    certifications: [
      "Addiction Counseling Certificate",
      "EMDR Therapy Trained",
      "Group Therapy Facilitator"
    ]
  }
];
