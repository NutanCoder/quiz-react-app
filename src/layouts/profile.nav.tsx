import { Link, useLocation } from 'react-router-dom';

function ProfileNav() {
  const location = useLocation();
  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🛡️' },
    { id: 'activity', label: 'Activity Log', icon: '📊' },
  ];

  return (
    <div className="lg:w-64">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Profile Settings</h1>
        <nav className="space-y-2 flex flex-col gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={`/profile/${tab.id}`}
              className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                location.pathname.includes(`/profile/${tab.id}`)
                  ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default ProfileNav;
