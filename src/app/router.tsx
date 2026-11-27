import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { LandingPage } from '@/features/landing/pages/LandingPage';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { ScrollToTop, RouteLoadingGate, RouteSkeletonForPath } from '@/components';

// Lazy-loaded route chunks so initial Home entry doesn't download all 25+ screens & WebRTC SDKs upfront
const JournalPage = lazy(() =>
  import('@/features/landing/pages/JournalPage').then((m) => ({ default: m.JournalPage }))
);
const PsychologistPage = lazy(() =>
  import('@/features/landing/pages/PsychologistPage').then((m) => ({ default: m.PsychologistPage }))
);
const ExpertsPage = lazy(() =>
  import('@/features/experts/pages/ExpertsPage').then((m) => ({ default: m.ExpertsPage }))
);
const BlogPage = lazy(() =>
  import('@/features/landing/pages/BlogPage').then((m) => ({ default: m.BlogPage }))
);
const BlogDetailPage = lazy(() =>
  import('@/features/landing/pages/BlogDetailPage').then((m) => ({ default: m.BlogDetailPage }))
);
const ArticlesPage = lazy(() =>
  import('@/features/landing/pages/ArticlesPage').then((m) => ({ default: m.ArticlesPage }))
);
const ArticleDetailPage = lazy(() =>
  import('@/features/landing/pages/ArticleDetailPage').then((m) => ({
    default: m.ArticleDetailPage,
  }))
);
const NewsPage = lazy(() =>
  import('@/features/landing/pages/NewsPage').then((m) => ({ default: m.NewsPage }))
);
const NewsDetailPage = lazy(() =>
  import('@/features/landing/pages/NewsDetailPage').then((m) => ({ default: m.NewsDetailPage }))
);
const GalleryPage = lazy(() =>
  import('@/features/landing/pages/GalleryPage').then((m) => ({ default: m.GalleryPage }))
);
const TrainingsPage = lazy(() =>
  import('@/features/landing/pages/TrainingsPage').then((m) => ({ default: m.TrainingsPage }))
);
const AboutPage = lazy(() =>
  import('@/features/landing/pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const FaqPage = lazy(() =>
  import('@/features/landing/pages/FaqPage').then((m) => ({ default: m.FaqPage }))
);
const TermsPage = lazy(() =>
  import('@/features/landing/pages/TermsPage').then((m) => ({ default: m.TermsPage }))
);

const PaymentSuccessPage = lazy(() =>
  import('@/features/payment').then((m) => ({ default: m.PaymentSuccessPage }))
);
const PaymentErrorPage = lazy(() =>
  import('@/features/payment').then((m) => ({ default: m.PaymentErrorPage }))
);
const PaymentResultPage = lazy(() =>
  import('@/features/payment').then((m) => ({ default: m.PaymentResultPage }))
);

const RegistrationPage = lazy(() =>
  import('@/features/auth/pages/RegistrationPage').then((m) => ({ default: m.RegistrationPage }))
);
const FaceCapturePage = lazy(() =>
  import('@/features/auth/pages/FaceCapturePage').then((m) => ({ default: m.FaceCapturePage }))
);
const LoginPage = lazy(() =>
  import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const ForgotPasswordPage = lazy(() =>
  import('@/features/auth/pages/ForgotPasswordPage').then((m) => ({
    default: m.ForgotPasswordPage,
  }))
);
const VerifyOtpPage = lazy(() =>
  import('@/features/auth/pages/VerifyOtpPage').then((m) => ({ default: m.VerifyOtpPage }))
);
const NewPasswordPage = lazy(() =>
  import('@/features/auth/pages/NewPasswordPage').then((m) => ({ default: m.NewPasswordPage }))
);
const RegistrationSuccessPage = lazy(() =>
  import('@/features/auth/pages/RegistrationSuccessPage').then((m) => ({
    default: m.RegistrationSuccessPage,
  }))
);
const OnboardingPage = lazy(() =>
  import('@/features/onboarding/pages/OnboardingPage').then((m) => ({ default: m.OnboardingPage }))
);

const SessionsPage = lazy(() =>
  import('@/features/sessions/pages/SessionsPage').then((m) => ({ default: m.SessionsPage }))
);
const SessionCallPage = lazy(() =>
  import('@/features/sessions/pages/SessionCallPage').then((m) => ({ default: m.SessionCallPage }))
);
const SessionFaceVerificationPage = lazy(() =>
  import('@/features/sessions/pages/SessionFaceVerificationPage').then((m) => ({
    default: m.SessionFaceVerificationPage,
  }))
);
const ProfilePage = lazy(() =>
  import('@/features/profile/pages/ProfilePage').then((m) => ({ default: m.ProfilePage }))
);
const SettingsPage = lazy(() =>
  import('@/features/settings/pages/SettingsPage').then((m) => ({ default: m.SettingsPage }))
);
const MiniGamesPage = lazy(() =>
  import('@/features/games/pages/MiniGamesPage').then((m) => ({ default: m.MiniGamesPage }))
);
const BreathingGamePage = lazy(() =>
  import('@/features/games/pages/BreathingGamePage').then((m) => ({ default: m.BreathingGamePage }))
);

const RootLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      <RouteLoadingGate>
        <Suspense
          fallback={
            <div data-route-loading="true" className="min-h-screen w-full">
              <RouteSkeletonForPath pathname={pathname} />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </RouteLoadingGate>
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
      {
        path: PATHS.ABOUT,
        element: <AboutPage />,
      },
      {
        path: PATHS.FAQ,
        element: <FaqPage />,
      },
      {
        path: PATHS.TERMS,
        element: <TermsPage />,
      },
      {
        path: PATHS.PAYMENT_SUCCESS,
        element: <PaymentSuccessPage />,
      },
      {
        path: PATHS.PAYMENT_ERROR,
        element: <PaymentErrorPage />,
      },
      {
        path: PATHS.PAYMENT_RESULT,
        element: <PaymentResultPage />,
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
