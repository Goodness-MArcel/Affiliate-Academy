import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../supabase';
import AdminSidebar from '../adminLayout/AdminSidebar';
import './Manageusers.css';

const Manageusers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [emailData, setEmailData] = useState({ subject: '', message: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // Fetch users from database
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search and status
  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone_number?.includes(searchTerm)
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => {
        if (filterStatus === 'active') return user.is_active;
        if (filterStatus === 'blocked') return user.is_blocked;
        if (filterStatus === 'inactive') return !user.is_active && !user.is_blocked;
        return true;
      });
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [users, searchTerm, filterStatus]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          user_balances (
            available_balance,
            pending_balance
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Error fetching users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (action, userId, data = {}) => {
    try {
      let updateData = {};
      
      switch (action) {
        case 'activate':
          updateData = { is_active: true, is_blocked: false };
          break;
        case 'deactivate':
          updateData = { is_active: false };
          break;
        case 'block':
          updateData = { is_blocked: true, is_active: false };
          break;
        case 'unblock':
          updateData = { is_blocked: false, is_active: true };
          break;
        case 'update':
          updateData = { ...data };
          break;
        default:
          return;
      }

      // Update user table only if there's data to update
      if (Object.keys(updateData).length > 0) {
        const { error } = await supabase
          .from('users')
          .update(updateData)
          .eq('id', userId);

        if (error) throw error;
      }

      await fetchUsers();
      setShowModal(false);
      alert(`User ${action} successful!`);
    } catch (error) {
      console.error(`Error ${action} user:`, error);
      alert(`Error ${action} user: ` + error.message);
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedUsers.length === 0) {
      alert('Please select users first');
      return;
    }

    if (!window.confirm(`Are you sure you want to ${action} ${selectedUsers.length} users?`)) {
      return;
    }

    try {
      let updateData = {};
      
      switch (action) {
        case 'activate':
          updateData = { is_active: true, is_blocked: false };
          break;
        case 'deactivate':
          updateData = { is_active: false };
          break;
        case 'block':
          updateData = { is_blocked: true, is_active: false };
          break;
        default:
          return;
      }

      const { error } = await supabase
        .from('users')
        .update(updateData)
        .in('id', selectedUsers);

      if (error) throw error;

      await fetchUsers();
      setSelectedUsers([]);
      alert(`Bulk ${action} successful!`);
    } catch (error) {
      console.error(`Error bulk ${action}:`, error);
      alert(`Error bulk ${action}: ` + error.message);
    }
  };

  const handleSendEmail = async () => {
    if (!emailData.subject || !emailData.message) {
      alert('Please fill in both subject and message');
      return;
    }

    try {
      // Here you would integrate with your email service
      // For now, we'll just log the email data
      console.log('Sending email to:', selectedUsers);
      console.log('Subject:', emailData.subject);
      console.log('Message:', emailData.message);
      
      alert('Email sent successfully! (This is a demo)');
      setShowModal(false);
      setEmailData({ subject: '', message: '' });
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email: ' + error.message);
    }
  };

  const openModal = (type, user = null) => {
    setModalType(type);
    setCurrentUser(user);
    setShowModal(true);
    
    if (type === 'edit' && user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        country: user.country || '',
        payment_method: user.payment_method || '',

      });
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentUsers.map(user => user.id));
    }
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusBadge = (user) => {
    if (user.is_blocked) return <span className="badge bg-danger">Blocked</span>;
    if (user.is_active) return <span className="badge bg-success">Active</span>;
    return <span className="badge bg-secondary">Inactive</span>;
  };

  const formatCurrency = (amount, currency) => {
    // Currency symbols mapping - clean symbols only
    const currencySymbols = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'NGN': '₦',
      'GHS': '₵',
      'KES': 'KSh',
      'ZAR': 'R',
      'EGP': 'E£',
      'MAD': 'DH',
      'TND': 'د.ت',
      'XOF': 'CFA',
      'XAF': 'FCFA',
    };

    // Extract just the currency code if it contains symbols
    const cleanCurrency = currency ? currency.replace(/[^A-Z]/g, '') : 'USD';
    const symbol = currencySymbols[cleanCurrency] || '$';
    const formattedAmount = parseFloat(amount || 0).toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
    
    // Some currencies display symbol after amount
    const symbolAfterCurrencies = ['EUR', 'MAD', 'TND'];
    
    if (symbolAfterCurrencies.includes(cleanCurrency)) {
      return `${formattedAmount} ${symbol}`;
    }
    
    return `${symbol}${formattedAmount}`;
  };

  return (
    <div className="manage-users-container">
      <AdminSidebar />
      
      <div className="manage-users-content">
        <div className="container-fluid">
          {/* Header */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h2 className="page-title mb-1 custom-text-color">Manage Users</h2>
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  {selectedUsers.length > 0 && (
                    <>
                      <button 
                        className="btn btn-success btn-sm bulk-btn activate-bulk-btn"
                        onClick={() => handleBulkAction('activate')}
                      >
                        <i className="fas fa-users me-1"></i>
                        <i className="fas fa-check-circle me-1"></i>
                        Activate ({selectedUsers.length})
                      </button>
                      <button 
                        className="btn btn-warning btn-sm bulk-btn deactivate-bulk-btn"
                        onClick={() => handleBulkAction('deactivate')}
                      >
                        <i className="fas fa-users me-1"></i>
                        <i className="fas fa-pause-circle me-1"></i>
                        Deactivate ({selectedUsers.length})
                      </button>
                      <button 
                        className="btn btn-danger btn-sm bulk-btn block-bulk-btn"
                        onClick={() => handleBulkAction('block')}
                      >
                        <i className="fas fa-users me-1"></i>
                        <i className="fas fa-ban me-1"></i>
                        Block ({selectedUsers.length})
                      </button>
                      <button 
                        className="btn btn-info btn-sm bulk-btn email-bulk-btn"
                        onClick={() => openModal('email')}
                      >
                        <i className="fas fa-envelope-open me-1"></i>
                        <i className="fas fa-paper-plane me-1"></i>
                        Email ({selectedUsers.length})
                      </button>
                    </>
                  )}
                  <button className="btn btn-primary btn-sm refresh-btn" onClick={fetchUsers}>
                    <i className="fas fa-sync-alt me-1"></i>
                    Refresh Data
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select custom-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all" className="custom-option-color">All Users</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div className="col-md-3">
              <div className="form-check mt-2">
                <input
                  className="form-check-input text-white"
                  type="checkbox"
                  id="selectAll"
                  checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                  onChange={handleSelectAll}
                />
                <label className="form-check-label" htmlFor="selectAll">
                  Select All ({currentUsers.length})
                </label>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body p-0">
                  {loading ? (
                    <div className="text-center p-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-dark">
                          <tr>
                            <th>
                              <input
                                type="checkbox"
                                checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                                onChange={handleSelectAll}
                              />
                            </th>
                            <th>User Info</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Balance</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentUsers.map((user) => (
                            <tr key={user.id}>
                              <td>
                                <input
                                  type="checkbox"
                                  checked={selectedUsers.includes(user.id)}
                                  onChange={() => handleSelectUser(user.id)}
                                />
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="user-avatar me-3">
                                    <img
                                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || 'User')}&background=random&size=40`}
                                      alt="Avatar"
                                      className="rounded-circle"
                                      width="40"
                                      height="40"
                                    />
                                  </div>
                                  <div>
                                    <div className="fw-bold">{user.full_name}</div>
                                    <div className="text-muted small">
                                      <i className="fas fa-phone text-muted me-1"></i>
                                      {user.phone_number || 'No phone'}
                                    </div>
                                    <div className="text-muted small">
                                      <i className="fas fa-flag text-muted me-1"></i>
                                      {user.country}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <i className="fas fa-envelope text-muted me-2"></i>
                                  <div>
                                    <div className="fw-medium">{user.email}</div>
                                    <div className="text-muted small">
                                      Joined: {new Date(user.created_at).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>{getStatusBadge(user)}</td>
                              <td>
                                <div className="text-success fw-bold">
                                  {formatCurrency(user.user_balances?.[0]?.available_balance || 0, user.currency)}
                                </div>
                                <div className="text-warning small">
                                  Pending: {formatCurrency(user.user_balances?.[0]?.pending_balance || 0, user.currency)}
                                </div>
                              </td>
                              <td>
                                <div className="btn-group" role="group">
                                  <button
                                    className="btn btn-info btn-sm action-btn edit-btn"
                                    onClick={() => openModal('edit', user)}
                                    title="Edit User Details"
                                  >
                                    <i className="fas fa-user-edit me-1"></i>
                                    <span className="btn-text">Edit</span>
                                  </button>
                                  {user.is_active ? (
                                    <button
                                      className="btn btn-warning btn-sm action-btn deactivate-btn"
                                      onClick={() => handleUserAction('deactivate', user.id)}
                                      title="Deactivate User Account"
                                    >
                                      <i className="fas fa-user-slash me-1"></i>
                                      <span className="btn-text">Deactivate</span>
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-success btn-sm action-btn activate-btn"
                                      onClick={() => handleUserAction('activate', user.id)}
                                      title="Activate User Account"
                                    >
                                      <i className="fas fa-user-check me-1"></i>
                                      <span className="btn-text">Activate</span>
                                    </button>
                                  )}
                                  {user.is_blocked ? (
                                    <button
                                      className="btn btn-primary btn-sm action-btn unblock-btn"
                                      onClick={() => handleUserAction('unblock', user.id)}
                                      title="Unblock User Account"
                                    >
                                      <i className="fas fa-unlock-alt me-1"></i>
                                      <span className="btn-text">Unblock</span>
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-danger btn-sm action-btn block-btn"
                                      onClick={() => handleUserAction('block', user.id)}
                                      title="Block User Account"
                                    >
                                      <i className="fas fa-user-lock me-1"></i>
                                      <span className="btn-text">Block</span>
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="row mt-4">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <div className="pagination-info text-muted">
                    Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
                  </div>
                  <nav aria-label="User pagination">
                    <ul className="pagination mb-0">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <i className="fas fa-chevron-left"></i> Previous
                        </button>
                      </li>
                      
                      {/* Smart pagination - show limited page numbers */}
                      {(() => {
                        const pages = [];
                        const maxVisiblePages = 5;
                        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                        
                        // Adjust if we're at the end
                        if (endPage - startPage + 1 < maxVisiblePages) {
                          startPage = Math.max(1, endPage - maxVisiblePages + 1);
                        }
                        
                        // First page
                        if (startPage > 1) {
                          pages.push(
                            <li key={1} className="page-item">
                              <button className="page-link" onClick={() => paginate(1)}>1</button>
                            </li>
                          );
                          if (startPage > 2) {
                            pages.push(
                              <li key="ellipsis1" className="page-item disabled">
                                <span className="page-link">...</span>
                              </li>
                            );
                          }
                        }
                        
                        // Visible pages
                        for (let i = startPage; i <= endPage; i++) {
                          pages.push(
                            <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                              <button className="page-link" onClick={() => paginate(i)}>
                                {i}
                              </button>
                            </li>
                          );
                        }
                        
                        // Last page
                        if (endPage < totalPages) {
                          if (endPage < totalPages - 1) {
                            pages.push(
                              <li key="ellipsis2" className="page-item disabled">
                                <span className="page-link">...</span>
                              </li>
                            );
                          }
                          pages.push(
                            <li key={totalPages} className="page-item">
                              <button className="page-link" onClick={() => paginate(totalPages)}>
                                {totalPages}
                              </button>
                            </li>
                          );
                        }
                        
                        return pages;
                      })()}
                      
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next <i className="fas fa-chevron-right"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalType === 'edit' ? 'Edit User' : 'Send Email'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {modalType === 'edit' ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleUserAction('update', currentUser.id, formData);
                  }}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.full_name}
                          onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.phone_number}
                          onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Payment Method</label>
                        <select
                          className="form-control"
                          value={formData.payment_method}
                          onChange={(e) => setFormData({...formData, payment_method: e.target.value})}
                        >
                          <option value="">Select Payment Method</option>
                          <option value="paystack">Paystack</option>
                          <option value="bank_transfer">Bank Transfer</option>
                          <option value="mobile_money">Mobile Money</option>
                        </select>
                      </div>

                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Update User
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="mb-3">
                      <label className="form-label">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        value={emailData.subject}
                        onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                        placeholder="Email subject"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        rows="6"
                        value={emailData.message}
                        onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                        placeholder="Email message"
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">
                        This email will be sent to {selectedUsers.length} selected user(s)
                      </small>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                        Cancel
                      </button>
                      <button type="button" className="btn btn-primary" onClick={handleSendEmail}>
                        Send Email
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manageusers;
