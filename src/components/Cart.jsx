import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems: cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems: cart }),
      });

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log(data.url);
      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  if (cart.length === 0) {
    return <div className="cart-empty">Your cart is empty.</div>;
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.images[0]} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Price: ${(item.price / 100).toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        Total: ${(calculateTotal() / 100).toFixed(2)}
      </div>
      <div className="cart-actions">
        <button onClick={handleCheckout}>Checkout</button>
        <button onClick={clearCart}>Clear Cart</button>
        <button onClick={() => navigate('/products')}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default Cart;
