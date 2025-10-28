import './Home.css';

const Home = () => {
  const scrollCarousel = (direction) => {
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
      const scrollAmount = 380;
      carousel.scrollLeft += direction * scrollAmount;
    }
  };

  return (
    <div className="home-page">
      {/* Hero Banner Section */}
      <section className="hero-banner-cover">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="hero-content text-center">
                <h1 className="hero-title animate-fade-in">
                  <span className="text-white">Affiliate Academy</span>
                </h1>
                <h2 className="hero-subtitle animate-fade-in-delay">
                  Information Is <span className="text-success">Wealth</span>
                </h2>
                <p className="hero-description animate-fade-in-delay-2">
                  We are not just a platform; we are a dynamic digital marketplace where dreams
                  are fueled by knowledge, and success is within reach.
                </p>
                <div className="hero-buttons animate-fade-in-delay-3">
                  <a href="/register" className="btn btn-success btn-lg me-0 me-sm-3 mb-2 mb-sm-3">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jumbotron Section */}
      <section className="jumbotron-section py-5">
        <div className="container">
          {/* Main Featured Card */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="featured-card animate-slide-up">
                <div className="card border-0 shadow-lg overflow-hidden">
                  <div className="row g-0">
                    <div className="col-12 col-md-6">
                      <div className="card-img-wrapper">
                        <img 
                          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" 
                          className="img-fluid h-100 w-100" 
                          alt="Featured" 
                          style={{ objectFit: 'cover', minHeight: '400px' }}
                        />
                        <div className="card-img-overlay-gradient"></div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="card-body p-4 p-md-5 d-flex flex-column justify-content-center h-100">
                        <span className="badge bg-success mb-3 align-self-start">Featured</span>
                        <h2 className="card-title h3 fw-bold mb-3">
                         Do you want to Make passive Income online by trading information as a commodity??
                        </h2>
                        <p className="card-text lead mb-4">
                          The digital products marketplace where we trade information as a commodity.
                          Affiliate Academy is a digital products marketplace providing the value that satisfies the information impulses of Customers.
                          The gap inbetween a desire and it's result is <strong>"KNOWLEDGE"</strong>
                        </p>
                        <ul className="list-unstyled mb-4">
                          <li className="mb-2">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            SignUp
                          </li>
                          <li className="mb-2">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Promote
                          </li>
                          <li className="mb-2">
                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                            Earn
                          </li>
                        </ul>
                        <div>
                          <a href="/register" className="btn btn-success btn-lg w-100 w-sm-auto">
                            Start Your Journey
                            <i className="bi bi-arrow-right ms-2"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Two Bottom Cards */}
          <div className="row g-3 g-md-4">
            {/* Card 1 */}
            <div className="col-12 col-md-6">
              <div className="info-card animate-slide-up-delay-1">
                <div className="card border-0 shadow-lg h-100 overflow-hidden hover-lift">
                  <div className="card-img-top-wrapper position-relative">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" 
                      className="card-img-top" 
                      alt="Analytics" 
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <div className="card-img-overlay-dark"></div>
                    <div className="position-absolute top-0 start-0 p-3">
                      <span className="badge bg-success bg-opacity-90">
                        <i className="bi bi-graph-up-arrow me-1"></i>
                        Analytics
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <div className="card-icon mb-3">
                      <i className="bi bi-bar-chart-line-fill text-success" style={{ fontSize: '2.5rem' }}></i>
                    </div>
                    <h3 className="card-title h4 fw-bold mb-3">Real-Time Analytics</h3>
                    <p className="card-text text-muted">
                      We Trade varieties of information that provides the knowledge necessary to make dreams,goals,desires happen and happen more quickly.
                      A Market where knowledge is power and success is unlimited. At Affiliate Academy, we have unlocked the secret to turning desires into reality through the
                      transformative power of information and real estate. Our mission is clear: to provide you with the tools and resources you need to make your dreams come 
                      true – faster and with greater ease.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-12 col-md-6">
              <div className="info-card animate-slide-up-delay-2">
                <div className="card border-0 shadow-lg h-100 overflow-hidden hover-lift">
                  <div className="card-img-top-wrapper position-relative">
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" 
                      className="card-img-top" 
                      alt="Community" 
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <div className="card-img-overlay-dark"></div>
                    <div className="position-absolute top-0 start-0 p-3">
                      <span className="badge bg-success bg-opacity-90">
                        <i className="bi bi-people-fill me-1"></i>
                        Community
                      </span>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <div className="card-icon mb-3">
                      <i className="bi bi-people-fill text-success" style={{ fontSize: '2.5rem' }}></i>
                    </div>
                    <h3 className="card-title h4 fw-bold mb-3">Vibrant Community</h3>
                    <p className="card-text text-muted">
                      Do you want to make passive income online by trading information and real estate as commodities? Get ready to experience financial freedom like never before. 
                      We are proud to offer an exclusive opportunity for our Affiliated Information Traders to embark on a lifetime investment journey with our extra revolutionary "Chain Commission" system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional sections will go here */}
      
      {/* Video Advertisement Section */}
      <section className="video-advert-section py-4 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="video-card animate-fade-scale">
                <div className="card border-0 shadow-lg overflow-hidden">
                  <div className="card-body p-0">
                    <div className="row g-0">
                      {/* Video Column */}
                      <div className="col-12 col-lg-7">
                        <div className="video-wrapper">
                          <div className="ratio ratio-16x9">
                            {/* Replace src with your video URL */}
                            <iframe
                              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                              title="Advertisement Video"
                              allowFullScreen
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              className="video-frame"
                            ></iframe>
                          </div>
                          <div className="video-overlay">
                            <div className="play-icon">
                              <i className="bi bi-play-circle-fill"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content Column */}
                      <div className="col-12 col-lg-5">
                        <div className="video-content p-3 p-md-4 p-lg-5 d-flex flex-column justify-content-center h-100">
                          <span className="badge bg-success mb-3 align-self-start">
                            <i className="bi bi-play-btn-fill me-1"></i>
                            Watch Now
                          </span>
                          <h3 className="h4 fw-bold mb-3">
                            Discover How to Start Your Journey
                          </h3>
                          <p className="text-muted mb-4">
                            Watch this exclusive video to learn how you can transform your financial future 
                            through our proven affiliate marketing strategies and information trading system.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/** Additional sections will go here **/}
      
      {/* Top Selling Products Section */}
      <section className="top-products-section py-4 py-md-5 bg-light">
        <div className="container">
          {/* Section Header */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="display-5 fw-bold mb-3 animate-fade-in">
                Top Selling <span className="text-success">Products</span>
              </h2>
              <p className="lead text-muted animate-fade-in-delay">
                Discover our most popular digital products and information resources
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="row g-4">
            {/* Product cards will be added here */}
            <div className="col-12 text-center">
              <p className="text-muted">COMING SOON...</p>
            </div>
          </div>
        </div>
      </section>
      {/** Additional sections will go here **/}
      
      {/* Call to Action Cards Section */}
      <section className="cta-cards-section py-4 py-md-5">
        <div className="container">
          <div className="row g-3 g-md-4">
            {/* Become an Affiliate Card */}
            <div className="col-12 col-lg-6">
              <div className="cta-card animate-slide-up">
                <div className="card border-0 shadow-lg h-100 overflow-hidden">
                  <div className="card-body p-4 p-md-5 text-center position-relative">
                    <div className="cta-icon mb-4">
                      <i className="bi bi-people-fill text-success" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <h3 className="h2 fw-bold mb-3">Become an Affiliate</h3>
                    <p className="lead text-muted mb-4">
                      Join our affiliate program and start earning commissions by promoting our digital products. 
                      Turn your network into income with our proven system.
                    </p>
                    <ul className="list-unstyled text-start mb-4">
                      <li className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Earn generous commissions
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Access marketing materials
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Real-time tracking & analytics
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Dedicated support team
                      </li>
                    </ul>
                    <a href="/affiliate" className="btn btn-success btn-lg w-100">
                      <i className="bi bi-person-plus-fill me-2"></i>
                      Become an Affiliate
                    </a>
                  </div>
                  <div className="card-decoration"></div>
                </div>
              </div>
            </div>

            {/* Customer Card */}
            <div className="col-12 col-lg-6">
              <div className="cta-card animate-slide-up-delay-1">
                <div className="card border-0 shadow-lg h-100 overflow-hidden">
                  <div className="card-body p-4 p-md-5 text-center position-relative">
                    <div className="cta-icon mb-4">
                      <i className="bi bi-cart-fill text-success" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <h3 className="h2 fw-bold mb-3">Shop as a Customer</h3>
                    <p className="lead text-muted mb-4">
                     Customers are the reason why Affiliate Academy exists. They are the seekers, the learners,
                      the ones eager to transform their lives through valuable information. By browsing our diverse marketplace, 
                      customers can discover a treasure trove of digital products tailored to their needs and interests. 
                    </p>
                    <ul className="list-unstyled text-start mb-4">
                      <li className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Premium digital products
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Instant access after purchase
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Lifetime updates & support
                      </li>
                      <li className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Money-back guarantee
                      </li>
                    </ul>
                    {/* <a href="/register" className="btn btn-success btn-lg w-100">
                      <i className="bi bi-bag-fill me-2"></i>
                      Start Shopping
                    </a> */}
                  </div>
                  <div className="card-decoration"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/** Additional sections will go here **/}
      
      {/* FAQ Section */}
      <section className="faq-section py-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-3 animate-fade-in">
                Frequently Asked <span className="text-success">Questions</span>
              </h2>
              <p className="lead text-muted animate-fade-in-delay">
                Find answers to common questions about Affiliate Academy.
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="faq-accordion">
                <details className="faq-item animate-fade-in">
                  <summary className="faq-question">
                    <i className="bi bi-question-circle-fill me-2 text-success"></i>
                    What is Affiliate Academy?
                    <i className="bi bi-chevron-down ms-auto"></i>
                  </summary>
                  <p className="faq-answer">
                    Affiliate Academy is a dynamic digital marketplace where information is traded as a commodity. It's a platform designed to help you unlock financial freedom through affiliate marketing and digital product sales.
                  </p>
                </details>

                <details className="faq-item animate-fade-in">
                  <summary className="faq-question">
                    <i className="bi bi-question-circle-fill me-2 text-success"></i>
                    How can I become a vendor on Affiliate Academy?
                    <i className="bi bi-chevron-down ms-auto"></i>
                  </summary>
                  <p className="faq-answer">
                    To become a vendor on Affiliate Academy, you need to sign up on our platform, complete the vendor registration process, and submit your digital products for approval. Our team will review your products and guide you through the next steps.
                  </p>
                </details>

                <details className="faq-item animate-fade-in">
                  <summary className="faq-question">
                    <i className="bi bi-question-circle-fill me-2 text-success"></i>
                    What are the benefits of being a vendor on Affiliate Academy?
                    <i className="bi bi-chevron-down ms-auto"></i>
                  </summary>
                  <p className="faq-answer">
                    As a vendor, you'll enjoy access to a large customer base, real-time analytics, marketing support, secure payment processing, and the opportunity to scale your business through our affiliate network.
                  </p>
                </details>

                <details className="faq-item animate-fade-in">
                  <summary className="faq-question">
                    <i className="bi bi-question-circle-fill me-2 text-success"></i>
                    How do affiliates earn commissions on Affiliate Academy?
                    <i className="bi bi-chevron-down ms-auto"></i>
                  </summary>
                  <p className="faq-answer">
                    Affiliates earn commissions by promoting vendor products through their unique affiliate links. Each successful sale generates a commission that's automatically tracked and paid to the affiliate according to our commission structure.
                  </p>
                </details>

                <details className="faq-item animate-fade-in">
                  <summary className="faq-question">
                    <i className="bi bi-question-circle-fill me-2 text-success"></i>
                    How can I contact customer support on Affiliate Academy?
                    <i className="bi bi-chevron-down ms-auto"></i>
                  </summary>
                  <p className="faq-answer">
                    You can reach our customer support team through multiple channels: email support, live chat on our website, or through your account dashboard. We typically respond within 24-48 hours.
                  </p>
                </details>

                <details className="faq-item animate-fade-in">
                  <summary className="faq-question">
                    <i className="bi bi-question-circle-fill me-2 text-success"></i>
                    What does Affiliate Academy do?
                    <i className="bi bi-chevron-down ms-auto"></i>
                  </summary>
                  <p className="faq-answer">
                    Affiliate Academy operates as a comprehensive digital marketplace that connects vendors with affiliates and customers. We facilitate the buying, selling, and promotion of digital products while providing tools for tracking, analytics, and payment processing.
                  </p>
                </details>

                <details className="faq-item animate-fade-in">
                  <summary className="faq-question">
                    <i className="bi bi-question-circle-fill me-2 text-success"></i>
                    Are there any restrictions on the type of products that can be uploaded on Affiliate Academy?
                    <i className="bi bi-chevron-down ms-auto"></i>
                  </summary>
                  <p className="faq-answer">
                    We accept most digital products, but we do have guidelines. Products must be legal, non-fraudulent, and comply with our content policy. We don't allow products that violate copyright, contain malware, or promote illegal activities.
                  </p>
                </details>

                <details className="faq-item animate-fade-in">
                  <summary className="faq-question">
                    <i className="bi bi-question-circle-fill me-2 text-success"></i>
                    What is the process for resolving disputes between vendors and affiliates on Affiliate Academy?
                    <i className="bi bi-chevron-down ms-auto"></i>
                  </summary>
                  <p className="faq-answer">
                    We have a dedicated dispute resolution team that handles conflicts fairly. Both parties can submit their evidence and claims through the resolution center. We investigate thoroughly and make decisions based on our platform policies and evidence provided.
                  </p>
                </details>

                <details className="faq-item animate-fade-in">
                  <summary className="faq-question">
                    <i className="bi bi-question-circle-fill me-2 text-success"></i>
                    Is there a specific timeframe for vendors to receive their commissions on Affiliate Academy?
                    <i className="bi bi-chevron-down ms-auto"></i>
                  </summary>
                  <p className="faq-answer">
                    Commissions are typically processed and paid out within 30 days of the transaction. However, vendors can check their real-time earnings dashboard anytime to track pending and completed commissions.
                  </p>
                </details>

                <details className="faq-item animate-fade-in">
                  <summary className="faq-question">
                    <i className="bi bi-question-circle-fill me-2 text-success"></i>
                    Can I promote products from multiple Vendors as an affiliate on Affiliate Academy?
                    <i className="bi bi-chevron-down ms-auto"></i>
                  </summary>
                  <p className="faq-answer">
                    Absolutely! As an affiliate, you can promote products from multiple vendors. This allows you to diversify your income streams and offer a wider variety of products to your audience.
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* Contact Support CTA */}
          <div className="row justify-content-center mt-5">
            <div className="col-12 col-lg-8 text-center">
              <div className="support-cta p-4 rounded-3 bg-light">
                <h4 className="fw-bold mb-2">Still have questions?</h4>
                <p className="text-muted mb-3">Our support team is here to help you. Reach out to us anytime.</p>
                <a href="#contact" className="btn btn-success">
                  <i className="bi bi-envelope-fill me-2"></i>
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/** Additional sections will go here **/}
      
      {/* Testimonials Carousel Section */}
      <section className="testimonials-section py-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-12 col-lg-8 text-center">
              <h2 className="display-5 fw-bold mb-3 animate-fade-in">
                What Our <span className="text-success">Community Says</span>
              </h2>
              <p className="lead text-muted animate-fade-in-delay">
                Real stories from real people making passive income on Affiliate Academy
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <div className="testimonials-carousel">
                {/* Testimonial 1 */}
                <div className="testimonial-card">
                  <div className="card border-0 shadow-lg h-100">
                    <div className="testimonial-image-wrapper">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" 
                        alt="Testimonial" 
                        className="testimonial-image"
                      />
                    </div>
                    <div className="card-body text-center">
                      <div className="testimonial-rating mb-3">
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                      </div>
                      <p className="card-text mb-4">
                        "Affiliate Academy has completely transformed my income streams. The platform is so intuitive and the support team is amazing. I've earned more in 3 months than I expected in a year!"
                      </p>
                      <h5 className="fw-bold mb-1">Sarah Johnson</h5>
                      <p className="text-muted small">Digital Marketer & Affiliate</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="testimonial-card">
                  <div className="card border-0 shadow-lg h-100">
                    <div className="testimonial-image-wrapper">
                      <img 
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop" 
                        alt="Testimonial" 
                        className="testimonial-image"
                      />
                    </div>
                    <div className="card-body text-center">
                      <div className="testimonial-rating mb-3">
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                      </div>
                      <p className="card-text mb-4">
                        "As a vendor, this platform has given me access to thousands of potential customers. The commission structure is fair and the tracking system is spot on. Highly recommended!"
                      </p>
                      <h5 className="fw-bold mb-1">Marcus Williams</h5>
                      <p className="text-muted small">Content Creator & Vendor</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial 3 */}
                <div className="testimonial-card">
                  <div className="card border-0 shadow-lg h-100">
                    <div className="testimonial-image-wrapper">
                      <img 
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop" 
                        alt="Testimonial" 
                        className="testimonial-image"
                      />
                    </div>
                    <div className="card-body text-center">
                      <div className="testimonial-rating mb-3">
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                      </div>
                      <p className="card-text mb-4">
                        "The chain commission system is revolutionary! I can earn from multiple levels of referrals. This is the best passive income opportunity I've found."
                      </p>
                      <h5 className="fw-bold mb-1">Amara Okafor</h5>
                      <p className="text-muted small">Business Coach & Affiliate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="testimonials-controls mt-5">
                <button className="carousel-btn prev" onClick={() => scrollCarousel(-1)}>
                  <i className="bi bi-chevron-left"></i>
                </button>
                <button className="carousel-btn next" onClick={() => scrollCarousel(1)}>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/** Additional sections will go here **/}
      
    </div>
  );
};

export default Home;
                    
                   