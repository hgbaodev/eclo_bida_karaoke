'use client';
import { useEffect, useState } from 'react';
import { me } from '@/store/slices/authSlice';
import { dispatch } from '@/store';

const App = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(me()).finally(() => setIsLoaded(true));
  }, []);

  if (!isLoaded) {
    return null;
  }

  return children;
};

export default App;
