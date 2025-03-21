import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '@/layouts/app.layout';
import DashboardPage from '@/features/dashboard/pages/dashboard.page';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ROUTES } from './route.constants';
import { quizRoutes } from './quiz.routes';
import { authRoutes } from './auth.routes';
import { profileRoutes } from './profile.routes';
import { errorRoutes } from './error.routes';
import HomePage from '@/features/home/pages/home.page';

export const routes = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.LANDING,
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      ...quizRoutes,
      ...authRoutes,
      ...profileRoutes,
      ...errorRoutes,
    ],
  },
]);
