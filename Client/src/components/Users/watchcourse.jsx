import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './UserLayout/sidebar';
import './Css/Dashboard.css';

const WatchCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course, videoUrl } = location.state || {};

  if (!course || !videoUrl) {
    return (
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="bi bi-exclamation-triangle-fill text-warning mb-3" style={{ fontSize: '4rem' }}></i>
                <h4 className="mb-3">No Course Selected</h4>
                <p className="text-muted mb-4">Please select a course from Program Access to start watching.</p>
                <button 
                  className="btn btn-success"
                  onClick={() => navigate('/dashboard/program-access')}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Program Access
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Back Button */}
          <div className="mb-3">
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate('/dashboard/program-access')}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Courses
            </button>
          </div>

          {/* Course Header */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h3 className="mb-2">
                    <i className="bi bi-mortarboard text-success me-2"></i>
                    {course.courseName || course.title}
                  </h3>
                  {course.description && (
                    <p className="text-muted mb-0">{course.description}</p>
                  )}
                </div>
                {course.commissionRate && (
                  <span className="badge bg-success fs-6">
                    {course.commissionRate}% Commission
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="card">
            <div className="card-body p-0">
              <div className="ratio ratio-16x9" style={{ backgroundColor: '#000' }}>
                <video 
                  controls 
                  controlsList="nodownload"
                  className="w-100"
                  style={{ maxHeight: '600px', objectFit: 'contain' }}
                >
                  <source src={videoUrl} type="video/mp4" />
                  <source src={videoUrl} type="video/webm" />
                  <source src={videoUrl} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* Course Features */}
          {course.features && course.features.length > 0 && (
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="mb-3">
                  <i className="bi bi-list-check text-success me-2"></i>
                  What You'll Learn
                </h5>
                <div className="row">
                  {course.features.map((feature, index) => (
                    <div key={index} className="col-md-6 mb-2">
                      <div className="d-flex align-items-start">
                        <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                        <span>{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WatchCourse;
