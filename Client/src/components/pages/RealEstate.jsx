import React from 'react'
import './RealEstate.css'
import { Link } from 'react-router-dom';

const RealEstate = () => {
  return (
    <div className="real-estate-page">
      {/* Banner Section */}
      <section className="real-estate-banner">
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="banner-content text-center">
                <h1 className="banner-title">
                  Real Estate <span className="text-success">Solutions</span>
                </h1>
                <h2 className="banner-subtitle">
                  Investment Opportunities <span className="text-success">Await You</span>
                </h2>
                <p className="banner-description">
                  Explore premium real estate properties and investment opportunities through Affiliate Academy
                </p>
                <div className="banner-button">
                  <Link to="/register" className="btn btn-success btn-lg">
                    Get Notified
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="coming-soon-main-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="coming-soon-content text-center">
                <div className="coming-soon-icon mb-4">
                  <i className="bi bi-hourglass-split"></i>
                </div>
                <h2 className="coming-soon-title">
                  Coming <span className="text-success">Soon</span>
                </h2>
                <p className="coming-soon-description">
                  We're working hard to bring you an amazing real estate marketplace experience. 
                  Exciting opportunities and investments are on the way!
                </p>

                <div className="coming-soon-features mb-5">
                  <div className="row g-4">
                    <div className="col-12 col-md-4">
                      <div className="feature-item">
                        <i className="bi bi-building"></i>
                        <h5>Premium Properties</h5>
                        <p>Curated real estate opportunities</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="feature-item">
                        <i className="bi bi-graph-up-arrow"></i>
                        <h5>Investment Growth</h5>
                        <p>Build wealth through real estate</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="feature-item">
                        <i className="bi bi-shield-check"></i>
                        <h5>Secure Deals</h5>
                        <p>Protected transactions & verified listings</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="coming-soon-notification mb-5">
                  <p className="notification-text">
                    <i className="bi bi-bell-fill me-2"></i>
                    Be the first to know when we launch!
                  </p>
                </div>

                <div className="coming-soon-buttons">
                  <Link to="/" className="btn btn-success btn-lg me-2 mb-2">
                    <i className="bi bi-house-fill me-2"></i>
                    Back to Home
                  </Link>
                  <Link to="/contact" className="btn btn-outline-success btn-lg mb-2">
                    <i className="bi bi-envelope-fill me-2"></i>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RealEstate
