import { Navigate, RouteObject } from 'react-router-dom';
import { ROUTES } from './route.constants';
import { lazy, Suspense } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProfileLayout from '@/layouts/profile.layout';
import { PageLoading } from '@/components/common';

const PersonalPage = lazy(
  () => import('@/features/profile/pages/personal.page')
);
const SecurityPage = lazy(
  () => import('@/features/profile/pages/security.page')
);

const withSuspense = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<PageLoading />}>
    <ProtectedRoute>
      <Component />
    </ProtectedRoute>
  </Suspense>
);

export const profileRoutes: RouteObject[] = [
  {
    path: ROUTES.PROFILE.ROOT,
    element: <ProfileLayout />,
    children: [
      {
        path: ROUTES.PROFILE.ROOT,
        element: <Navigate to={ROUTES.PROFILE.PERSONAL} />,
      },
      {
        path: ROUTES.PROFILE.PERSONAL,
        element: withSuspense(PersonalPage),
      },
      {
        path: ROUTES.PROFILE.SECURITY,
        element: withSuspense(SecurityPage),
      },
    ],
  },
];
