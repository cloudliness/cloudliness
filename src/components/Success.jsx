import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Success.css';

function Success() {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, [clearCart, navigate]);

  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase.</p>
      <p>You will be redirected to the home page in 3 seconds...</p>
    </div>
  );
}

export default Success;
