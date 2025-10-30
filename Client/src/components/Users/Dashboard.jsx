import Sidebar from './UserLayout/sidebar';
import "./Css/Dashboard.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Smallfooter from "./UserLayout/smallfooter";
import affiliateVideo from "../../assets/affilatevidoe.mp4";
import { useUser } from '../../context/userContext';
import Invite from './Invite.jsx';


const Dashboard = () => {
  const {logout} = useUser();
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      todayEarning: { value: 0, change: 0, trend: 'up' },
      totalReferral: { value: 0, change: 0, trend: 'up' },
      payout: { value: 0, change: 0, trend: 'up' },
      paidAmount: { value: 0, change: 0, trend: 'up' },
    }
  });

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
    { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  ];

  // TODO: Replace with actual API call
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call - Replace with actual fetch to your backend
        // const response = await fetch('/api/dashboard/stats', {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        
        // Mock data - Remove this when connecting to real API
        const mockData = {
          stats: {
            todayEarning: { value: 0, change: 0, trend: 'up' },
            totalReferral: { value: 0, change: 0, trend: 'up' },
            payout: { value: 0, change: 0, trend: 'up' },
            paidAmount: { value: 0, change: 0, trend: 'up' },
            requestedAmount: { value: 0, change: 0, trend: 'neutral' }
          }
        };

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setDashboardData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedCurrency]); // Refetch when currency changes

  // Format currency based on selected currency
  const formatCurrency = (amount) => {
    const currency = currencies.find(c => c.code === selectedCurrency);
    return `${currency.symbol}${amount.toLocaleString()}`;
  };



  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-main">
        <div className="dashboard-content px-2 px-md-3">
          {/* Dashboard Header with Currency Selector */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 mb-md-4">
            <div className="mb-2 mb-sm-0">
              <h1 className="mb-0 fs-2 fs-md-1">Dashboard</h1>
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <select 
                  id="currencySelect"
                  className="form-select form-select-sm currency-select" 
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  style={{ width: 'auto', minWidth: '70px', fontSize: '0.8rem' }}
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} 
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-4 py-md-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted small">Loading dashboard data...</p>
            </div>
          ) : (
            <>
            {/* Video Banner - Mobile Only */}
            <div className="card mb-3 d-lg-none">
              <video 
                src={affiliateVideo}
                className="card-img-top"
                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px', display: 'block' }}
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

           
            
              {/* Stats Cards Row */}
              <div className="container-fluid px-0">
                <div className="row g-3 mb-4">
                  <div className="col-12 col-lg-6">
                    <div className="card stat-card h-100 bg-success text-dark">
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="flex-grow-1">
                            <p className="mb-1 small fw-semibold text-dark opacity-75">Total Earning</p>
                            <h4 className="mb-1 fw-bold text-dark">
                              {formatCurrency(dashboardData.stats.todayEarning.value)}
                            </h4>
                            <small className="text-dark opacity-75">
                              <i className={`bi bi-arrow-${dashboardData.stats.todayEarning.trend === 'up' ? 'up' : 'down'}`}></i> 
                              {' '}earnings
                            </small>
                          </div>
                          <div className="stat-icon-small bg-white bg-opacity-25 text-dark">
                            <i className="bi bi-cash-coin"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6">
                    <div className="card stat-card h-100 bg-success text-dark">
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="flex-grow-1">
                            <p className="mb-1 small fw-semibold text-dark opacity-75">Total Referral</p>
                            <h4 className="mb-1 fw-bold text-dark">
                              {dashboardData.stats.totalReferral.value}
                            </h4>
                            <small className="text-dark opacity-75">
                              <i className={`bi bi-arrow-${dashboardData.stats.totalReferral.trend === 'up' ? 'up' : 'down'}`}></i> 
                              {' '}All time referrals
                            </small>
                          </div>
                          <div className="stat-icon-small bg-white bg-opacity-25 text-dark">
                            <i className="bi bi-people"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6">
                    <div className="card stat-card h-100 bg-success text-dark">
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="flex-grow-1">
                            <p className="mb-1 small fw-semibold text-dark opacity-75">Balance</p>
                            <h4 className="mb-1 fw-bold text-dark">
                              {formatCurrency(dashboardData.stats.payout.value)}
                            </h4>
                            <small className="text-dark opacity-75">
                              <i className="bi bi-wallet2"></i> Available balance
                            </small>
                            <div className="mt-2">
                              <button 
                                className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1"
                                onClick={() => navigate('/dashboard/payment')}
                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                              >
                                <i className="bi bi-arrow-up-circle" style={{ fontSize: '0.8rem' }}></i>
                                Withdraw
                              </button>
                            </div>
                          </div>
                          <div className="stat-icon-small bg-white bg-opacity-25 text-dark">
                            <i className="bi bi-wallet2"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6">
                    <div className="card stat-card h-100 bg-success text-dark">
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="flex-grow-1">
                            <p className="mb-1 small fw-semibold text-dark opacity-75">Paid Amount</p>
                            <h4 className="mb-1 fw-bold text-dark">
                              {formatCurrency(dashboardData.stats.paidAmount.value)}
                            </h4>
                            <small className="text-dark opacity-75">
                              <i className="bi bi-check-circle"></i> Total paid out
                            </small>
                          </div>
                          <div className="stat-icon-small bg-white bg-opacity-25 text-dark">
                            <i className="bi bi-check-circle"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                
              {/* Invite Section - Full Width */}
              <div className="mt-4">
                        <Invite embedded={true} />
              </div>
            </>
          )}
        </div>
      </main>
        <div className="footer-space">
            <Smallfooter />
        </div>
    </div>
  );
};

export default Dashboard;
