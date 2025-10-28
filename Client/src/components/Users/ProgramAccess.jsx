import React, { useState, useEffect } from "react";
import Sidebar from './UserLayout/sidebar';
import Smallfooter from "./UserLayout/smallfooter";
import "./Css/Dashboard.css";

const ProgramAccess = ({ formatCurrency: parentFormatCurrency, embedded = false }) => {
  const [loading, setLoading] = useState(true);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

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

  // Format currency based on selected currency
  const formatCurrency = (amount) => {
    // Use parent's formatCurrency if embedded, otherwise use own
    if (embedded && parentFormatCurrency) {
      return parentFormatCurrency(amount);
    }
    const currency = currencies.find(c => c.code === selectedCurrency);
    return `${currency.symbol}${amount.toLocaleString()}`;
  };

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with actual API call
        // const response = await fetch('/api/purchased-products', {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data = await response.json();
        
        // Mock data
        const mockData = [
          // { id: 1, productName: 'Product 1', amount: 100, date: '2024-01-15', status: 'completed' },
        ];

        await new Promise(resolve => setTimeout(resolve, 500));
        
        setPurchasedProducts(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching purchased products:', error);
        setLoading(false);
      }
    };

    fetchPurchasedProducts();
  }, []);

  // Content to display (table section)
  const tableContent = (
    <>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading purchased products...</p>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Purchased Products</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {purchasedProducts && purchasedProducts.length > 0 ? (
                    purchasedProducts.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className="bi bi-box-seam text-success me-2"></i>
                            <span className="fw-semibold">{product.productName}</span>
                          </div>
                        </td>
                        <td>{formatCurrency(product.amount)}</td>
                        <td>{new Date(product.date).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${product.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                            {product.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                        No purchased products yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
            </div>
            <div>
              <select 
                className="form-select form-select-sm currency-select" 
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                style={{ width: 'auto', minWidth: '80px', fontSize: '0.85rem' }}
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading purchased products...</p>
            </div>
          ) : (
            <div className="container-fluid px-0">
              {tableContent}
            </div>
          )}
        </div>
      </main>

      <div className="footer-space">
        <Smallfooter />
      </div>
    </div>
  )
}

export default ProgramAccess
