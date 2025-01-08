import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

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
  console.log("GET /api/get-stripe-key");
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
  console.log("Publishable Key:", publishableKey);
  res.setHeader('Content-Type', 'application/json');
  if (!publishableKey) {
    console.error("Stripe Publishable Key not found in environment variables.");
    return res.status(500).json({ error: 'Stripe publishable key not found' });
  }
  console.log("Response Headers:", res.getHeaders());
  res.json({ publishableKey: publishableKey });
  console.log("Response Sent");
});

import products from './seed.js';

// Products API endpoint
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Create checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    console.log("POST /api/create-checkout-session");
    console.log("Request Body:", req.body);
    const { cartItems } = req.body;
    console.log("cartItems:", cartItems);

    const lineItems = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.images,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));
    console.log("lineItems:", lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start server with explicit host binding
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
