// src/pages/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabase';
import './ResetPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  // ————————————————————
  // 1. Extract token from URL hash
  // ————————————————————
  useEffect(() => {
    const hash = window.location.hash.substring(1); // Remove #
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const tokenType = params.get('type');

    if (!accessToken || tokenType !== 'recovery') {
      setMessage({ text: 'Invalid or expired reset link.', type: 'error' });
      return;
    }

    // Set the session using the access token
    supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: params.get('refresh_token') || '',
    }).then(({ error }) => {
      if (error) {
        console.error('Session set error:', error);
        setMessage({ text: 'Session expired. Please request a new link.', type: 'error' });
      }
    });
  }, []);

  // ————————————————————
  // 2. Handle form submit
  // ————————————————————
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (password.length < 8) {
      setMessage({ text: 'Password must be at least 8 characters', type: 'error' });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      setMessage({
        text: 'Password updated successfully! Redirecting...',
        type: 'success',
      });

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2000);
    } catch (error) {
      setMessage({ text: error.message || 'Failed to update password', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="reset-password-page">
      <div className="reset-password-container">
        <Link to="/" className="back-to-home">
          Back to Home
        </Link>

        <div className="reset-password-card">
          <div className="card-header text-center">
            <div className="logo-icon">
              <i className="bi bi-key"></i>
            </div>
            <h2>Set New Password</h2>
            <p className="text-muted">
              Enter a strong password to secure your account.
            </p>
          </div>

          <div className="card-body">
            {message.text && (
              <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}>
                {message.text}
                {message.type === 'success' && (
                  <small className="d-block mt-1">Redirecting...</small>
                )}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMessage({ text: '', type: '' })}
                ></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                    disabled={loading}
                  />
                </div>
                <small className="text-muted">Minimum 8 characters</small>
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 btn-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <p>
                Remembered your password?{' '}
                <Link to="/login" className="text-success fw-bold">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 text-muted">
          <small>© 2025 Affiliate Academy. All rights reserved.</small>
        </div>
      </div>
    </div>
    </>
  );
};

export default ResetPassword;