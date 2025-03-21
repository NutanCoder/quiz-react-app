import { ErrorPage } from '@/components/common';
import { FC } from 'react';

const ServerErrorPage: FC = () => {
  return (
    <ErrorPage
      code="500"
      title="Server Error"
      message="Sorry, something went wrong on our end. We're working to fix the issue. Please try again later."
    />
  );
};

export default ServerErrorPage;
