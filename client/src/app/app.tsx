'use client';
import { useEffect, useState } from 'react';
import { me } from '@/store/slices/authSlice';
import { dispatch } from '@/store';
import Pusher from 'pusher-js';
import env from '@/env';

const App = ({ children }: { children: React.ReactNode }) => {
  var pusher = new Pusher(env.PUSHER_APP_ID, {
    cluster: env.PUSHER_APP_CLUSTER,
  });

  var channel = pusher.subscribe('my-channel');
  channel.bind('my-event', function (data: any) {
    alert(JSON.stringify(data));
  });

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
