import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    axios.post('http://localhost:5000/api/auth/login', formData, { withCredentials: true })
      .then(res => {
        setLoading(false);
        const role = res.data.data.user.role;
        if (role === 'admin') navigate('/admin');
        else if (role === 'staff') navigate('/staff');
        else navigate('/dashboard');
      })
      .catch(err => {
        setLoading(false);
        setErrorMsg(err.response?.data?.message || 'Login failed. Please check credentials.');
      });
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '120px', display: 'flex', justifyContent: 'center' }}>
      <div className="max-container" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="glass-card" style={{ padding: '40px' }}>
          <h2 style={{ fontSize: '32px', color: '#f2ca50', textAlign: 'center', marginBottom: '8px' }}>Lounge Login</h2>
          <p style={{ color: '#d0c5af', textAlign: 'center', fontSize: '14px', marginBottom: '30px' }}>
            Access your appointments, privileges and membership status.
          </p>

          {errorMsg && (
            <div style={{ backgroundColor: 'rgba(255, 180, 171, 0.1)', border: '1px solid #ffb4ab', color: '#ffb4ab', padding: '12px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #4d4635', color: '#e5e2e1', padding: '10px 0', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ color: '#d0c5af', fontSize: '12px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #4d4635', color: '#e5e2e1', padding: '10px 0', outline: 'none' }}
              />
            </div>

            <div style={{ textAlign: 'right' }}>
              <Link to="/forgot-password" style={{ color: '#f2ca50', fontSize: '12px' }}>Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="gold-shine"
              style={{
                background: '#f2ca50',
                color: '#3c2f00',
                padding: '14px',
                border: 'none',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                cursor: 'pointer'
              }}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: '30px', textAlign: 'center', color: '#d0c5af', fontSize: '14px' }}>
            New to the Sanctuary? <Link to="/register" style={{ color: '#f2ca50', fontWeight: 'bold' }}>Create an Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
