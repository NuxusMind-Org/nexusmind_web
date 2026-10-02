import type { PasientRegisterDto } from '@/api/types';
import type { RegistrationFormValues } from '../schemas/registration.schema';

const REGISTRATION_DRAFT_KEY = 'nexusmind_registration_draft';

export interface RegistrationSessionState {
  formData?: RegistrationFormValues;
  registrationData?: PasientRegisterDto;
  registrationImageUrl?: string;
  isRegisteredInDb?: boolean;
  registeredEmail?: string;
}

export const getRegistrationSession = (): RegistrationSessionState | null => {
  try {
    const data = sessionStorage.getItem(REGISTRATION_DRAFT_KEY);
    return data ? (JSON.parse(data) as RegistrationSessionState) : null;
  } catch {
    return null;
  }
};

export const setRegistrationSession = (state: Partial<RegistrationSessionState>): void => {
  try {
    const existing = getRegistrationSession() || {};
    const updated = { ...existing, ...state };
    sessionStorage.setItem(REGISTRATION_DRAFT_KEY, JSON.stringify(updated));
  } catch {
    // sessionStorage not available or quota exceeded
  }
};

export const clearRegistrationSession = (): void => {
  try {
    sessionStorage.removeItem(REGISTRATION_DRAFT_KEY);
  } catch {
    // ignore
  }
};
