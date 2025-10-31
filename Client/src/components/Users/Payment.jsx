import { useState, useEffect } from "react"
import { supabase } from "../../../supabase"
import { useUser } from "../../context/userContext"
import Sidebar from "./UserLayout/sidebar"
import Smallfooter from "./UserLayout/smallfooter"

const Payment = () => {
  const { user } = useUser()
  const [withdrawalData, setWithdrawalData] = useState({
    amount: '',
    accountDetails: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [balance, setBalance] = useState(0)
  const [loadingBalance, setLoadingBalance] = useState(true)

  // Fetch user balance from database
  const fetchBalance = async () => {
    if (!user?.id) return
    
    setLoadingBalance(true)
    try {
      const { data, error } = await supabase
        .from('user_balances')
        .select('available_balance')
        .eq('user_id', user.id)
        .single()

      if (error) {
        console.error('Error fetching balance:', error)
        setBalance(0)
      } else {
        setBalance(data?.available_balance || 0)
      }
    } catch (error) {
      console.error('Balance fetch error:', error)
      setBalance(0)
    } finally {
      setLoadingBalance(false)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [user?.id]) // eslint-disable-line react-hooks/exhaustive-deps


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setWithdrawalData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!withdrawalData.amount || !withdrawalData.accountDetails) {
      alert('Please fill in all fields')
      return
    }

    const amount = parseFloat(withdrawalData.amount)

    // Validation checks
    if (amount < 50) {
      alert('Minimum withdrawal amount is 50')
      return
    }

    if (amount > balance) {
      alert('Insufficient balance. Available balance: ' + balance.toFixed(2))
      return
    }

    if (!user?.id) {
      alert('User not authenticated')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Create withdrawal request in database
      const { error: withdrawalError } = await supabase
        .from('withdrawal_requests')
        .insert([
          {
            user_id: user.id,
            amount: amount,
            account_details: withdrawalData.accountDetails,
            status: 'pending',
            request_date: new Date().toISOString(),
            currency: 'USD' // You can make this dynamic based on user preference
          }
        ])
        .select()
        .single()

      if (withdrawalError) {
        console.error('Error creating withdrawal request:', withdrawalError)
        alert('Failed to submit withdrawal request. Please try again.')
        return
      }

      // Update user balance (subtract withdrawal amount)
      const { error: balanceError } = await supabase
        .from('user_balances')
        .update({ 
          available_balance: balance - amount,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)

      if (balanceError) {
        console.error('Error updating balance:', balanceError)
        // You might want to rollback the withdrawal request here
        alert('Error processing withdrawal. Please contact support.')
        return
      }

      // Success - refresh balance and show success message
      await fetchBalance()
      setShowSuccess(true)
      setWithdrawalData({ amount: '', accountDetails: '' })
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)

    } catch (error) {
      console.error('Withdrawal submission error:', error)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
          `}
        </style>
        <div className="container-fluid">
          {/* Header */}
          <div className="row mb-3 mb-md-4">
            <div className="col-12">
              <h2 className="mb-1 fs-3 fs-md-2">
                <i className="bi bi-credit-card me-2 text-success"></i>
                <span className="d-none d-sm-inline">Payment & Withdrawals</span>
                <span className="d-inline d-sm-none">Withdrawals</span>
              </h2>
              <p className="text-muted mb-0 small">Manage your earnings and request withdrawals</p>
            </div>
          </div>



          {/* Success Alert */}
          {showSuccess && (
            <div className="row mb-4">
              <div className="col-12">
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="bi bi-check-circle me-2"></i>
                  <strong>Success!</strong> Your withdrawal request has been submitted successfully. You'll receive an email confirmation shortly.
                  <button type="button" className="btn-close" onClick={() => setShowSuccess(false)}></button>
                </div>
              </div>
            </div>
          )}

          <div className="row justify-content-center">
            {/* Withdrawal Form */}
            <div className="col-12 col-lg-8 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0 fs-6 fs-md-5">
                    <i className="bi bi-arrow-up-circle me-2 text-primary"></i>
                    Request Withdrawal
                  </h5>
                </div>
                <div className="card-body p-3 p-md-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label htmlFor="amount" className="form-label fw-semibold">
                          <i className="bi bi-cash me-1"></i>
                          Withdrawal Amount
                        </label>
                        <input
                          type="number"
                          className="form-control form-control-lg"
                          id="amount"
                          name="amount"
                          value={withdrawalData.amount}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          min="50"
                          step="0.01"
                          required
                        />
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <div className="form-text small">Minimum withdrawal: 50.00</div>
                          <div className="text-end">
                            {loadingBalance ? (
                              <div className="d-flex align-items-center">
                                <span className="spinner-border spinner-border-sm me-2" style={{width: '12px', height: '12px'}}></span>
                                <small className="text-muted">Loading balance...</small>
                              </div>
                            ) : (
                              <div>
                                <small className="text-muted d-block">Available Balance</small>
                                <strong className="text-success fs-6">{balance.toFixed(2)}</strong>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      

                    </div>

                    <div className="mb-4">
                      <label htmlFor="accountDetails" className="form-label fw-semibold">
                        <i className="bi bi-info-circle me-1"></i>
                        Account Details
                      </label>
                      <textarea
                        className="form-control"
                        id="accountDetails"
                        name="accountDetails"
                        rows="4"
                        value={withdrawalData.accountDetails}
                        onChange={handleInputChange}
                        placeholder="Enter your account details for withdrawal (Bank details, PayPal email, Crypto wallet, etc.)"
                        required
                      />
                      <div className="form-text small">
                        Please provide accurate account information to avoid delays
                      </div>
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-lg"
                        onClick={() => setWithdrawalData({ amount: '', accountDetails: '' })}
                      >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        <span className="d-none d-sm-inline">Reset</span>
                        <span className="d-inline d-sm-none">Clear</span>
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success btn-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            <span className="d-none d-sm-inline">Processing Request...</span>
                            <span className="d-inline d-sm-none">Processing...</span>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-2"></i>
                            <span className="d-none d-sm-inline">Submit Withdrawal Request</span>
                            <span className="d-inline d-sm-none">Submit Request</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Withdrawal Info & History */}
            <div className="col-12 col-lg-4">
              {/* Recent Withdrawals */}
              <div className="card shadow-sm border-0">
                <div className="card-header bg-light py-3">
                  <h6 className="mb-0 fs-6">
                    <i className="bi bi-clock-history me-2"></i>
                    <span className="d-none d-sm-inline">Recent Withdrawals</span>
                    <span className="d-inline d-sm-none">History</span>
                  </h6>
                </div>
                <div className="card-body">
                  <div className="text-center py-3 py-md-4">
                    <i className="bi bi-database display-6 display-md-4 text-muted mb-2 mb-md-3"></i>
                    <p className="text-muted mb-0 small">Withdrawal history will be loaded from database</p>
                  </div>
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

export default Payment
