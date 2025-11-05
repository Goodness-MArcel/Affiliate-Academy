  import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./UserLayout/sidebar";
import Smallfooter from "./UserLayout/smallfooter";
// import { useUser } from "../../context/userContext";
import { useAuth } from "../../context/AuthProvider";
import { supabase } from "../../../supabase";
import "./Css/Dashboard.css";

const Products = () => {
  console.log('Products component rendering...');
  
const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [copiedLinks, setCopiedLinks] = useState({});
  const [loading, setLoading] = useState(true);
  
  console.log('Products state - loading:', loading, 'courses count:', courses.length, 'user:', user?.id);

  // Fetch ALL courses from Supabase database (no conditions)
  const fetchCourses = React.useCallback(async () => {
    try {
      console.log(' Fetching courses from database...');
      const { data, error } = await supabase
        .from('courses') // Fetch from courses table
        .select('*'); // Select all columns, no conditions, no ordering
      
      if (error) {
        console.error(' Database error:', error);
        throw error;
      }
      
      console.log('Raw courses data:', data);
      console.log('Number of courses found:', data?.length || 0);

      // Set ALL courses regardless of status or any other condition
      setCourses(data || []);
      
      if (data && data.length > 0) {
        console.log(' Successfully loaded', data.length, 'courses');
        console.log(' Sample course:', data[0]);
      } else {
        console.warn(' No courses found in database table');
      }
    } catch (error) {
      console.error(' Error fetching courses:', error);
      setCourses([]);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading products data...');
        setLoading(true);
        
        // Fetch courses from Supabase database
        await fetchCourses();
        
        setLoading(false);
        console.log('Data loading completed');
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, [user?.id, fetchCourses]);

  // Handle Get Started - Navigate to program access for course enrollment
  const handleGetStarted = (course) => {
    // Navigate to program access where enrollment will be handled
    navigate('/dashboard/program-access', { state: { selectedCourse: course } });
  };

  // Generate referral link for course
  const generateReferralLink = (courseId) => {
    return `${window.location.origin}/course/${courseId}?ref=${user?.id}`;
  };

  // Copy referral link to clipboard
  const copyReferralLink = (courseId) => {
    const referralLink = generateReferralLink(courseId);
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopiedLinks(prev => ({
        ...prev,
        [courseId]: true
      }));
      
      // Reset copied state after 3 seconds
      setTimeout(() => {
        setCopiedLinks(prev => ({
          ...prev,
          [courseId]: false
        }));
      }, 3000);
    });
  };





  return (
    <div className="dashboard-container d-flex">
      <Sidebar />

      {/* Main Content Area */}
      <div className="dashboard-main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {/* Header Section */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="mb-1 fw-bold">
                    <i className="bi bi-box-seam text-primary me-2"></i>
                    Course Marketplace
                  </h4>
                  <p className="text-muted mb-0">Share courses and earn commissions for every sale</p>
                </div>
              </div>

              {/* Products Table */}
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading available courses...</p>
                </div>
              ) : (
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Available Courses</h5>
                  </div>
                  <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead className="table-light">
                        <tr>
                          <th scope="col" style={{ width: '50%' }}>Course</th>
                          <th scope="col" style={{ width: '15%' }}>Commission</th>
                          <th scope="col" style={{ width: '20%' }}>Referral Link</th>
                          <th scope="col" style={{ width: '15%' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses && courses.length > 0 ? (
                          courses.map((course) => (
                            <tr key={course.id}>
                              <td>
                                <div className="d-flex align-items-start">
                                  <i className="bi bi-box-seam text-success me-3 mt-1 flex-shrink-0"></i>
                                  <div className="flex-grow-1">
                                    <div className="fw-semibold mb-1">{course.title}</div>
                                    <span className="badge bg-primary bg-opacity-10 text-primary me-2 mb-2">
                                      {course.category}
                                    </span>
                                    {course.description && (
                                      <div 
                                        className="product-content text-muted small mb-2"
                                        style={{
                                          maxHeight: '120px',
                                          overflowY: 'auto',
                                          lineHeight: '1.4',
                                          paddingRight: '8px'
                                        }}
                                      >
                                        {course.description}
                                      </div>
                                    )}
                                    {course.features && course.features.length > 0 && (
                                      <div className="mb-2">
                                        <small className="text-muted d-block mb-1">What you'll learn:</small>
                                        <ul className="list-unstyled mb-0">
                                          {course.features.slice(0, 3).map((feature, index) => (
                                            <li key={index} className="small text-muted mb-1">
                                              <i className="bi bi-check-circle text-success me-2"></i>
                                              {feature}
                                            </li>
                                          ))}
                                          {course.features.length > 3 && (
                                            <li className="small text-muted">
                                              <i className="bi bi-plus-circle me-2"></i>
                                              +{course.features.length - 3} more topics
                                            </li>
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="align-middle">
                                <span className="text-muted">
                                  {course.commission}%
                                </span>
                              </td>
                              <td className="align-middle">
                                <div className="input-group input-group-sm">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={generateReferralLink(course.id)}
                                    readOnly
                                    style={{ fontSize: '10px' }}
                                  />
                                  <button 
                                    className={`btn ${copiedLinks[course.id] ? 'btn-success' : 'btn-outline-secondary'}`}
                                    onClick={() => copyReferralLink(course.id)}
                                    title="Copy Link"
                                  >
                                    <i className={`bi ${copiedLinks[course.id] ? 'bi-check-lg' : 'bi-copy'}`}></i>
                                  </button>
                                </div>
                              </td>
                              <td className="align-middle">
                                <div className="btn-group-vertical gap-1">
                                  <button 
                                    className="btn btn-outline-success btn-sm"
                                    title="Get Started"
                                    onClick={() => handleGetStarted(course)}
                                  >
                                    <i className="bi bi-play-circle me-1"></i>
                                    Get Started
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center text-muted py-5">
                              <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                              <h5>No courses available yet</h5>
                              <p className="mb-0">Courses will appear here once admin adds them to the marketplace.</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  </div>
                </div>
              )}

              {/* No Courses Message */}
              {!loading && courses.length === 0 && (
                <div className="text-center py-5">
                  <div className="display-1 text-muted mb-3">
                    <i className="bi bi-box-seam"></i>
                  </div>
                  <h5 className="text-muted">No courses available in this category</h5>
                  <p className="text-muted">Try selecting a different category or check back later for new courses.</p>
                </div>
              )}

              {/* How It Works Section */}
              <div className="card border-0 shadow-sm mt-4">
                <div className="card-header bg-white border-0">
                  <h6 className="mb-0 fw-bold">
                    <i className="bi bi-info-circle text-info me-2"></i>
                    How Affiliate Commissions Work
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <div className="text-center">
                        <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '50px', height: '50px' }}>
                          <i className="bi bi-share text-primary"></i>
                        </div>
                        <h6 className="fw-semibold">1. Share</h6>
                        <small className="text-muted">Copy your unique referral link for any course</small>
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <div className="text-center">
                        <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '50px', height: '50px' }}>
                          <i className="bi bi-person-plus text-success"></i>
                        </div>
                        <h6 className="fw-semibold">2. Refer</h6>
                        <small className="text-muted">Share with friends, social media, or your audience</small>
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <div className="text-center">
                        <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '50px', height: '50px' }}>
                          <i className="bi bi-cart-check text-warning"></i>
                        </div>
                        <h6 className="fw-semibold">3. Sale</h6>
                        <small className="text-muted">Someone purchases using your link</small>
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <div className="text-center">
                        <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '50px', height: '50px' }}>
                          <i className="bi bi-cash-stack text-info"></i>
                        </div>
                        <h6 className="fw-semibold">4. Earn</h6>
                        <small className="text-muted">Receive 25-45% commission on every sale</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="footer-space mt-4">
            <Smallfooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
