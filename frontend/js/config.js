// Frontend configuration
const CONFIG = {
  // API base URL - change this for production
  API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : '/api', // For production with reverse proxy

  // PayPal donation link
  PAYPAL_LINK: 'https://paypal.me/geokritikos',

  // Cache settings
  CACHE_TTL: 30 * 60 * 1000, // 30 minutes

  // Time mappings
  TIME_OPTIONS: {
    'early-morning': { label: '🌅 Early Morning (6-9 AM)', hour: 7 },
    'morning': { label: '☀️ Morning (9-12 PM)', hour: 10 },
    'midday': { label: '🌞 Midday (12-3 PM)', hour: 13 },
    'afternoon': { label: '🌤️ Afternoon (3-6 PM)', hour: 16 },
    'evening': { label: '🌇 Evening (6-8 PM)', hour: 19 }
  }
};
