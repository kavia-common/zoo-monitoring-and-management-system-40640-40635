import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/ui/States';
import useOnlineStatus from '../../hooks/useOnlineStatus';

// PUBLIC_INTERFACE
export default function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const online = useOnlineStatus();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Mock auth flow
    setTimeout(() => {
      setSubmitting(false);
      navigate('/dashboard');
    }, 400);
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
        {!online && (
          <div className="badge" style={{ background: '#fff7ed', color: '#9a3412', border: '1px solid rgba(194,65,12,.25)' }}>
            You are offline – login may not work.
          </div>
        )}
        <div className="mt-16">
          <label>Email</label>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
        </div>
        <div className="mt-16">
          <label>Password</label>
          <input className="input" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} required placeholder="••••••••" />
        </div>
        <button className="btn mt-24" type="submit" style={{ width: '100%' }} disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
        {submitting && <div className="mt-16"><Loading message="Authorizing…" inline /></div>}
        <p style={{ marginTop: 12, fontSize: 12, color: '#6b7280' }}>
          Tip: This is a mock login for preview.
        </p>
      </form>
    </div>
  );
}
