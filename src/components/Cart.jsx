import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems: cart, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
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

  const incrementQuantity = (itemId) => {
    const item = cart.find(item => item.id === itemId);
    updateCartItemQuantity(itemId, item.quantity + 1);
  };

  const decrementQuantity = (itemId) => {
    const item = cart.find(item => item.id === itemId);
    if (item.quantity > 1) {
      updateCartItemQuantity(itemId, item.quantity - 1);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container my-5">
        <div className="alert alert-info text-center" role="alert">
          Your cart is empty.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      style={{ width: '50px', height: '50px', marginRight: '10px' }}
                      className="rounded"
                    />
                    {item.name}
                  </div>
                </td>
                <td>${(item.price / 100).toFixed(2)}</td>
                <td>
                  <div className="d-inline-flex align-items-center">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => decrementQuantity(item.id)}>-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => incrementQuantity(item.id)}>+</button>
                  </div>
                </td>
                <td>${(item.price * item.quantity / 100).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h4>Total: ${(calculateTotal() / 100).toFixed(2)}</h4>
        <div>
          <button className="btn btn-primary me-2" onClick={handleCheckout}>
            Checkout
          </button>
          <button className="btn btn-danger me-2" onClick={clearCart}>
            Clear Cart
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
