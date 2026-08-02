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
import { BlogDetailPage } from '@/features/landing/pages/BlogDetailPage';
import { ArticlesPage } from '@/features/landing/pages/ArticlesPage';
import { ArticleDetailPage } from '@/features/landing/pages/ArticleDetailPage';
import { NewsPage } from '@/features/landing/pages/NewsPage';
import { NewsDetailPage } from '@/features/landing/pages/NewsDetailPage';
import { GalleryPage } from '@/features/landing/pages/GalleryPage';
import { TrainingsPage } from '@/features/landing/pages/TrainingsPage';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { AppLayout } from '@/features/webapp/layout/AppLayout';
import { HomePage } from '@/features/webapp/pages/HomePage';
import { JournalPage as WebappJournalPage } from '@/features/webapp/pages/JournalPage';
import { GalleryPage as WebappGalleryPage } from '@/features/webapp/pages/GalleryPage';
import { NewsPage as WebappNewsPage } from '@/features/webapp/pages/NewsPage';
import { NewsDetailPage as WebappNewsDetailPage } from '@/features/webapp/pages/NewsDetailPage';
import { BlogPage as WebappBlogPage } from '@/features/webapp/pages/BlogPage';
import { BlogDetailPage as WebappBlogDetailPage } from '@/features/webapp/pages/BlogDetailPage';
import { ArticlesPage as WebappArticlesPage } from '@/features/webapp/pages/ArticlesPage';
import { ArticleDetailPage as WebappArticleDetailPage } from '@/features/webapp/pages/ArticleDetailPage';
import { TrainingsPage as WebappTrainingsPage } from '@/features/webapp/pages/TrainingsPage';
import { SessionsPage } from '@/features/webapp/pages/SessionsPage';
import { MediaPage } from '@/features/webapp/pages/MediaPage';
import { EnlightenmentPage } from '@/features/webapp/pages/EnlightenmentPage';
import { ProfilePage } from '@/features/webapp/pages/ProfilePage';
import { SettingsPage } from '@/features/webapp/pages/SettingsPage';
import { NotificationsPage } from '@/features/webapp/pages/NotificationsPage';
import { ExpertsPage } from '@/features/webapp/pages/ExpertsPage';
import { ExpertDetailPage } from '@/features/webapp/pages/ExpertDetailPage';
import { MiniGamesPage } from '@/features/webapp/pages/MiniGamesPage';
import { BreathingGamePage } from '@/features/webapp/pages/BreathingGamePage';
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
                element: <HomePage />,
              },
              {
                path: PATHS.WEBAPP_JOURNAL,
                element: <WebappJournalPage />,
              },
              {
                path: PATHS.WEBAPP_SESSIONS,
                element: <SessionsPage />,
              },
              {
                path: PATHS.WEBAPP_MEDIA,
                element: <MediaPage />,
              },
              {
                path: PATHS.WEBAPP_GALLERY,
                element: <WebappGalleryPage />,
              },
              {
                path: PATHS.WEBAPP_NEWS,
                element: <WebappNewsPage />,
              },
              {
                path: PATHS.WEBAPP_NEWS_DETAIL,
                element: <WebappNewsDetailPage />,
              },
              {
                path: PATHS.WEBAPP_BLOG,
                element: <WebappBlogPage />,
              },
              {
                path: PATHS.WEBAPP_BLOG_DETAIL,
                element: <WebappBlogDetailPage />,
              },
              {
                path: PATHS.WEBAPP_ARTICLE,
                element: <WebappArticlesPage />,
              },
              {
                path: PATHS.WEBAPP_ARTICLE_DETAIL,
                element: <WebappArticleDetailPage />,
              },
              {
                path: PATHS.WEBAPP_TRAININGS,
                element: <WebappTrainingsPage />,
              },
              {
                path: PATHS.WEBAPP_EXPERTS,
                element: <ExpertsPage />,
              },
              {
                path: PATHS.WEBAPP_EXPERT_DETAIL,
                element: <ExpertDetailPage />,
              },
              {
                path: PATHS.WEBAPP_ENLIGHTENMENT,
                element: <EnlightenmentPage />,
              },
              {
                path: PATHS.WEBAPP_PROFILE,
                element: <ProfilePage />,
              },
              {
                path: PATHS.WEBAPP_SETTINGS,
                element: <SettingsPage />,
              },
              {
                path: PATHS.WEBAPP_NOTIFICATIONS,
                element: <NotificationsPage />,
              },
              {
                path: PATHS.WEBAPP_MINI_GAMES,
                element: <MiniGamesPage />,
              },
              {
                path: PATHS.WEBAPP_BREATHING_GAME,
                element: <BreathingGamePage />,
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


