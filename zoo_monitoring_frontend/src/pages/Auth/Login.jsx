import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // Mock auth flow
    navigate('/dashboard');
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: 'var(--color-background)' }}>
      <form className="card" onSubmit={onSubmit} style={{ width: 360 }}>
        <div className="brand" style={{ marginBottom: 16 }}>
          <span className="dot" />
          <span>VizAI</span>
        </div>
        <h2 style={{ margin: 0, marginBottom: 8 }}>Welcome back</h2>
        <p style={{ marginTop: 0, color: '#6b7280' }}>Sign in to continue</p>
        <div className="mt-16">
          <label>Email</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
        </div>
        <div className="mt-16">
          <label>Password</label>
          <input className="input" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} required placeholder="••••••••" />
        </div>
        <button className="btn mt-24" type="submit" style={{ width: '100%' }}>Sign in</button>
        <p style={{ marginTop: 12, fontSize: 12, color: '#6b7280' }}>
          Tip: This is a mock login for preview.
        </p>
      </form>
    </div>
  );
}
