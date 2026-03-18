// --- Placeholder: Redis caching ---
// const redis = require('redis');
// const client = redis.createClient();
// Before returning data, check cache: const cached = await client.get(key);
// After computing, set cache: await client.setEx(key, TTL, JSON.stringify(data));

function getData(_req, res) {
  const payload = {
    message: 'Hello from the API',
    timestamp: new Date().toISOString(),
  };

  res.json(payload);
}

function getCompute(_req, res) {
  // Simulate CPU-heavy work (~150-200ms blocking)
  const start = Date.now();
  const target = start + 150 + Math.random() * 50; // 150-200ms

  while (Date.now() < target) {
    // busy wait — intentionally blocking for load testing
    Math.sqrt(Math.random() * 999999);
  }

  const duration = Date.now() - start;

  res.json({
    message: 'Heavy computation complete',
    computeTimeMs: duration,
    timestamp: new Date().toISOString(),
  });
}

function postLogin(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }

  // Dummy token — no real auth
  const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

  res.json({
    message: 'Login successful',
    token,
    user: username,
  });
}

module.exports = { getData, getCompute, postLogin };
