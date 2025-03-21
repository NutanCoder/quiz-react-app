import { ErrorPage } from '@/components/common';
import { FC } from 'react';

const ForbiddenPage: FC = () => {
  return (
    <ErrorPage
      code="403"
      title="Access Forbidden"
      message="You don't have permission to access this resource. Please contact your administrator if you believe this is a mistake."
    />
  );
};

export default ForbiddenPage;
