import { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';

export function useStripe() {
  const [stripe, setStripe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    async function initializeStripe() {
      try {
        const response = await fetch(`${process.env.CLIENT_URL}/api/get-stripe-key`);
        if (!response.ok) {
          throw new Error('Failed to fetch Stripe publishable key from server');
        }
        const { publishableKey } = await response.json();

        if (typeof publishableKey !== 'string' || publishableKey.length === 0) {
          throw new Error('Invalid publishable key received from server');
        }

        const stripeInstance = await loadStripe(publishableKey);
        if (isMounted.current) {
          setStripe(stripeInstance);
        } else {
          console.log("Component unmounted, Stripe instance not set.");
        }
      } catch (err) {
        console.error('Error fetching or loading Stripe.js:', err);
        if (isMounted.current) {
          setError(err.message || 'Failed to load Stripe.js');
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    }

    initializeStripe();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { stripe, loading, error };
}
