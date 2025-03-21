import { ErrorPage } from '@/components/common';
import { FC } from 'react';

const NotFoundPage: FC = () => {
  return (
    <ErrorPage
      code="404"
      title="Page Not Found"
      message="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
    />
  );
};

export default NotFoundPage;
