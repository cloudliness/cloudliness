import { createContext, useContext } from 'react';

const StripeContext = createContext();

export const StripeProvider = ({ children }) => {
  const value = {};

  return (
    <StripeContext.Provider value={value}>
      {children}
    </StripeContext.Provider>
  );
};

export const useStripeContext = () => useContext(StripeContext);
