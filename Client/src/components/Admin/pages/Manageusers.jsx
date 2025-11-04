import React, { useState, useEffect } from 'react';
import AdminSidebar from '../adminLayout/AdminSidebar';
import Smallfooter from '../../Users/UserLayout/smallfooter';
import { supabase } from '../../../../supabase';


const Manageusers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const usersPerPage = 10;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchUsers();
    
    // Check sidebar state on mount and listen for changes
    const checkSidebarState = () => {
      const sidebar = document.querySelector('.admin-sidebar');
      if (sidebar) {
        setIsSidebarCollapsed(sidebar.classList.contains('collapsed'));
      }
    };

    checkSidebarState();

    // Observer to watch for sidebar class changes
    const sidebar = document.querySelector('.admin-sidebar');
    if (sidebar) {
      const observer = new MutationObserver(checkSidebarState);
      observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
      
      return () => observer.disconnect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const start = (currentPage - 1) * usersPerPage;
      const end = start + usersPerPage - 1;

      let query = supabase
        .from('users')
        .select('*, user_balances(*)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(start, end);

      if (searchQuery) {
        query = query.or(`full_name.ilike.%${searchQuery}%,username.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      setUsers(data || []);
      setTotalUsers(count || 0);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const toggleDropdown = (userId, event) => {
    if (activeDropdown === userId) {
      setActiveDropdown(null);
    } else {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.right + window.scrollX - 200
      });
      setActiveDropdown(userId);
    }
  };

  const handleBlockUser = async (user) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ is_blocked: !user.is_blocked })
        .eq('id', user.id);

      if (error) throw error;

      alert(`User ${user.is_blocked ? 'activated' : 'blocked'} successfully!`);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status');
    }
    setActiveDropdown(null);
  };

  const handleDeleteUser = async (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
    setActiveDropdown(null);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      // Delete user's balance first (if exists)
      if (userToDelete.user_balances?.[0]) {
        const { error: balanceError } = await supabase
          .from('user_balances')
          .delete()
          .eq('user_id', userToDelete.id);

        if (balanceError) console.error('Error deleting user balance:', balanceError);
      }

      // Delete the user
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userToDelete.id);

      if (error) throw error;

      alert('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="admin-layout d-flex">
      <AdminSidebar />
      
      <div 
        className="admin-content admin-responsive-content flex-grow-1 d-flex flex-column" 
        style={{ 
          backgroundColor: 'white', 
          minHeight: '100vh',
          marginLeft: windowWidth > 991 ? (isSidebarCollapsed ? '70px' : '280px') : '0',
          transition: 'margin-left 0.3s ease',
          width: windowWidth > 991 ? (isSidebarCollapsed ? 'calc(100% - 70px)' : 'calc(100% - 280px)') : '100%'
        }}
      >
        <div className="flex-grow-1 px-3">
          {/* Header */}
          <div className="mb-4 pt-3">
            <h1 className="h4 mb-1 text-dark fw-bold">Manage Users</h1>
            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>View and manage all registered users</p>
          </div>

          {/* Search and Actions */}
          <div className="row g-3 mb-4">
            <div className="col-lg-6">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search by name, username or email"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="col-lg-6 text-lg-end">
              <button className="btn btn-primary">
                <i className="bi bi-envelope me-2"></i>
                Send Message
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="card border-0 shadow-sm" style={{ 
            overflow: 'visible',
            backgroundColor: 'transparent',
            boxShadow: 'none'
          }}>
            <div className="card-body p-0" style={{
              backgroundColor: 'transparent'
            }}>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading users...</p>
                </div>
              ) : (
                <div style={{ 
                  position: 'relative',
                  overflowX: 'auto',
                  overflowY: 'visible',
                  WebkitOverflowScrolling: 'touch',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <table className="table table-hover mb-0">
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                      <tr>
                        <th className="border-0 py-3 ps-4 d-none d-md-table-cell">
                          <input type="checkbox" className="form-check-input" />
                        </th>
                        <th className="border-0 py-3">
                          <span className="d-none d-md-inline">Client Name</span>
                          <span className="d-md-none">Name</span>
                        </th>
                        <th className="border-0 py-3">Email</th>
                        <th className="border-0 py-3">
                          <span className="d-none d-md-inline">Phone</span>
                          <span className="d-md-none">Tel</span>
                        </th>
                        <th className="border-0 py-3 d-none d-md-table-cell">Status</th>
                        <th className="border-0 py-3 d-none d-md-table-cell">Date Registered</th>
                        <th className="border-0 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center py-5 text-muted">
                            No users found
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user.id}>
                            <td className="ps-4 d-none d-md-table-cell">
                              <input type="checkbox" className="form-check-input" />
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                {user.avatar_url ? (
                                  <img 
                                    src={user.avatar_url} 
                                    alt={user.full_name || 'User'}
                                    className="me-2"
                                    style={{
                                      width: '40px',
                                      height: '40px',
                                      borderRadius: '50%',
                                      objectFit: 'cover',
                                      flexShrink: 0,
                                      border: '2px solid #e9ecef'
                                    }}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.nextSibling.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                <div 
                                  className="me-2" 
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: user.avatar_url ? 'none' : 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    flexShrink: 0
                                  }}
                                >
                                  {user.full_name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="fw-medium text-dark">{user.full_name || 'N/A'}</span>
                              </div>
                            </td>
                            <td className="text-primary">{user.email || 'N/A'}</td>
                            <td className="text-muted">{user.phone_number || 'N/A'}</td>
                            <td className="d-none d-md-table-cell">
                              <span className={`badge ${user.is_blocked ? 'bg-danger' : 'bg-success'}`}>
                                {user.is_blocked ? 'Blocked' : 'Active'}
                              </span>
                            </td>
                            <td className="text-muted d-none d-md-table-cell">{formatDate(user.created_at)}</td>
                            <td>
                              <div className="dropdown" style={{ position: 'static' }}>
                                <button
                                  className="btn btn-sm btn-primary dropdown-toggle"
                                  type="button"
                                  onClick={(e) => toggleDropdown(user.id, e)}
                                >
                                  Manage
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <p className="text-muted mb-0">
                Showing {((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers} users
              </p>
              <nav>
                <ul className="pagination mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        <div className="mt-auto w-100">
          <Smallfooter />
        </div>
      </div>

      {/* Dropdown Menu - Positioned outside scroll container */}
      {activeDropdown && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1040
            }}
            onClick={() => setActiveDropdown(null)}
          />
          {users.map((user) => 
            activeDropdown === user.id ? (
              <div 
                key={user.id}
                className="dropdown-menu show" 
                style={{ 
                  position: 'fixed',
                  top: `${dropdownPosition.top}px`,
                  left: `${dropdownPosition.left}px`,
                  zIndex: 1050,
                  minWidth: '200px'
                }}
              >
                <button
                  className={`dropdown-item ${user.is_blocked ? 'text-success' : 'text-danger'}`}
                  onClick={() => handleBlockUser(user)}
                >
                  <i className={`bi ${user.is_blocked ? 'bi-check-circle' : 'bi-x-circle'} me-2`}></i>
                  {user.is_blocked ? 'Activate User' : 'Block User'}
                </button>
                <hr className="dropdown-divider" />
                <button
                  className="dropdown-item text-danger"
                  onClick={() => handleDeleteUser(user)}
                >
                  <i className="bi bi-trash me-2"></i>
                  Delete User
                </button>
              </div>
            ) : null
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '400px',
          height: '100vh',
          backgroundColor: 'white',
          boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
          zIndex: 9999,
          overflowY: 'auto',
          transform: showDeleteConfirm ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out'
        }}>
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0 text-danger">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Confirm Delete
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setUserToDelete(null);
                }}
              ></button>
            </div>
            <hr />
            
            <div className="text-center py-3">
              <i className="bi bi-trash" style={{ fontSize: '3rem', color: '#dc3545' }}></i>
              <h5 className="mt-3">Delete User Account?</h5>
              <p className="text-muted">
                Are you sure you want to permanently delete <strong>{userToDelete?.full_name || 'this user'}</strong>?
              </p>
              <div className="alert alert-danger text-start" role="alert">
                <i className="bi bi-exclamation-circle me-2"></i>
                This action cannot be undone. All user data will be permanently removed.
              </div>
            </div>
            
            <hr />
            <div className="d-flex gap-2 justify-content-end">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setUserToDelete(null);
                }}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-danger" 
                onClick={confirmDelete}
              >
                <i className="bi bi-trash me-2"></i>Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manageusers;