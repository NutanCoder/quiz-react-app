import { ClimbingBoxLoader } from 'react-spinners';

const PageLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <ClimbingBoxLoader color="#FFFFFF" size={20} aria-label="Loading Spinner" data-testid="loader" />
      </div>
    </div>
  );
};

export { PageLoading }; 