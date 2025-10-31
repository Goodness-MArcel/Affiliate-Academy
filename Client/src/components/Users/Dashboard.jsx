import Sidebar from './UserLayout/sidebar';
import "./Css/Dashboard.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Smallfooter from "./UserLayout/smallfooter";
import affiliateVideo from "../../assets/affilatevidoe.mp4";
import { useUser } from '../../context/userContext';
import { supabase } from '../../../supabase';
import Invite from './Invite.jsx';


const Dashboard = () => {
  const { user, profile } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [dashboardData, setDashboardData] = useState({
    stats: {
      todayEarning: { value: 0, change: 0, trend: 'up' },
      totalReferral: { value: 0, change: 0, trend: 'up' },
      availableBalance: { value: 0, change: 0, trend: 'up' },
      paidAmount: { value: 0, change: 0, trend: 'up' },
    }
  });

  // Get currency info from user profile
  const getCurrencyInfo = () => {
    if (!profile?.currency) {
      console.log('No currency found in profile, using USD as default');
      return { code: 'USD', symbol: '$' };
    }
    
    try {
      // Extract currency code from stored format like "USD ($)" or "NGN (₦)"
      const currencyMatch = profile.currency.match(/^([A-Z]{3})/);
      const currencyCode = currencyMatch ? currencyMatch[1] : 'USD';
      
      // Extract symbol from stored format
      const symbolMatch = profile.currency.match(/\(([^)]+)\)/);
      const currencySymbol = symbolMatch ? symbolMatch[1] : '$';
      
      console.log(`Using currency: ${currencyCode} (${currencySymbol}) from profile: ${profile.currency}`);
      return { code: currencyCode, symbol: currencySymbol };
    } catch (error) {
      console.error('Error parsing currency from profile:', error);
      return { code: 'USD', symbol: '$' };
    }
  };



  // Fetch dashboard data from Supabase
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch user balance
        const { data: balanceData, error: balanceError } = await supabase
          .from('user_balances')
          .select('available_balance')
          .eq('user_id', user.id)
          .single();

        if (balanceError && balanceError.code !== 'PGRST116') {
          console.error('Error fetching balance:', balanceError);
        }

        // Fetch referral statistics
        const { data: referralData, error: referralError } = await supabase
          .from('user_referrals')
          .select('id, is_active')
          .eq('referrer_id', user.id);

        if (referralError) {
          console.error('Error fetching referrals:', referralError);
        }

        // Fetch total commission earned
        const { data: commissionData, error: commissionError } = await supabase
          .from('referral_commissions')
          .select('amount')
          .eq('referrer_id', user.id);

        if (commissionError) {
          console.error('Error fetching commissions:', commissionError);
        }

        // Fetch total withdrawals/payouts
        const { data: payoutData, error: payoutError } = await supabase
          .from('withdrawals')
          .select('amount')
          .eq('user_id', user.id)
          .eq('status', 'completed');

        if (payoutError) {
          console.error('Error fetching payouts:', payoutError);
        }

        // Calculate stats
        const totalReferrals = referralData?.length || 0;
        const totalCommissions = commissionData?.reduce((sum, comm) => sum + (comm.amount || 0), 0) || 0;
        const totalPayouts = payoutData?.reduce((sum, payout) => sum + (payout.amount || 0), 0) || 0;
        
        setDashboardData({
          stats: {
            todayEarning: { 
              value: totalCommissions, 
              change: 0, 
              trend: totalCommissions > 0 ? 'up' : 'neutral' 
            },
            totalReferral: { 
              value: totalReferrals, 
              change: 0, 
              trend: totalReferrals > 0 ? 'up' : 'neutral' 
            },
            availableBalance: { 
              value: balanceData?.available_balance || 0, 
              change: 0, 
              trend: 'up' 
            },
            paidAmount: { 
              value: totalPayouts, 
              change: 0, 
              trend: totalPayouts > 0 ? 'up' : 'neutral' 
            },
          }
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setDashboardData({
          stats: {
            todayEarning: { value: 0, change: 0, trend: 'up' },
            totalReferral: { value: 0, change: 0, trend: 'up' },
            availableBalance: { value: 0, change: 0, trend: 'up' },
            paidAmount: { value: 0, change: 0, trend: 'up' },
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id, lastRefresh]);

  // Function to refresh dashboard data
  const refreshDashboard = () => {
    setLastRefresh(Date.now());
  };

  // Format currency using user's selected currency
  const formatCurrency = (amount) => {
    const { code, symbol } = getCurrencyInfo();
    
    // Format number with proper locale for the currency
    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
    
    // Handle different symbol positions based on currency
    if (code === 'EUR') {
      return `${formattedNumber}${symbol}`;
    } else {
      return `${symbol}${formattedNumber}`;
    }
  };



  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-main">
        <div className="dashboard-content px-2 px-md-3">
          {/* Dashboard Header */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 mb-md-4">
            <div className="mb-2 mb-sm-0">
              <h1 className="mb-0 fs-2 fs-md-1">Dashboard</h1>
            </div>
            <div className="d-flex align-items-center gap-2">
              {profile?.currency ? (
                <span 
                  className="badge bg-success-subtle text-success border border-success-subtle"
                  title={`Currency: ${profile.currency}`}
                >
                  {getCurrencyInfo().symbol} {getCurrencyInfo().code}
                </span>
              ) : (
                <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle">
                  Loading currency...
                </span>
              )}
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={refreshDashboard}
                disabled={loading}
                title="Refresh data"
              >
                <i className={`bi bi-arrow-clockwise ${loading ? 'spinner-border spinner-border-sm' : ''}`}></i>
              </button>
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
                            <p className="mb-1 small fw-semibold text-dark opacity-75">Total Commission</p>
                            <h4 className="mb-1 fw-bold text-dark">
                              {formatCurrency(dashboardData.stats.todayEarning.value)}
                            </h4>
                            <small className="text-dark opacity-75">
                              <i className={`bi bi-arrow-${dashboardData.stats.todayEarning.trend === 'up' ? 'up' : dashboardData.stats.todayEarning.trend === 'down' ? 'down' : 'dash'}`}></i> 
                              {' '}from referrals
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
                            <p className="mb-1 small fw-semibold text-dark opacity-75">Available Balance</p>
                            <h4 className="mb-1 fw-bold text-dark">
                              {formatCurrency(dashboardData.stats.availableBalance.value)}
                            </h4>
                            <small className="text-dark opacity-75">
                              <i className="bi bi-wallet2"></i> Ready to withdraw
                            </small>
                            <div className="mt-2">
                              <button 
                                className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1"
                                onClick={() => navigate('/dashboard/payment')}
                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                                disabled={dashboardData.stats.availableBalance.value <= 0}
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
