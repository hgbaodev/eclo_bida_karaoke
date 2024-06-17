'use client';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import env from '@/env'; // Ensure this imports your environment variables correctly

export default function Orders() {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const initializePusher = async () => {
      try {
        console.log('Initializing Pusher...');
        const pusher = new Pusher(env.PUSHER_APP_KEY, {
          cluster: env.PUSHER_APP_CLUSTER,
        });

        const channel = pusher.subscribe('eclo');

        channel.bind('pusher:subscription_succeeded', () => {
          console.log('Successfully subscribed to the channel.');
        });

        channel.bind('productOrder.requested', (data) => {
          console.log('Raw event data:', data); // Log the raw event data

          // Use the data directly without parsing
          setOrderData(data);
        });

        channel.bind('pusher:subscription_error', (status) => {
          console.error('Subscription error:', status);
        });

        channel.bind('pusher:error', (err) => {
          console.error('Pusher error:', err);
        });

        // Cleanup function to unbind and unsubscribe from the channel
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing Pusher:', error);
      }
      console.log('Pusher initialized...');
    };

    initializePusher();
  }, []);

  return (
    <div>
      {orderData ? (
        <div>
          <h2>Order Product Request Event Data</h2>
          <p>Order: {orderData.order_active}</p>
          <p>Products:</p>
          <ul>
            {orderData.products.map((product, index) => (
              <li key={index}>
                Active: {product.active}, Quantity: {product.quantity}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No data received yet...</p>
      )}
    </div>
  );
}
