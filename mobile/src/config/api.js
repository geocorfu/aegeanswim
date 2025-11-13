// API Configuration for AegeanSwim Mobile App

const API_CONFIG = {
  // Development
  development: {
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
  },
  // Production (replace with your actual API URL)
  production: {
    baseURL: 'https://your-api.vercel.app/api',
    timeout: 10000,
  },
};

// Automatically detect environment
const ENV = __DEV__ ? 'development' : 'production';

export const API_BASE_URL = API_CONFIG[ENV].baseURL;
export const API_TIMEOUT = API_CONFIG[ENV].timeout;

// PayPal configuration
export const PAYPAL_LINK = 'https://paypal.me/geokritikos';

// App configuration
export const APP_CONFIG = {
  name: 'AegeanSwim',
  version: '1.0.0',
  supportEmail: 'support@aegeanswim.com',
  githubURL: 'https://github.com/geocorfu/aegeanswim',
};

// Island emoji mapping
export const ISLAND_EMOJIS = {
  mykonos: '🎉',
  santorini: '🌋',
  paros: '⛵',
  naxos: '🏖️',
  ios: '🌅',
  milos: '💎',
  syros: '🎭',
  tinos: '⛪',
  andros: '🥾',
  kea: '🦁',
  kythnos: '♨️',
  amorgos: '⛰️',
  folegandros: '🏔️',
  serifos: '⛏️',
  sifnos: '👨‍🍳',
  sikinos: '🌾',
  antiparos: '🕳️',
  koufonisia: '🐠',
  kimolos: '🧂',
  rhodes: '⚔️',
  kos: '🌿',
  patmos: '✝️',
  leros: '🏥',
  kalymnos: '🧽',
  lesbos: '🫒',
  chios: '🌰',
  samos: '🍷',
  lemnos: '🌋',
  thasos: '🌲',
  crete: '🏺',
  skiathos: '🌲',
  skopelos: '🎬',
};

export default API_CONFIG;
