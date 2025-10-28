import React from 'react'
import './Services.css'
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="services-page">
      {/* Banner Section */}
      <section className="services-banner">
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="banner-content text-center">
                <h1 className="banner-title">
                  Our <span className="text-success">Services</span>
                </h1>
                <h2 className="banner-subtitle">
                  Comprehensive Solutions For <span className="text-success">Your Success</span>
                </h2>
                <p className="banner-description">
                  Explore our range of services designed to help you succeed in the digital marketplace
                </p>
                <div className="banner-button">
                  <Link to="/register" className="btn btn-success btn-lg">
                    Get Started
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional sections will go here */}

      {/* Services Content Section */}
      <section className="services-content-section py-5">
        <div className="container">
          {/* Welcome Header */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="services-main-title mb-4">
                Welcome to <span className="text-success">Affiliate Academy</span> Services
              </h2>
            </div>
          </div>

          {/* Unlock Your Potential */}
          <div className="row mb-5">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="content-block animate-fade-in">
                <h3 className="content-subtitle mb-3">Unlock Your Potential with Affiliate Academy Services</h3>
                <p className="content-text">
                  At Affiliate Academy Services, we are dedicated to helping you acquire valuable skills through easy-to-understand videos. 
                  Our mission is to empower individuals like you with knowledge that can make a real difference in your personal and professional lives. 
                  With our carefully curated content, we strive to make learning accessible, enjoyable, and effective.
                </p>
              </div>
            </div>
          </div>

          {/* What We Offer */}
          <div className="row mb-5">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="content-block animate-fade-in">
                <h3 className="content-subtitle mb-3">What We Offer</h3>
                <p className="content-text mb-4">
                  Our platform offers a wide range of digital content and ICT-related courses, all organized progressively for your convenience. 
                  Whether you're looking to enhance your career, explore a new field, or simply expand your horizons, Affiliate Academy Services has you covered. 
                  Our educational videos and courses cover a plethora of topics, including:
                </p>
                
                <div className="services-list">
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <div className="service-item">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Digital Marketing</strong> - Master the art of online promotion and advertising.
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="service-item">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Programming</strong> - Dive into the world of coding and software development.
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="service-item">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Web Design</strong> - Create stunning and functional websites.
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="service-item">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Graphics Design</strong> - Unleash your creativity through graphic design.
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="service-item">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Computer-Aided Design (CAD)</strong> - Learn the essentials of CAD software.
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="service-item">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Affiliate Marketing</strong> - Discover the secrets of affiliate marketing success.
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="service-item">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Animation</strong> - Bring your ideas to life with animation techniques.
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="service-item">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <strong>Video Editing</strong> - Craft compelling videos that captivate your audience.
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="content-text mt-4">
                  And that's just the beginning! Our catalog features a wide array of courses to cater to your unique interests and goals. 
                  We believe that knowledge is power, and with Affiliate Academy Services, you can gain the skills you need to succeed in today's digital age.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="row mb-5">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="content-block animate-fade-in">
                <h3 className="content-subtitle mb-3">How It Works</h3>
                <p className="content-text">
                  Getting started with Affiliate Academy Services is simple. Explore our comprehensive library of educational content, 
                  and when you're ready to take your learning to the next level, you can purchase digital products, courses, or videos 
                  directly from our platform or our subsidiary services.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="row mb-5">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="content-block animate-fade-in">
                <h3 className="content-subtitle mb-4">Why Choose Affiliate Academy Services?</h3>
                
                <div className="reasons-grid">
                  <div className="row g-4">
                    <div className="col-12 col-md-6">
                      <div className="reason-card">
                        <div className="reason-icon">
                          <i className="bi bi-star-fill text-warning"></i>
                        </div>
                        <h5 className="fw-bold">Quality Content</h5>
                        <p className="text-muted">
                          Our videos and courses are created by experts who are passionate about sharing their knowledge.
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="reason-card">
                        <div className="reason-icon">
                          <i className="bi bi-graph-up-arrow text-success"></i>
                        </div>
                        <h5 className="fw-bold">Progressive Learning</h5>
                        <p className="text-muted">
                          Our content is organized in a way that allows you to start from the basics and gradually advance to more advanced topics.
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="reason-card">
                        <div className="reason-icon">
                          <i className="bi bi-clock-history text-info"></i>
                        </div>
                        <h5 className="fw-bold">Convenience</h5>
                        <p className="text-muted">
                          Learn at your own pace, on your own schedule, and from the comfort of your own home.
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="reason-card">
                        <div className="reason-icon">
                          <i className="bi bi-headset text-danger"></i>
                        </div>
                        <h5 className="fw-bold">Expert Guidance</h5>
                        <p className="text-muted">
                          If you ever need assistance or guidance, our team is here to support you on your learning journey.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Closing CTA */}
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="content-block animate-fade-in">
                <p className="content-text mb-3">
                  At Affiliate Academy Services, we believe in the transformative power of education. 
                  Join us today and take the first step toward unlocking your full potential.
                </p>
                <p className="content-text mb-4 fw-bold">
                  Ready to embark on your learning adventure? Start exploring our courses and videos now!
                </p>
                <div className="alert alert-info" role="alert">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  <strong>Note:</strong> As a student user, you should login to access the courses. Have fun!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services;
