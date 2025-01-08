import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

export function useStripe() {
  const [stripe, setStripe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function initializeStripe() {
      try {
        const response = await fetch('/api/get-stripe-key');
        if (!response.ok) {
          throw new Error('Failed to fetch Stripe publishable key from server');
        }
        const { publishableKey } = await response.json();

        if (typeof publishableKey !== 'string' || publishableKey.length === 0) {
          throw new Error('Invalid publishable key received from server');
        }

        const stripeInstance = await loadStripe(publishableKey);
        if (stripeInstance) {
          setStripe(stripeInstance);
        } else {
          setError('Failed to load Stripe.js');
        }
      } catch (err) {
        console.error('Error fetching or loading Stripe.js:', err);
        setError(err.message || 'Failed to load Stripe.js');
      } finally {
        setLoading(false);
      }
    }

    initializeStripe();
  }, []);

  return { stripe, loading, error };
}
