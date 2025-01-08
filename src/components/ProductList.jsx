import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useStripeContext } from '../contexts/StripeContext';

export default function ProductList({ products }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleCheckout = async (priceId) => {
    if (!stripe || !elements) return;

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.images[0]} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="price">
            ${(product.default_price.unit_amount / 100).toFixed(2)}
          </div>
          <button 
            onClick={() => handleCheckout(product.default_price.id)}
            disabled={!stripe}
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
}
