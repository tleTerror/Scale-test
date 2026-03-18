import { useState } from 'react';
import { fetchData, fetchCompute, postLogin } from '../api/client';

export default function ApiTester() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function call(fn) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await fn();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Scale Test</h1>
      <p style={{ color: '#666' }}>Hit the endpoints below and observe responses.</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        <button onClick={() => call(fetchData)} disabled={loading}>
          GET /api/data
        </button>
        <button onClick={() => call(fetchCompute)} disabled={loading}>
          GET /api/compute
        </button>
        <button onClick={() => call(() => postLogin('testuser', 'pass123'))} disabled={loading}>
          POST /api/login
        </button>
      </div>

      {loading && <p style={{ color: '#888' }}>Loading...</p>}

      {error && (
        <pre style={{ background: '#fee', color: '#c00', padding: 12, borderRadius: 4 }}>
          Error: {error}
        </pre>
      )}

      {result && (
        <pre style={{ background: '#f4f4f4', padding: 12, borderRadius: 4, overflowX: 'auto' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
