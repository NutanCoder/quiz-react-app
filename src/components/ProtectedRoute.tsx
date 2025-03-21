import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { PageLoading } from './common';
import ForbiddenPage from '@/features/error/pages/forbidden.page';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  role?: string;
}

function ProtectedRoute({ children, requireAuth = true, role }: ProtectedRouteProps) {
  const { profile, loading } = useSelector((state: RootState) => state.profile);
  const location = useLocation();

  if (loading) return <PageLoading />;

  if (requireAuth && !profile) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && profile && profile.role !== role) {
    return <ForbiddenPage/>;
  }
  if (!requireAuth && profile) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
