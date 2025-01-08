# Rules

1. Never remove or delete any content in this page unless told to do so.
2. Read this readme.md file to understand whats going on.
3. when it comes to photos or pictures, unless i'm supplying them, always use photo placeholders from this website: https://placehold.co/

# Technology Stack

This project uses the following technologies:

- **Frontend Framework**: React 18 with JSX
- **Routing**: React Router v6
- **Build Tool**: Vite 4.2
- **Backend**: Node.js with Express 4.18
- **Database**: SQLite 5.1
- **Payment Integration**: Stripe 12.16
- **Styling**: CSS Modules
- **TypeScript**: Available (@types packages)
- **Development**: Vite dev server
- **Production**: Vite build system

# Features Implemented

- Home page
- About page
- Contact page
- Product listing
- Product details
- Cart functionality
- Payment processing with Stripe

# To Do

- Add tests for frontend and backend
- Improve error handling
- Add user authentication
- Add order history
- Add admin panel
- Improve UI/UX
- Add more features

# Potential Improvements

- Implement server-side rendering (SSR) for better SEO
- Optimize performance
- Add more detailed documentation
- Implement a more robust database solution
- Add more payment options

# Recent Troubleshooting

We have been working on resolving an issue with Stripe checkout. Initially, we encountered an error "Failed to fetch Stripe publishable key from server". This was resolved by adding a check in the `useStripe` hook to ensure the component is mounted before fetching the key, preventing potential race conditions.

Currently, we are addressing an issue where the checkout process fails with a 500 (Internal Server Error). We are investigating why the POST request to `/api/create-checkout-session` is failing.
