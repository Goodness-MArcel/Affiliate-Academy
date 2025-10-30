import Sidebar from "./UserLayout/sidebar"
import Smallfooter from "./UserLayout/smallfooter"


const Estates = () => {
  return (
    <div>
      <Sidebar />
      <div className="main-content" style={{ marginLeft: '0', padding: '1rem' }}>
        <style>
          {`
            @media (min-width: 768px) {
              .main-content {
                margin-left: 250px !important;
                padding: 2rem !important;
              }
            }
            
            /* Mobile responsive adjustments */
            @media (max-width: 575.98px) {
              .min-vh-75 {
                min-height: 60vh !important;
              }
              
              .display-2 {
                font-size: 2.5rem !important;
              }
              
              .h1-md {
                font-size: 1.75rem !important;
              }
              
              .h3-md {
                font-size: 1.5rem !important;
              }
              
              .fs-md-5 {
                font-size: 1rem !important;
              }
            }
            
            /* Tablet responsive adjustments */
            @media (min-width: 576px) and (max-width: 767.98px) {
              .h1-md {
                font-size: 2.25rem !important;
              }
              
              .h3-md {
                font-size: 1.75rem !important;
              }
            }
            
            /* Large screen adjustments */
            @media (min-width: 1200px) {
              .container-fluid {
                max-width: 1200px;
                margin: 0 auto;
              }
            }
          `}
        </style>
        <div className="container-fluid mt-3 mt-md-5">

          {/* Coming Soon Section */}
          <div className="row justify-content-center min-vh-75 d-flex align-items-center">
            <div className="col-12 col-sm-11 col-md-10 col-lg-10 col-xl-8">
              <div className="text-center mb-4 mb-md-5">
                <div className="position-relative">
                  <div className="bg-light rounded-circle mx-auto mb-3 mb-md-4 d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                    <i className="bi bi-building text-primary d-block d-lg-none" style={{ fontSize: '2.5rem' }}></i>
                    <i className="bi bi-building text-primary d-none d-lg-block" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <div className="position-absolute top-0 start-50 translate-middle">
                    <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
                      <i className="bi bi-gear-fill text-white" style={{ fontSize: '14px' }}></i>
                    </div>
                  </div>
                </div>
                
                <h1 className="h2 h1-md fw-bold text-dark mb-2 mb-md-3">
                  <span className="d-block d-sm-none">Real Estate</span>
                  <span className="d-none d-sm-block">Real Estate Platform</span>
                </h1>
                <h2 className="h4 h3-md text-primary mb-3 mb-md-4">Coming Soon</h2>
                <p className="text-muted mb-4 mb-md-5 px-2 px-md-5" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  We're building an advanced real estate investment platform to help you discover, analyze, and manage property investments with confidence.
                </p>
              </div>

              <div className="row g-3 g-md-4 mb-4 mb-md-5">
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="text-center p-3 p-md-4 h-100 bg-light rounded-3 border-0">
                    <div className="bg-primary bg-opacity-10 rounded-circle mx-auto mb-2 mb-md-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                      <i className="bi bi-search text-primary fs-5 d-block d-md-none"></i>
                      <i className="bi bi-search text-primary fs-4 d-none d-md-block"></i>
                    </div>
                    <h5 className="fw-semibold mb-1 mb-md-2 fs-6 fs-md-5">
                      <span className="d-block d-sm-none">Property Search</span>
                      <span className="d-none d-sm-block">Smart Property Search</span>
                    </h5>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Advanced filters and AI-powered recommendations</p>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="text-center p-3 p-md-4 h-100 bg-light rounded-3 border-0">
                    <div className="bg-success bg-opacity-10 rounded-circle mx-auto mb-2 mb-md-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                      <i className="bi bi-graph-up text-success fs-5 d-block d-md-none"></i>
                      <i className="bi bi-graph-up text-success fs-4 d-none d-md-block"></i>
                    </div>
                    <h5 className="fw-semibold mb-1 mb-md-2 fs-6 fs-md-5">Market Analytics</h5>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Real-time market trends and investment insights</p>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-4">
                  <div className="text-center p-3 p-md-4 h-100 bg-light rounded-3 border-0">
                    <div className="bg-info bg-opacity-10 rounded-circle mx-auto mb-2 mb-md-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                      <i className="bi bi-briefcase text-info fs-5 d-block d-md-none"></i>
                      <i className="bi bi-briefcase text-info fs-4 d-none d-md-block"></i>
                    </div>
                    <h5 className="fw-semibold mb-1 mb-md-2 fs-6 fs-md-5">Portfolio Management</h5>
                    <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Track performance and manage your investments</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="alert alert-primary bg-primary bg-opacity-10 border-primary border-opacity-25 d-inline-flex align-items-center mx-2 mx-md-0" role="alert">
                  <i className="bi bi-clock me-2 text-primary flex-shrink-0"></i>
                  <span className="fw-medium" style={{ fontSize: '0.9rem' }}>
                    <span className="d-block d-sm-none">In development - Stay tuned!</span>
                    <span className="d-none d-sm-block">Currently in development - Stay tuned for updates!</span>
                  </span>
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

   