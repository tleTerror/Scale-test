const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');
const { requestLogger } = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// --- CORS ---
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));

// --- Body parsing (10kb limit) ---
app.use(express.json({ limit: '10kb' }));

// --- Request logging ---
app.use(requestLogger);

// --- Placeholder: Rate limiting ---
// When ready, add: const rateLimit = require('express-rate-limit');
// app.use('/api/', rateLimit({ windowMs: 60000, max: 100 }));

// --- Placeholder: Redis caching middleware ---
// When ready, add Redis client and cache middleware per-route.
// Example: app.use('/api/data', cacheMiddleware(60));

// --- Routes ---
app.use('/api', apiRoutes);

// --- Health check ---
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// --- Error handler (must be last) ---
app.use(errorHandler);

// --- Start server ---
// Placeholder: For horizontal scaling, use Node cluster module or PM2.
// Example with cluster:
//   const cluster = require('cluster');
//   const os = require('os');
//   if (cluster.isPrimary) {
//     for (let i = 0; i < os.cpus().length; i++) cluster.fork();
//   } else { app.listen(PORT); }
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
