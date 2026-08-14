export type AddressType = 'XANIM' | 'BEY';

export type TherapyFormat = 'TEK' | 'CUTLUK' | 'AILE' | 'DOSTLAR';

export type EnvironmentType =
  | 'SESSIZ'
  | 'YARADICI'
  | 'TEBIET'
  | 'KITABXANA'
  | 'MINIMALIST'
  | 'SEMIMI';

export type ConcernType =
  | 'AILE_PROBLEMLERI'
  | 'SEVGI_PROBLEMLERI'
  | 'TEKLIK'
  | 'GELECEK_QAYGISI'
  | 'AGIR_DEPRESSIYA'
  | 'XRONIKI_YORGUNLUQ';

export interface OnboardingSubmitPayload {
  addressType: AddressType | null;
  therapyFormat: TherapyFormat | null;
  parentCount: number;
  childCount: number;
  femaleCount: number;
  maleCount: number;
  environments: EnvironmentType[];
  concerns: ConcernType[];
}

export interface SubOptionConfig {
  id: string;
  label: string;
  type: 'counter';
  min: number;
}

export interface OnboardingOptionConfig {
  id: string;
  label: string;
  hasImage?: boolean;
  image?: string;
  subOptions?: SubOptionConfig[];
}

export interface OnboardingStepConfig {
  step: number;
  totalSteps?: number;
  question?: string;
  subtitle?: string;
  type: 'single_choice' | 'multiple_choice' | 'loading_state';
  maxSelections?: number;
  options?: OnboardingOptionConfig[];
  actions?: {
    primary?: string;
    secondary?: string;
  };
  message?: string;
  hasAnimation?: boolean;
}
