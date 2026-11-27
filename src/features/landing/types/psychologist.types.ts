export type Psychologist = {
  id: number;
  name: string;
  title: string;
  experience?: string;
  rating?: number;
  price: number;
  currency?: string;
  image: string;
  description: string;
  languages: string[];
  tags: string[];
  education: { uni: string; degree: string }[];
  certifications: string[];
  trainings?: string[];
  specialty?: string;
};
