import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useStripe } from '../hooks/useStripe';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { stripe, loading, error } = useStripe();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const handleCheckout = async () => {
    if (!stripe || cartItems.length === 0) return;
    
    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      // First get the Stripe key from the server
      const keyResponse = await fetch('/api/get-stripe-key');
      if (!keyResponse.ok) {
        throw new Error('Failed to get Stripe key');
      }
      const { stripeKey } = await keyResponse.json();

      // Then proceed with checkout
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${stripeKey}`
        },
        body: JSON.stringify({ 
          productIds: cartItems.map((item) => item.id),
          cartItems: cartItems 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Checkout failed');
      }

      const { url } = await response.json();
      window.location = url;
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError(error.message);
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-container">Loading Stripe...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Continue shopping to add items to your cart</p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">${(item.price / 100).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>
                  $
                  {cartItems
                    .reduce((total, item) => total + item.price / 100 * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="summary-row">
                <span>Estimated Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>
                  $
                  {cartItems
                    .reduce((total, item) => total + item.price / 100 * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
            <button 
              className="checkout-btn" 
              onClick={handleCheckout}
              disabled={checkoutLoading || cartItems.length === 0}
            >
              {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            {checkoutError && (
              <div className="checkout-error">
                Error: {checkoutError}
              </div>
            )}
            <p className="secure-checkout">
              <i className="fas fa-lock"></i> Secure Checkout
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
