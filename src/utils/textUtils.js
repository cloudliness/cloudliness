/**
 * Utility functions for text manipulation
 */

/**
 * Safely extracts text from HTML and truncates it
 * @param {string} html - HTML string to process
 * @returns {string} - Plain text version of the HTML, truncated if necessary
 */
export const getPreviewText = (html) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || '';
  return text.length > 200 ? text.substring(0, 200) + '...' : text;
};

/**
 * Formats price with proper currency formatting
 * @param {number} price - Price in cents
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price) => {
  return `$${(price / 100).toFixed(2)}`;
};
