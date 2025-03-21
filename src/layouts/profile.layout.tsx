import { Outlet } from 'react-router-dom';
import ProfileNav from './profile.nav';

function ProfileLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <ProfileNav />
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
