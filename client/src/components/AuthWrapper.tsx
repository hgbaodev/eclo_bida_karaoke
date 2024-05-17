'use client';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '@/store/types';
import { useRouter } from 'next/navigation';

type Props = {
  children?: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
  const { push } = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      push('/auth/signin');
    }
  }, [isAuthenticated, push]);

  return children;
};
