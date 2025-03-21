import { RouteObject } from 'react-router-dom';
import { ROUTES } from './route.constants';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ForgotPasswordPage, LoginPage, RegisterPage } from '@/features/auth';

export const authRoutes: RouteObject[] = [
  {
    path: ROUTES.AUTH.LOGIN,
    element: (
      <ProtectedRoute requireAuth={false}>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.AUTH.REGISTER,
    element: (
      <ProtectedRoute requireAuth={false}>
        <RegisterPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES.AUTH.FORGET_PASSWORD,
    element: (
      <ProtectedRoute requireAuth={false}>
        <ForgotPasswordPage />
      </ProtectedRoute>
    ),
  },
]; 