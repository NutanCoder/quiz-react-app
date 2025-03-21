import React, { useState } from 'react';
import { Button, InputField } from '../common';

const ChangeEmail = () => {
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [emailForm, setEmailForm] = useState({
    currentEmail: '',
    newEmail: '',
  });
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');

  const handleEmailChange = (name: string, value: string | boolean) => {
    setEmailForm({
      ...emailForm,
      [name]: value,
    });
    setEmailError('');
    setEmailSuccess('');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setEmailSuccess('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailForm.newEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsChangingEmail(true);
    try {
      // TODO: Implement email change API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setEmailSuccess('Email changed successfully');
      setEmailForm({
        currentEmail: '',
        newEmail: '',
      });
    } catch (error) {
      setEmailError('Failed to change email. Please try again.');
    } finally {
      setIsChangingEmail(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Email</h3>
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <InputField
          label="Current Email"
          type="email"
          id="currentEmail"
          name="currentEmail"
          value={emailForm.currentEmail}
          onChange={handleEmailChange}
          required
        />
        <InputField
          label="New Email Address"
          type="email"
          id="newEmail"
          name="newEmail"
          value={emailForm.newEmail}
          onChange={handleEmailChange}
          required
        />
        {emailError && <div className="text-red-600 text-sm">{emailError}</div>}
        {emailSuccess && <div className="text-green-600 text-sm">{emailSuccess}</div>}
        <Button
          type="submit"
          loading={isChangingEmail}
          disabled={isChangingEmail}
          className="bg-black hover:bg-gray-900 text-white"
        >
          Change Email
        </Button>
      </form>
    </div>
  );
};

export default ChangeEmail;
