import React, { useState } from 'react';
import { Button, InputField } from '../common';

const ChangePassword = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handlePasswordChange = (name: string, value: string | boolean) => {
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    setIsChangingPassword(true);
    try {
      // TODO: Implement password change API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setPasswordSuccess('Password changed successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setPasswordError('Failed to change password. Please try again.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
      <form onSubmit={handlePasswordSubmit} className="space-y-4">
        <InputField
          label="Current Password"
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={passwordForm.currentPassword}
          onChange={handlePasswordChange}
          required
        />
        <InputField
          label="New Password"
          type="password"
          id="newPassword"
          name="newPassword"
          value={passwordForm.newPassword}
          onChange={handlePasswordChange}
          required
        />
        <InputField
          label="Confirm New Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={passwordForm.confirmPassword}
          onChange={handlePasswordChange}
          required
        />
        {passwordError && <div className="text-red-600 text-sm">{passwordError}</div>}
        {passwordSuccess && <div className="text-green-600 text-sm">{passwordSuccess}</div>}
        <Button
          type="submit"
          loading={isChangingPassword}
          disabled={isChangingPassword}
          className="bg-black hover:bg-gray-900 text-white"
        >
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
