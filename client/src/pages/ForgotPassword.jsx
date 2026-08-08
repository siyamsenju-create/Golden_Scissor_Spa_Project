import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMsg('');
    setLoading(true);

    axios.post('http://localhost:5001/api/auth/forgot-password', { email })
      .then(res => {
        setLoading(false);
        setMessage('Reset link has been sent to your email address.');
      })
      .catch(err => {
        setLoading(false);
        setErrorMsg(err.response?.data?.message || 'Password reset link sent.');
      });
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '120px', display: 'flex', justifyContent: 'center' }}>
      <div className="max-container" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="glass-card" style={{ padding: '40px' }}>
          <h2 style={{ fontSize: '32px', color: '#f2ca50', textAlign: 'center', marginBottom: '8px' }}>Password Recovery</h2>
          <p style={{ color: '#d0c5af', textAlign: 'center', fontSize: '14px', marginBottom: '30px' }}>
            Enter your registered email to receive a password reset link.
          </p>

          {message && (
            <div style={{ backgroundColor: 'rgba(242, 202, 80, 0.1)', border: '1px solid #f2ca50', color: '#f2ca50', padding: '12px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>
              {message}
            </div>
          )}

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #4d4635', color: '#e5e2e1', padding: '10px 0', outline: 'none' }}
              />
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
              {loading ? 'Sending Link...' : 'Send Reset Link'}
            </button>
          </form>

          <div style={{ marginTop: '30px', textAlign: 'center', color: '#d0c5af', fontSize: '14px' }}>
            Remembered password? <Link to="/login" style={{ color: '#f2ca50', fontWeight: 'bold' }}>Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
