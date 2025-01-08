import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Get Stripe publishable key
app.get('/api/get-stripe-key', (req, res) => {
  res.json({ stripeKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

// Products API endpoint
app.get('/api/products', (req, res) => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 1000,
      currency: 'USD',
      image: '/images/product1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 2000,
      currency: 'USD',
      image: '/images/product2.jpg',
    },
  ];
  res.json(products);
});

// Create checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { cartItems } = req.body;

    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.images[0]],
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server with explicit host binding
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
