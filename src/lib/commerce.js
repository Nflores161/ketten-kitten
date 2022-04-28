// Import the Commerce module
import Commerce from '@chec/commerce.js';

// Create a Commerce instance
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);

