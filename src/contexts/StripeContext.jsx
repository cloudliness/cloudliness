import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const StripeContext = createContext();

const fetchStripeKey = async () => {
  const response = await fetch('/api/get-stripe-key');
  if (!response.ok) {
    throw new Error('Failed to fetch Stripe key');
  }
  return response.json();
};

const createCheckoutSession = async (cartItems, stripePromise) => {
  if (!stripePromise) {
    throw new Error('Stripe not initialized');
  }

  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cartItems }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  return response.json();
};

export const StripeProvider = ({ children }) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [error, setError] = useState(null);

  const initializeStripe = useCallback(async () => {
    try {
      const { stripeKey } = await fetchStripeKey();
      const stripe = await loadStripe(stripeKey);
      setStripePromise(stripe);
      setError(null);
    } catch (err) {
      setError(err);
      console.error('Error initializing Stripe:', err);
    }
  }, []);

  useEffect(() => {
    initializeStripe();
  }, [initializeStripe]);

  const handleCreateCheckoutSession = useCallback(async (cartItems) => {
    try {
      const { url } = await createCheckoutSession(cartItems, stripePromise);
      return url;
    } catch (err) {
      console.error('Checkout session error:', err);
      throw err;
    }
  }, [stripePromise]);

  const value = {
    stripe: stripePromise,
    error,
    createCheckoutSession: handleCreateCheckoutSession,
  };

  return (
    <StripeContext.Provider value={value}>
      {children}
    </StripeContext.Provider>
  );
};

export const useStripeContext = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripeContext must be used within a StripeProvider');
  }
  return context;
};
