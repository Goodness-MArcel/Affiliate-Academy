import Sidebar from "./UserLayout/sidebar"
import Smallfooter from "./UserLayout/smallfooter"


const Estates = () => {
  return (
    <div>
      <Sidebar />
      <div className="main-content" style={{ marginLeft: '250px', padding: '2rem' }}>
        <div className="container-fluid mt-5">

          {/* Coming Soon Section */}
          <div className="row justify-content-center min-vh-75 d-flex align-items-center">
            <div className="col-lg-10 col-xl-8">
              <div className="text-center mb-5">
                <div className="position-relative">
                  <div className="bg-light rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                    <i className="bi bi-building display-2 text-primary"></i>
                  </div>
                  <div className="position-absolute top-0 start-50 translate-middle">
                    <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }}>
                      <i className="bi bi-gear-fill text-white" style={{ fontSize: '14px' }}></i>
                    </div>
                  </div>
                </div>
                
                <h1 className="display-4 fw-bold text-dark mb-3">Real Estate Platform</h1>
                <h2 className="text-primary mb-4">Coming Soon</h2>
                <p className="lead text-muted mb-5 px-md-5">
                  We're building an advanced real estate investment platform to help you discover, analyze, and manage property investments with confidence.
                </p>
              </div>

              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="text-center p-4 h-100 bg-light rounded-3 border-0">
                    <div className="bg-primary bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-search text-primary fs-4"></i>
                    </div>
                    <h5 className="fw-semibold mb-2">Smart Property Search</h5>
                    <p className="text-muted small mb-0">Advanced filters and AI-powered recommendations</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-4 h-100 bg-light rounded-3 border-0">
                    <div className="bg-success bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-graph-up text-success fs-4"></i>
                    </div>
                    <h5 className="fw-semibold mb-2">Market Analytics</h5>
                    <p className="text-muted small mb-0">Real-time market trends and investment insights</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center p-4 h-100 bg-light rounded-3 border-0">
                    <div className="bg-info bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                      <i className="bi bi-briefcase text-info fs-4"></i>
                    </div>
                    <h5 className="fw-semibold mb-2">Portfolio Management</h5>
                    <p className="text-muted small mb-0">Track performance and manage your investments</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="alert alert-primary bg-primary bg-opacity-10 border-primary border-opacity-25 d-inline-flex align-items-center" role="alert">
                  <i className="bi bi-clock me-2 text-primary"></i>
                  <span className="fw-medium">Currently in development - Stay tuned for updates!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-space mt-4">
        <Smallfooter />
      </div>
    </div>
  )
}

export default Estates

   