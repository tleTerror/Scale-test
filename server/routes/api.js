const express = require('express');
const router = express.Router();
const { getData, getCompute, postLogin } = require('../controllers/apiController');

// --- Placeholder: Per-route rate limiting ---
// const rateLimit = require('express-rate-limit');
// const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });
// router.post('/login', loginLimiter, postLogin);

// --- Placeholder: Per-route caching ---
// const { cacheMiddleware } = require('../middleware/cache');
// router.get('/data', cacheMiddleware(60), getData);

router.get('/data', getData);
router.get('/compute', getCompute);
router.post('/login', postLogin);

module.exports = router;
