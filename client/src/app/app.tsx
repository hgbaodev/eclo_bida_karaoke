'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { me } from '@/store/slices/authSlice';

const App = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(me() as Promise<void>).finally(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) {
    return null;
  }

  return children;
};

export default App;
