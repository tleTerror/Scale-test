# Scale Test

A minimal full-stack app built for scalability and load testing experiments.

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **No database** — stateless by design for horizontal scaling tests

## Project Structure

```
scale-test/
├── client/          → React SPA (Vite)
│   └── src/
│       ├── api/     → fetch wrappers
│       └── components/
└── server/          → Express API
    ├── routes/
    ├── controllers/
    └── middleware/
```

## API Endpoints

| Method | Route         | Description                          |
|--------|---------------|--------------------------------------|
| GET    | /api/data     | Returns JSON with message + timestamp |
| GET    | /api/compute  | Simulates CPU-heavy work (150-200ms) |
| POST   | /api/login    | Accepts `{username, password}`, returns dummy token |
| GET    | /health       | Server health check + uptime         |

## Setup

```bash
# Ensure you're using Linux-native Node (WSL users)
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"

# Install dependencies
cd server && npm install
cd ../client && npm install
```

## Running

```bash
# Server (port 3001)
cd server && npm run dev

# Client (port 5173) — separate terminal
cd client && npm run dev
```

## Environment Variables

**server/.env**
```
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
```

**client/.env**
```
VITE_API_BASE_URL=http://localhost:3001
```

## Deployment

### Frontend → Vercel
- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`
- Env: `VITE_API_BASE_URL=https://<your-backend>.onrender.com`

### Backend → Render
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`
- Env: `PORT=3001`, `CLIENT_ORIGIN=https://<your-app>.vercel.app`

## Future Extensions

This project is structured for easy addition of:

- **Load testing** with k6
- **Rate limiting** with express-rate-limit
- **Caching** with Redis
- **Horizontal scaling** with Node cluster / PM2

Placeholder comments are already in the server code at the relevant integration points.
