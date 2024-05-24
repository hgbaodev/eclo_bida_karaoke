// pusherConfig.ts
import env from '@/env';
import Pusher from 'pusher-js';

export const pusher = new Pusher(env.PUSHER_APP_KEY, {
  cluster: env.PUSHER_APP_CLUSTER,
});

export const channel = pusher.subscribe('eclo-channel');
