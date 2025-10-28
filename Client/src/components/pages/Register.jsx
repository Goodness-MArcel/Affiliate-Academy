import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

const Register = () => {
  // Country data with currencies
  const countries = [
    { code: 'US', name: 'United States', currency: 'USD ($)' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP (£)' },
    { code: 'NG', name: 'Nigeria', currency: 'NGN (₦)' },
    { code: 'GH', name: 'Ghana', currency: 'GHS (₵)' },
    { code: 'KE', name: 'Kenya', currency: 'KES (KSh)' },
    { code: 'ZA', name: 'South Africa', currency: 'ZAR (R)' },
    { code: 'CA', name: 'Canada', currency: 'CAD ($)' },
    { code: 'AU', name: 'Australia', currency: 'AUD ($)' },
    { code: 'IN', name: 'India', currency: 'INR (₹)' },
    { code: 'SG', name: 'Singapore', currency: 'SGD ($)' },
    { code: 'AE', name: 'United Arab Emirates', currency: 'AED (د.إ)' },
    { code: 'EU', name: 'European Union', currency: 'EUR (€)' }
  ]

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    country: '',
    paymentMethod: '',
    agreedToTerms: false
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Update currency when country changes
    if (name === 'country') {
      const country = countries.find(c => c.code === value)
      setSelectedCurrency(country ? country.currency : '')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    if (!formData.agreedToTerms) {
      alert('Please agree to the Terms and Conditions')
      return
    }

    console.log('Registration data:', formData)
    // Add your registration logic here
  }

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Back to Home Arrow */}
        <Link to="/" className="back-to-home">
          <i className="bi bi-arrow-left"></i>
          <span>Back to Home</span>
        </Link>

        {/* Register Card */}
        <div className="register-card">
          <div className="register-header">
            <div className="logo-section">
              <i className="bi bi-person-plus"></i>
            </div>
            <h1>Create Account</h1>
            <p>Join Affiliate Academy and start your journey</p>
          </div>

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
                  required
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

            {/* Submit Button */}
            <button type="submit" className="register-button">
              <span>Create Account</span>
              <i className="bi bi-arrow-right"></i>
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* Login Link */}
          <div className="login-link">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
