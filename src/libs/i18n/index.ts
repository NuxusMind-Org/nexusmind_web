import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import azTranslations from './locales/az.json';
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';

export type LanguageCode = 'az' | 'en' | 'ru';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  shortLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'az', label: 'Azərbaycanca', shortLabel: 'Az' },
  { code: 'en', label: 'English', shortLabel: 'En' },
  { code: 'ru', label: 'Русский', shortLabel: 'Ru' },
];

export const resources = {
  az: { translation: azTranslations },
  en: { translation: enTranslations },
  ru: { translation: ruTranslations },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'az',
    supportedLngs: ['az', 'en', 'ru'],
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
