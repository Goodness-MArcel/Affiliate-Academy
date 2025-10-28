import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleRedirectNow = () => {
    navigate('/login');
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-animation">
          <h1 className="error-code">404</h1>
          <div className="error-icon">
            <i className="bi bi-exclamation-triangle"></i>
          </div>
        </div>
        
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="redirect-info">
          <p className="countdown-text">
            Redirecting to login in <span className="countdown-number">{countdown}</span> seconds...
          </p>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn btn-success" onClick={handleRedirectNow}>
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Go to Login Now
          </button>
          <button className="btn btn-outline-success" onClick={() => navigate('/')}>
            <i className="bi bi-house-door me-2"></i>
            Back to Home
          </button>
        </div>

        <div className="helpful-links">
          <p className="text-muted mb-2">You might be looking for:</p>
          <div className="links-grid">
            <a href="/" className="helpful-link">
              <i className="bi bi-house-door"></i> Home
            </a>
            <a href="/services" className="helpful-link">
              <i className="bi bi-briefcase"></i> Services
            </a>
            <a href="/affiliate" className="helpful-link">
              <i className="bi bi-people"></i> Affiliate
            </a>
            <a href="/faqs" className="helpful-link">
              <i className="bi bi-question-circle"></i> FAQs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
