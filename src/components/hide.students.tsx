import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

function HideStudent({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useSelector((state: RootState) => state.profile);
  if (loading || profile?.role === 'STUDENT') return <></>;
  return children;
}

export default HideStudent;
