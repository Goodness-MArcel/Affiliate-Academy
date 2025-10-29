import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext';
import { countries } from './userCountries.js';

import './Register.css';

const Register = () => {

  const { register } = useUser();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    country: '',
    paymentMethod: '',
    agreedToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(p => ({
      ...p,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'country') {
      try {
        const c = countries.find(x => x.code === value);
        setSelectedCurrency(c ? c.currency : '');
      } catch {
        setSelectedCurrency('');
        console.error('Error: countries array not found or invalid.');
      }
    }
  };

  // -------------------------------------------------
  // THE NEW handleSubmit – uses Supabase via context
  // -------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.phoneNumber.trim()) {
        throw new Error('Please fill out all required fields.');
      }

      if (!formData.country) {
        throw new Error('Please select your country.');
      }

      if (!formData.paymentMethod) {
        throw new Error('Please select a payment method.');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      if (!formData.agreedToTerms) {
        throw new Error('You must agree to the Terms and Conditions.');
      }

      // If everything is valid, proceed with registration
      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        paymentMethod: formData.paymentMethod,
        agreedToTerms: formData.agreedToTerms,
      });

      navigate('/login'); // success redirect
    } catch (err) {
      // Prevent submission if any validation or runtime error
      console.error('Registration error:', err);
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  // -------------------------------------------------
  // UI (unchanged except for error / loading display)
  // -------------------------------------------------
  return (
    <div className="register-page">
      <div className="register-container">
        <Link to="/" className="back-to-home">
          <i className="bi bi-arrow-left"></i>
          <span>Back to Home</span>
        </Link>

        <div className="register-card">
          <div className="register-header">
            <div className="logo-section"><i className="bi bi-person-plus"></i></div>
            <h1>Create Account</h1>
            <p>Join Affiliate Academy and start your journey</p>
          </div>

          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

          <form onSubmit={handleSubmit} className="register-form">
            {/* Full Name Field */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-wrapper">
                <i className="bi bi-person"></i>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <i className="bi bi-envelope"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="input-wrapper">
                <i className="bi bi-telephone"></i>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <i className="bi bi-lock"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  minLength="8"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <i className="bi bi-lock-fill"></i>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                  minLength="8"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Country Selection */}
            <div className="form-group">
              <label htmlFor="country">Select Country</label>
              <div className="input-wrapper">
                <i className="bi bi-globe"></i>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                // required
                >
                  <option value="">Choose your country</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedCurrency && (
                <div className="currency-display">
                  <i className="bi bi-currency-exchange"></i>
                  <span>Currency: {selectedCurrency}</span>
                </div>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method</label>
              <div className="input-wrapper">
                <i className="bi bi-credit-card"></i>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose payment method</option>
                  <option value="crypto">Cryptocurrency (Bitcoin, Ethereum, USDT)</option>
                  <option value="paystack">Paystack (Card, Bank Transfer, USSD)</option>
                </select>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="form-group">
              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="agreedToTerms"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="agreedToTerms">
                  I agree to the <Link to="/terms" className="terms-link">Terms and Conditions</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                </label>
              </div>
            </div>

            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Creating…' : <>Create Account <i className="bi bi-arrow-right"></i></>}
            </button>
          </form>

          <div className="divider"><span>or</span></div>
          <div className="login-link">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;