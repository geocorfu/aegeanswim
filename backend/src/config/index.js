module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  weatherApiUrl: process.env.WEATHER_API_URL || 'https://api.open-meteo.com/v1/forecast',
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://127.0.0.1:3000'],
  paypalLink: process.env.PAYPAL_LINK || 'https://paypal.me/geokritikos',
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },
  cache: {
    weatherTTL: parseInt(process.env.WEATHER_CACHE_TTL) || 1800, // 30 minutes in seconds
    beachDataTTL: parseInt(process.env.BEACH_DATA_CACHE_TTL) || 86400 // 24 hours in seconds
  }
};
