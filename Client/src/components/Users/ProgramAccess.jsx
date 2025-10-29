import React, { useState, useEffect } from "react";
import Sidebar from './UserLayout/sidebar';
import Smallfooter from "./UserLayout/smallfooter";
import "./Css/Dashboard.css";

const ProgramAccess = ({ formatCurrency:  embedded = false }) => {
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

  const handleAccessProduct = () => {
        console.log("Watching video");
        alert("Watching video");
      }

  
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
        
        // Mock data - Replace with actual API data
        const mockData = [
          {
            id: 1,
            productName: 'Complete Digital Marketing Mastery Course',
            description: 'This comprehensive course covers all aspects of digital marketing including SEO, social media marketing, email marketing, content marketing, PPC advertising, analytics, and conversion optimization. You will learn how to create effective marketing strategies, build brand awareness, generate leads, and increase sales through various digital channels. The course includes practical exercises, real-world case studies, and access to premium marketing tools. Perfect for beginners and intermediate marketers looking to advance their skills.',
          },
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
                <thead className="table-light">
                  <tr>
                    <th scope="col" style={{ width: '50%' }}>Product</th>
                    <th scope="col" style={{ width: '20%' }}></th>
                    <th scope="col" style={{ width: '20%' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {purchasedProducts && purchasedProducts.length > 0 ? (
                    purchasedProducts.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="d-flex align-items-start">
                            <i className="bi bi-box-seam text-success me-3 mt-1 flex-shrink-0"></i>
                            <div className="flex-grow-1">
                              <div className="fw-semibold mb-1">{product.productName}</div>
                              {product.description && (
                                <div 
                                  className="product-content text-muted small"
                                  style={{
                                    maxHeight: '120px',
                                    overflowY: 'auto',
                                    lineHeight: '1.4',
                                    paddingRight: '8px'
                                  }}
                                >
                                  {product.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                        </td>
                        <td className="align-middle">
                          <div className="btn-group-vertical gap-1">
                            <button 
                              className="btn btn-outline-success btn-sm"
                              title="Access Product"
                              onClick={() => handleAccessProduct(product)}
                            >
                              <i className="bi bi-play-circle me-1"></i>
                              Access
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-5">
                        <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                        <h5>No purchased products yet</h5>
                        <p className="mb-0">Your purchased products will appear here once you make a purchase.</p>
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
