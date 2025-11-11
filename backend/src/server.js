require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const beachRoutes = require('./routes/beaches');
const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Compression middleware
app.use(compression());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'AegeanSwim API'
  });
});

// API routes
app.use('/api/beaches', beachRoutes);
app.use('/api/weather', weatherRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'AegeanSwim API',
    version: '1.0.0',
    description: 'Find perfect swimming beaches in the Aegean Sea based on real-time wind conditions',
    endpoints: {
      beaches: {
        list: 'GET /api/beaches',
        byIsland: 'GET /api/beaches/:island',
        islands: 'GET /api/beaches/islands/list'
      },
      weather: {
        forecast: 'GET /api/weather/forecast?lat={lat}&lon={lon}&date={date}&time={time}',
        recommendations: 'GET /api/weather/recommendations?island={island}&date={date}&time={time}'
      },
      health: 'GET /health'
    },
    documentation: 'https://github.com/geocorfu/aegeanswim'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
    availableEndpoints: '/api/beaches, /api/weather'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌊 AegeanSwim API server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏖️  Ready to find perfect beaches!`);
});

module.exports = app;
