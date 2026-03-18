const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export async function fetchData() {
  const res = await fetch(`${BASE_URL}/api/data`);
  if (!res.ok) throw new Error(`GET /api/data failed: ${res.status}`);
  return res.json();
}

export async function fetchCompute() {
  const res = await fetch(`${BASE_URL}/api/compute`);
  if (!res.ok) throw new Error(`GET /api/compute failed: ${res.status}`);
  return res.json();
}

export async function postLogin(username, password) {
  const res = await fetch(`${BASE_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `POST /api/login failed: ${res.status}`);
  }
  return res.json();
}
