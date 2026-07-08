import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { RegistrationPage } from '@/features/auth/pages/RegistrationPage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage';
import { VerifyOtpPage } from '@/features/auth/pages/VerifyOtpPage';
import { NewPasswordPage } from '@/features/auth/pages/NewPasswordPage';
import { RegistrationSuccessPage } from '@/features/auth/pages/RegistrationSuccessPage';
import { OnboardingPage } from '@/features/onboarding/pages/OnboardingPage';
import { LandingPage } from '@/features/landing/pages/LandingPage';
import { JournalPage } from '@/features/landing/pages/JournalPage';
import { PsychologistPage } from '@/features/landing/pages/PsychologistPage';

const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    element: <LandingPage />,
  },
  {
    path: PATHS.JOURNAL,
    element: <JournalPage />,
  },
  {
    path: PATHS.PSYCHOLOGIST,
    element: <PsychologistPage />,
  },
  {
    path: PATHS.REGISTER,
    element: <RegistrationPage />,
  },
  {
    path: PATHS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PATHS.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: PATHS.VERIFY_OTP,
    element: <VerifyOtpPage />,
  },
  {
    path: PATHS.NEW_PASSWORD,
    element: <NewPasswordPage />,
  },
  {
    path: PATHS.REGISTRATION_SUCCESS,
    element: <RegistrationSuccessPage />,
  },
  {
    path: PATHS.ONBOARDING,
    element: <OnboardingPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

