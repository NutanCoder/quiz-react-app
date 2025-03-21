import ChangePassword from '@/components/profile/ChangePassword';
import ChangeEmail from '@/components/profile/ChangeEmail';

const SecurityContent = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
      <hr />
      <ChangePassword />
      <ChangeEmail />
    </div>
  );
};

export default SecurityContent;
