import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { updateProfile } from '@/redux/profile.slice';
import { Button, InputField } from '@/components/common';
import { UpdateProfilePayload } from '../types';

function PersonalInfoPage() {
  const dispatch = useDispatch<AppDispatch>();
  const profileState = useSelector((state: RootState) => state.profile);
  const profile = profileState.profile;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateProfilePayload>({
    first_name: '',
    last_name: '',
    email: '',
  });

  useEffect(() => {
    setFormData({
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      email: profile?.email || '',
    });
  }, [profile]);

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const id = profile?.uuid;
    if (!id) return;
    dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="primary">
            Edit Profile
          </Button>
        ) : (
          <div className="space-x-2">
            <Button
              onClick={handleSave}
              variant="primary"
              className="bg-green-600 hover:bg-green-700"
            >
              Save
            </Button>
            <Button onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
          </div>
        )}
      </div>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <InputField
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <InputField
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
}
export default PersonalInfoPage;
