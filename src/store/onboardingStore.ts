import { create } from 'zustand';
import type { AddressType, TherapyFormat, EnvironmentType, ConcernType, OnboardingSubmitPayload } from '../features/onboarding/types/onboarding.types';

interface OnboardingState extends OnboardingSubmitPayload {
  setAddressType: (addressType: AddressType) => void;
  setTherapyFormat: (therapyFormat: TherapyFormat) => void;
  setParentCount: (count: number) => void;
  setChildCount: (count: number) => void;
  setFemaleCount: (count: number) => void;
  setMaleCount: (count: number) => void;
  setEnvironments: (environments: EnvironmentType[]) => void;
  toggleEnvironment: (env: EnvironmentType, maxSelections?: number) => void;
  setConcerns: (concerns: ConcernType[]) => void;
  toggleConcern: (concern: ConcernType, maxSelections?: number) => void;
  resetOnboarding: () => void;
  getPayload: () => OnboardingSubmitPayload;
}

const initialState: OnboardingSubmitPayload = {
  addressType: null,
  therapyFormat: null,
  parentCount: 0,
  childCount: 0,
  femaleCount: 0,
  maleCount: 0,
  environments: [],
  concerns: [],
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  ...initialState,

  setAddressType: (addressType) => set({ addressType }),
  
  setTherapyFormat: (therapyFormat) => set({ therapyFormat }),

  setParentCount: (parentCount) => set({ parentCount: Math.max(0, parentCount) }),
  
  setChildCount: (childCount) => set({ childCount: Math.max(0, childCount) }),

  setFemaleCount: (femaleCount) => set({ femaleCount: Math.max(0, femaleCount) }),

  setMaleCount: (maleCount) => set({ maleCount: Math.max(0, maleCount) }),

  setEnvironments: (environments) => set({ environments }),

  toggleEnvironment: (env, maxSelections = 3) => {
    const { environments } = get();
    if (environments.includes(env)) {
      set({ environments: environments.filter((e) => e !== env) });
    } else {
      if (environments.length < maxSelections) {
        set({ environments: [...environments, env] });
      }
    }
  },

  setConcerns: (concerns) => set({ concerns }),

  toggleConcern: (concern, maxSelections = 3) => {
    const { concerns } = get();
    if (concerns.includes(concern)) {
      set({ concerns: concerns.filter((c) => c !== concern) });
    } else {
      if (concerns.length < maxSelections) {
        set({ concerns: [...concerns, concern] });
      }
    }
  },

  resetOnboarding: () => set(initialState),

  getPayload: () => {
    const state = get();
    return {
      addressType: state.addressType,
      therapyFormat: state.therapyFormat,
      parentCount: state.parentCount,
      childCount: state.childCount,
      femaleCount: state.femaleCount,
      maleCount: state.maleCount,
      environments: state.environments,
      concerns: state.concerns,
    };
  },
}));
