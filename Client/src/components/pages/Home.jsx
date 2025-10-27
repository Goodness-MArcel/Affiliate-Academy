import './Home.css';

const Home = () => {
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
                  <a href="/register" className="btn btn-success btn-lg me-3 mb-3">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional sections will go here */}
    </div>
  );
};

export default Home;
