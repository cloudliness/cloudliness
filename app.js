// Initialize Stripe with your publishable key
const stripe = Stripe('pk_test_51Mx5HwEoZZUwOOCpogFxcRD6Il1HlIo9smUigLoBoor4Fq6mjxYd6KpSlxFAzrCOb6yxaKHojdkliRE0s64PyNXV00vkugNbrc')
// Initialize Stripe with your publishable key
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY');

// Handle buy button clicks
document.querySelectorAll('.buy-button').forEach(button => {
  button.addEventListener('click', async (e) => {
    const sku = e.target.dataset.sku;
    
    try {
      // Create checkout session
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sku }),
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your payment');
    }
  });
});

// Handle successful payment redirect
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('success')) {
  alert('Payment successful! Thank you for your purchase.');
  window.history.replaceState({}, document.title, window.location.pathname);
}
