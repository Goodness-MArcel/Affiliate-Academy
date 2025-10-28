import Sidebar from './UserLayout/sidebar';
import "./Css/Dashboard.css";
import React, { useState, useEffect } from "react";
import affiliateVideo from "../../assets/affilatevidoe.mp4";

const Dashboard = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      todayEarning: { value: 0, change: 0, trend: 'up' },
      totalReferral: { value: 0, change: 0, trend: 'up' },
      payout: { value: 0, change: 0, trend: 'up' },
      paidAmount: { value: 0, change: 0, trend: 'up' },
    },
    recentSales: []
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
          },
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
        <div className="dashboard-content">
          {/* Dashboard Header with Currency Selector */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h1 className="mb-0">Dashboard</h1>
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                {/* <label htmlFor="currencySelect" className="mb-0 fw-semibold text-muted">
                  Currency:
                </label> */}
                <select 
                  id="currencySelect"
                  className="form-select currency-select" 
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  style={{ width: 'auto', minWidth: '10px' }}
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading dashboard data...</p>
            </div>
          ) : (
            <>
            <div className="card mb-3">
              <video 
                src={affiliateVideo}
                className="card-img-top"
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
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
                            <p className="mb-1 small fw-semibold text-dark opacity-75">Today Earning</p>
                            <h4 className="mb-1 fw-bold text-dark">
                              {formatCurrency(dashboardData.stats.todayEarning.value)}
                            </h4>
                            <small className="text-dark opacity-75">
                              <i className={`bi bi-arrow-${dashboardData.stats.todayEarning.trend === 'up' ? 'up' : 'down'}`}></i> 
                              {' '}Today's earnings
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
                            <p className="mb-1 small fw-semibold text-dark opacity-75">Payout</p>
                            <h4 className="mb-1 fw-bold text-dark">
                              {formatCurrency(dashboardData.stats.payout.value)}
                            </h4>
                            <small className="text-dark opacity-75">
                              <i className="bi bi-wallet2"></i> Available balance
                            </small>
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
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
