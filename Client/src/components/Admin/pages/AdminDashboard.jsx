import React, { useState, useEffect } from 'react'
import AdminSidebar from '../adminLayout/AdminSidebar'
import { supabase } from '../../../../supabase'
import './AdminDashboard.css'

// Simple dashboard without complex currency conversion

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalBalance: 0,
    totalTransactions: 0,
    totalPayout: 0,
    recentUsers: [],
    loading: true
  });
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch dashboard analytics data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setError('');
      
      // Fetch total users count
      const { count: totalUsers, error: usersError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (usersError) {
        console.error('Error fetching users count:', usersError);
        throw usersError;
      }

      // Fetch total available balance from user_balances table
      const { data: balanceData, error: balanceError } = await supabase
        .from('user_balances')
        .select('available_balance');

      let totalAvailableBalance = 0;
      if (balanceError) {
        console.warn('Error fetching balances:', balanceError);
      } else if (balanceData) {
        totalAvailableBalance = balanceData.reduce((sum, record) => {
          return sum + (parseFloat(record.available_balance) || 0);
        }, 0);
      }

      // Fetch total withdrawal requests
      const { data: withdrawalData, error: withdrawalError } = await supabase
        .from('withdrawal_requests')
        .select('amount');

      let totalWithdrawalRequests = 0;
      if (withdrawalError) {
        console.warn('Error fetching withdrawal requests:', withdrawalError);
      } else if (withdrawalData) {
        totalWithdrawalRequests = withdrawalData.reduce((sum, record) => {
          return sum + (parseFloat(record.amount) || 0);
        }, 0);
      }

      // Fetch courses count
      const { count: totalCourses, error: coursesError } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true });

      if (coursesError) {
        console.warn('Error fetching courses:', coursesError);
      }

      // Fetch recent users (last 10)
      const { data: recentUsers, error: recentError } = await supabase
        .from('users')
        .select('id, full_name, email, created_at, payment_method, paid')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentError) {
        console.warn('Recent users query error:', recentError);
      }

      setDashboardData({
        totalUsers: totalUsers || 0,
        totalCourses: totalCourses || 0,
        totalBalance: totalAvailableBalance,
        totalTransactions: withdrawalData?.length || 0,
        totalPayout: totalWithdrawalRequests,
        recentUsers: recentUsers || [],
        loading: false
      });

      console.log('Dashboard data loaded successfully:', {
        totalUsers: totalUsers || 0,
        totalCourses: totalCourses || 0,
        totalAvailableBalance: totalAvailableBalance,
        totalWithdrawalRequests: totalWithdrawalRequests,
        recentUsersCount: recentUsers?.length || 0
      });


    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      setError('Failed to load dashboard data. Please try again.');
      setDashboardData(prev => ({ 
        ...prev, 
        loading: false 
      }));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (dashboardData.loading) {
    return (
      <div className="admin-layout d-flex">
        <AdminSidebar />
        <div className="admin-content admin-responsive-content admin-main-content flex-grow-1">
          <div className="spinner-container">
            <div className="spinner-content">
              <div className="spinner-border text-success spinner-border-custom" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading dashboard data...</p>
            </div>
          </div>
        </div>
      </div>
    );;
  }
  
  return (
    <div className="admin-layout d-flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      <div className="admin-content admin-responsive-content admin-main-content flex-grow-1">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-1">Admin Dashboard</h1>
            <p className="text-muted mb-0">Welcome back! Here's what's happening with AffiliateAcademy today.</p>

          </div>

        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        {/* Analytics Cards */}
        <div className="row g-3 mb-4">
          {/* Total Users */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="card border-0 shadow-sm h-100 analytics-card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-primary bg-opacity-10 rounded-3 p-3 analytics-icon">
                      <i className="bi bi-people-fill text-primary fs-4"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="card-title text-muted mb-1">Total Users</h6>
                    <h3 className="mb-0">{dashboardData.totalUsers.toLocaleString()}</h3>
                    <small className="text-success">
                      <i className="bi bi-people"></i> All registered users
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Courses */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="card border-0 shadow-sm h-100 analytics-card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-warning bg-opacity-10 rounded-3 p-3 analytics-icon">
                      <i className="bi bi-book-fill text-warning fs-4"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="card-title text-muted mb-1">Active Courses</h6>
                    <h3 className="mb-0">{dashboardData.totalCourses.toLocaleString()}</h3>
                    <small className="text-success">
                      <i className="bi bi-collection"></i> Available courses
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Available Balance */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="card border-0 shadow-sm h-100 analytics-card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-info bg-opacity-10 rounded-3 p-3 analytics-icon">
                      <i className="bi bi-wallet-fill text-info fs-4"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="card-title text-muted mb-1">Available Balance</h6>
                    <h3 className="mb-0">{formatCurrency(dashboardData.totalBalance)}</h3>
                    <small className="text-success">
                      <i className="bi bi-piggy-bank"></i> Total user balances
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Withdrawal Requests */}
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="card border-0 shadow-sm h-100 analytics-card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-danger bg-opacity-10 rounded-3 p-3 analytics-icon">
                      <i className="bi bi-cash-stack text-danger fs-4"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="card-title text-muted mb-1">Withdrawal Requests</h6>
                    <h3 className="mb-0">{formatCurrency(dashboardData.totalPayout)}</h3>
                    <small className="text-success">
                      <i className="bi bi-arrow-up"></i> {dashboardData.totalTransactions} requests
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Recent Users Table */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-0 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-people me-2"></i>
                    Recent Users
                  </h5>
                  <span className="badge bg-success">{dashboardData.recentUsers.length} users</span>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="border-0 ps-3">User</th>
                        <th className="border-0">Email</th>
                        <th className="border-0">Plan</th>
                        <th className="border-0">Status</th>
                        <th className="border-0">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.recentUsers.length > 0 ? (
                        dashboardData.recentUsers.map((user, index) => (
                          <tr key={user.id}>
                            <td className="ps-3">
                              <div className="d-flex align-items-center">
                                <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                                  <i className="bi bi-person-fill text-success"></i>
                                </div>
                                <div>
                                  <h6 className="mb-0">{user.full_name || 'N/A'}</h6>
                                  <small className="text-muted">ID: {user.id.slice(0, 8)}...</small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="text-muted">{user.email}</span>
                            </td>
                            <td>
                              <span className={`badge ${user.payment_method === 'premium' ? 'bg-warning' : 'bg-secondary'}`}>
                                {user.payment_method || 'Basic'}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${user.paid ? 'bg-success' : 'bg-secondary'}`}>
                                {user.paid ? 'Paid' : 'Free'}
                              </span>
                            </td>
                            <td>
                              <span className="text-muted">{formatDate(user.created_at)}</span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4 text-muted">
                            <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard