// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; 
import { supabase } from '../../../supabase.js';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setLoading(true);

    // Basic validation
    if (!email || !email.includes('@')) {
      setMessage({ text: 'Please enter a valid email', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`, // Must match Supabase Auth settings
      });

      if (error) throw error;

      setMessage({
        text: 'Check your email for the password reset link!',
        type: 'success',
      });

      // Auto-redirect after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setMessage({ text: error.message || 'Failed to send reset link', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <Link to="/" className="back-to-home">
          <i className="bi bi-arrow-left"></i> Back to Home
        </Link>

        <div className="forgot-password-card">
          <div className="card-header text-center">
            <div className="logo-icon">
              <i className="bi bi-shield-lock"></i>
            </div>
            <h2>Forgot Password?</h2>
            <p className="text-muted">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          <div className="card-body">
            {message.text && (
              <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}>
                {message.text}
                {message.type === 'success' && (
                  <small className="d-block mt-1">Redirecting to login...</small>
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
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <p>
                Remember your password?{' '}
                <Link to="/login" className="text-success fw-bold">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 text-muted">
          <small>
            © 2025 Affiliate Academy. All rights reserved.
          </small>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;