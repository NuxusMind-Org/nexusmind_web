import { Navigate, Outlet } from 'react-router-dom';
import { PATHS } from '@/routes/paths';
import { hasValidSession } from '@/api/tokenManager';

export const ProtectedRoute = () => {
  const isAuth = hasValidSession();

  if (!isAuth) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  return <Outlet />;
};

