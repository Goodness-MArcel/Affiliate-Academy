import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { supabase } from '../../../supabase';
// import { useUser } from '../../context/userContext';
import { useAuth } from '../../context/AuthProvider';
import Sidebar from './UserLayout/sidebar';
import Smallfooter from "./UserLayout/smallfooter";
import "./Css/Dashboard.css";

const ProgramAccess = ({ embedded = false }) => {
  const [loading, setLoading] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { user } = useAuth();

  // Save selected courses to database
  const saveSelectedCourses = async (courses) => {
    if (!user?.id) return;
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          selected_course: JSON.stringify(courses),
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error saving selected courses:', error);
      }
    } catch (error) {
      console.error('Error saving courses to database:', error);
    }
  };

  // Add a new course to the selected courses list
  const addSelectedCourse = async (newCourse) => {
    if (!user?.id || !newCourse) return;

    setSelectedCourses(prevCourses => {
      // Check if course already exists (prevent duplicates)
      const existingCourse = prevCourses.find(course => course.id === newCourse.id);
      
      let updatedCourses;
      if (existingCourse) {
        // Course exists, update it instead of adding duplicate
        updatedCourses = prevCourses.map(course => 
          course.id === newCourse.id ? newCourse : course
        );
        console.log("Updated existing course:", newCourse.courseName);
      } else {
        // Add new course to the beginning of the list
        updatedCourses = [newCourse, ...prevCourses];
        console.log("Added new course:", newCourse.courseName);
      }

      // Save to database
      saveSelectedCourses(updatedCourses);
      
      return updatedCourses;
    });
  };

  // Load selected courses from database
  const loadSelectedCourses = async () => {
    if (!user?.id) return [];
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('selected_course')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error loading selected courses:', error);
        return [];
      }

      if (data?.selected_course) {
        const parsed = JSON.parse(data.selected_course);
        // Handle both single course (old format) and array (new format)
        return Array.isArray(parsed) ? parsed : [parsed];
      }
      return [];
    } catch (error) {
      console.error('Error loading courses from database:', error);
      return [];
    }
  };

  // Remove a specific course from the list
  const removeCourse = async (courseId) => {
    if (!user?.id) return;
    
    setSelectedCourses(prevCourses => {
      const updatedCourses = prevCourses.filter(course => course.id !== courseId);
      
      // Save to database
      if (updatedCourses.length === 0) {
        // If no courses left, clear the database field
        clearAllCourses();
      } else {
        saveSelectedCourses(updatedCourses);
      }
      
      return updatedCourses;
    });
  };

  // Clear all selected courses from database
  const clearAllCourses = async () => {
    if (!user?.id) return;
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          selected_course: null,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error clearing selected courses:', error);
      } else {
        setSelectedCourses([]);
      }
    } catch (error) {
      console.error('Error clearing courses from database:', error);
    }
  };

  const handleAccessProduct = (course) => {
    console.log("Accessing course:", course.courseName);
    alert(`Starting ${course.courseName} course`);
  }

  useEffect(() => {
    const initializeCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, load existing courses from database
        const savedCourses = await loadSelectedCourses();
        setSelectedCourses(savedCourses);
        
        // Then, check if there's a new course from navigation state (from Products page)
        const courseFromState = location.state?.selectedCourse;
        
        if (courseFromState) {
          // Add/update the new course to the existing list
          await addSelectedCourse(courseFromState);
          console.log("Added course from Products:", courseFromState.courseName);
        } else if (savedCourses.length > 0) {
          console.log("Loaded", savedCourses.length, "courses from database");
        } else {
          console.log("No courses selected - showing empty state");
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error initializing courses:', error);
        setError('Failed to load course information');
        setLoading(false);
      }
    };

    // Only initialize if user is available
    if (user) {
      initializeCourses();
    } else {
      setLoading(false);
    }
  }, [location.state, user]);

  // Content to display (table section)
  const tableContent = (
    <>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading course...</p>
        </div>
      ) : error ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="bi bi-exclamation-triangle-fill text-warning mb-3" style={{ fontSize: '4rem' }}></i>
            <h4 className="mb-3 text-warning">Error Loading Course</h4>
            <p className="text-muted mb-4">{error}</p>
            <button 
              className="btn btn-outline-success"
              onClick={() => window.location.reload()}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Try Again
            </button>
          </div>
        </div>
      ) : selectedCourses.length > 0 ? (
        <div className="row g-4">
          {selectedCourses.map((course, index) => (
            <div key={course.id || index} className="col-12">
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="bi bi-mortarboard text-success me-2"></i>
                    {course.courseName}
                  </h5>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="badge bg-success">Ready to Access</span>
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeCourse(course.id)}
                      title="Remove this course"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-8">
                      {course.description && (
                        <div className="course-description text-muted mb-3" style={{ lineHeight: '1.6' }}>
                          {course.description}
                        </div>
                      )}
                      
                      {/* Course Features */}
                      {course.features && course.features.length > 0 && (
                        <div className="mb-3">
                          <h6 className="fw-semibold mb-2">Course Features:</h6>
                          <div className="row">
                            {course.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="col-md-6 mb-1">
                                <small>
                                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                                  {feature}
                                </small>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Course Stats */}
                      <div className="row g-2">
                        {course.price && (
                          <div className="col-6 col-md-4">
                            <div className="text-center p-2 bg-light rounded">
                              <div className="fw-bold text-success small">${course.price}</div>
                              <small className="text-muted">Price</small>
                            </div>
                          </div>
                        )}
                        {course.commissionRate && (
                          <div className="col-6 col-md-4">
                            <div className="text-center p-2 bg-light rounded">
                              <div className="fw-bold text-primary small">{course.commissionRate}%</div>
                              <small className="text-muted">Commission</small>
                            </div>
                          </div>
                        )}
                        <div className="col-6 col-md-4">
                          <div className="text-center p-2 bg-light rounded">
                            <div className="fw-bold text-info small">Active</div>
                            <small className="text-muted">Status</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-lg-4">
                      <div className="text-center h-100 d-flex flex-column justify-content-center">
                        <div className="mb-3">
                          <i className="bi bi-play-btn-fill text-success" style={{ fontSize: '3rem' }}></i>
                        </div>
                        <button 
                          className="btn btn-success w-100 mb-2"
                          title="Start Course"
                          onClick={() => handleAccessProduct(course)}
                        >
                          <i className="bi bi-play-circle me-2"></i>
                          Start Course
                        </button>
                        <small className="text-muted">
                          Begin learning now
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="bi bi-mortarboard-fill text-muted mb-3" style={{ fontSize: '4rem' }}></i>
            <h4 className="mb-3">No Courses Selected</h4>
            <p className="text-muted mb-4">
              Select courses from the Products page to build your learning library here.
            </p>
            <button 
              className="btn btn-outline-success"
              onClick={() => window.history.back()}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Go to Products
            </button>
          </div>
        </div>
      )}
    </>
  );

  // If embedded, return only the content
  if (embedded) {
    return tableContent;
  }

  // Otherwise, return full layout
  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-main">
        <div className="dashboard-content">
          {/* Page Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="mb-0">Program Access</h1>
              {selectedCourses.length > 0 && (
                <p className="text-muted mb-0 mt-1">
                  {selectedCourses.length} course{selectedCourses.length > 1 ? 's' : ''} ready for access
                </p>
              )}
            </div>
            {selectedCourses.length > 0 && (
              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={clearAllCourses}
                title="Clear all courses"
              >
                <i className="bi bi-trash me-1"></i>
                Clear All
              </button>
            )}
          </div>

          <div className="container-fluid px-0">
            {tableContent}
          </div>
        </div>
      </main>

      <div className="footer-space">
        <Smallfooter />
      </div>
    </div>
  )
}

export default ProgramAccess
