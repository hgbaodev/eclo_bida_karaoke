// hooks/usePusher.ts
import { useEffect, useRef } from 'react';
import { channel } from '@/helpers/pusherConfig';

const usePusher = (event: string, callback: (data: any) => void) => {
  const savedCallback = useRef<(data: any) => void>();

  useEffect(() => {
    // Save the latest callback in the ref
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    // Create the event handler that calls the latest callback
    const eventHandler = (data: any) => {
      if (savedCallback.current) {
        savedCallback.current(data);
      }
    };

    // Bind the Pusher event
    channel.bind(event, eventHandler);

    // Cleanup function to unbind the event
    return () => {
      channel.unbind(event, eventHandler);
    };
  }, [event]);
};

export default usePusher;
