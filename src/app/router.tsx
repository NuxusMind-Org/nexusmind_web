import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
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
import { BlogPage } from '@/features/landing/pages/BlogPage';
import { ArticlesPage } from '@/features/landing/pages/ArticlesPage';
import { ArticleDetailPage } from '@/features/landing/pages/ArticleDetailPage';
import { NewsPage } from '@/features/landing/pages/NewsPage';
import { NewsDetailPage } from '@/features/landing/pages/NewsDetailPage';
import { GalleryPage } from '@/features/landing/pages/GalleryPage';
import { TrainingsPage } from '@/features/landing/pages/TrainingsPage';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { AppLayout } from '@/features/webapp/layout/AppLayout';
import { DashboardPage } from '@/features/webapp/pages/DashboardPage';
import { RitualsPage } from '@/features/webapp/pages/RitualsPage';
import { ChatPage } from '@/features/webapp/pages/ChatPage';
import { ProfilePage } from '@/features/webapp/pages/ProfilePage';
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
        path: PATHS.BLOG,
        element: <BlogPage />,
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
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                path: PATHS.DASHBOARD,
                element: <DashboardPage />,
              },
              {
                path: PATHS.JOURNAL,
                element: <RitualsPage />,
              },
              {
                path: PATHS.CHAT,
                element: <ChatPage />,
              },
              {
                path: PATHS.PROFILE,
                element: <ProfilePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};


