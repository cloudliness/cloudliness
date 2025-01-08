import { createContext, useContext, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const StripeContext = createContext();

export const StripeProvider = ({ children }) => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        const response = await fetch('/api/get-stripe-key');
        if (!response.ok) {
          throw new Error('Failed to fetch Stripe key');
        }
        const { stripeKey } = await response.json();
        const stripe = await loadStripe(stripeKey);
        setStripePromise(stripe);
      } catch (error) {
        console.error('Error initializing Stripe:', error);
      }
    };

    initializeStripe();
  }, []);

  const value = {
    stripe: stripePromise,
    createCheckoutSession: async (cartItems) => {
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

      const { url } = await response.json();
      return url;
    }
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
