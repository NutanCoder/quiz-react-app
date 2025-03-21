import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

function HideAdmin({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useSelector((state: RootState) => state.profile);
  if (loading || profile?.role === 'ADMIN') return <></>;
  return children;
}

export default HideAdmin;
