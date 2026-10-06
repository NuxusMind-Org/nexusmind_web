import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { RegistrationPage } from '@/features/auth/pages/RegistrationPage';
import { FaceCapturePage } from '@/features/auth/pages/FaceCapturePage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage';
import { VerifyOtpPage } from '@/features/auth/pages/VerifyOtpPage';
import { NewPasswordPage } from '@/features/auth/pages/NewPasswordPage';
import { RegistrationSuccessPage } from '@/features/auth/pages/RegistrationSuccessPage';
import { OnboardingPage } from '@/features/onboarding/pages/OnboardingPage';
import { LandingPage } from '@/features/landing/pages/LandingPage';
import { JournalPage } from '@/features/landing/pages/JournalPage';
import { PsychologistPage } from '@/features/landing/pages/PsychologistPage';
import { ExpertsPage } from '@/features/experts/pages/ExpertsPage';
import { BlogPage } from '@/features/landing/pages/BlogPage';
import { BlogDetailPage } from '@/features/landing/pages/BlogDetailPage';
import { ArticlesPage } from '@/features/landing/pages/ArticlesPage';
import { ArticleDetailPage } from '@/features/landing/pages/ArticleDetailPage';
import { NewsPage } from '@/features/landing/pages/NewsPage';
import { NewsDetailPage } from '@/features/landing/pages/NewsDetailPage';
import { GalleryPage } from '@/features/landing/pages/GalleryPage';
import { TrainingsPage } from '@/features/landing/pages/TrainingsPage';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { SessionsPage } from '@/features/sessions/pages/SessionsPage';
import { SessionCallPage } from '@/features/sessions/pages/SessionCallPage';
import { SessionFaceVerificationPage } from '@/features/sessions/pages/SessionFaceVerificationPage';
import { ProfilePage } from '@/features/profile/pages/ProfilePage';
import { SettingsPage } from '@/features/settings/pages/SettingsPage';
import { MiniGamesPage } from '@/features/games/pages/MiniGamesPage';
import { BreathingGamePage } from '@/features/games/pages/BreathingGamePage';
import { ScrollToTop } from '@/components';

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // Public / Discovery Routes
      {
        path: PATHS.HOME,
        element: <LandingPage />,
      },
      {
        path: PATHS.JOURNAL,
        element: <JournalPage />,
      },
      {
        path: PATHS.EXPERTS,
        element: <ExpertsPage />,
      },
      {
        path: PATHS.EXPERT_DETAIL,
        element: <PsychologistPage />,
      },
      {
        path: PATHS.PSYCHOLOGIST,
        element: <PsychologistPage />,
      },
      {
        path: PATHS.BLOG,
        element: <BlogPage />,
      },
      {
        path: PATHS.BLOG_DETAIL,
        element: <BlogDetailPage />,
      },
      {
        path: PATHS.ARTICLE,
        element: <ArticlesPage />,
      },
      {
        path: PATHS.ARTICLE_DETAIL,
        element: <ArticleDetailPage />,
      },
      {
        path: PATHS.NEWS,
        element: <NewsPage />,
      },
      {
        path: PATHS.NEWS_DETAIL,
        element: <NewsDetailPage />,
      },
      {
        path: PATHS.GALLERY,
        element: <GalleryPage />,
      },
      {
        path: PATHS.TRAININGS,
        element: <TrainingsPage />,
      },

      // Auth Routes
      {
        path: PATHS.REGISTER,
        element: <RegistrationPage />,
      },
      {
        path: PATHS.FACE_CAPTURE,
        element: <FaceCapturePage />,
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

      // Protected Authenticated Routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: PATHS.SESSIONS,
            element: <SessionsPage />,
          },
          {
            path: PATHS.SESSION_VERIFY_FACE,
            element: <SessionFaceVerificationPage />,
          },
          {
            path: PATHS.SESSION_CALL,
            element: <SessionCallPage />,
          },
          {
            path: PATHS.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: PATHS.SETTINGS,
            element: <SettingsPage />,
          },
          {
            path: PATHS.MINI_GAMES,
            element: <MiniGamesPage />,
          },
          {
            path: PATHS.BREATHING_GAME,
            element: <BreathingGamePage />,
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
