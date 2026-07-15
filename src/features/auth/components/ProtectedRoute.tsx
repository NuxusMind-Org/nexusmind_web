import { Navigate, Outlet } from 'react-router-dom';
import { PATHS } from '@/routes/paths';

export const ProtectedRoute = () => {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  return <Outlet />;
};
