import { RouteObject } from 'react-router-dom';
import { ROUTES } from './route.constants';
import NotFoundPage from '@/features/error/pages/not-found.page';
import ForbiddenPage from '@/features/error/pages/forbidden.page';
import ServerErrorPage from '@/features/error/pages/server-error.page';

export const errorRoutes: RouteObject[] = [
  {
    path: ROUTES.ERROR.FORBIDDEN,
    element: <ForbiddenPage />,
  },
  {
    path: ROUTES.ERROR.SERVER_ERROR,
    element: <ServerErrorPage />,
  },
  {
    path: ROUTES.ERROR.NOT_FOUND,
    element: <NotFoundPage />,
  },
]; 