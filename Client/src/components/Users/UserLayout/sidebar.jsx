import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // TODO: Replace with actual user data from database/context
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    role: 'Affiliate'
  };

  const menuItems = [
    { title: 'Home', icon: 'bi-house-door', path: '/dashboard'},
    { title: 'Program Access', icon: 'bi-unlock', path: '/dashboard/program-access' },
    { title: 'Profile', icon: 'bi-person-circle', path: '/dashboard/profile' },
    { title: 'Achievement', icon: 'bi-trophy', path: '/dashboard/achievement' },
    { title: 'Product', icon: 'bi-box-seam', path: '/dashboard/product' },
    { title: 'Real Estate', icon: 'bi-house', path: '/dashboard/real-estate' },
    { title: 'Payment', icon: 'bi-credit-card', path: '/dashboard/payment' },
    { title: 'Invite', icon: 'bi-person-plus', path: '/dashboard/invite' },
    { title: 'Logout', icon: 'bi-box-arrow-right', path: '/logout' },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="top-navbar">
        <div className="navbar-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
          </button>
          <div className="navbar-brand">
            <span className="brand-text">Affiliate Academy</span>
          </div>
        </div>

        <div className="navbar-right">
          {/* Notifications */}
          <button className="nav-icon-btn">
            <i className="bi bi-bell"></i>
            <span className="notification-badge">3</span>
          </button>

          {/* Profile Picture Only */}
          <div className="profile-picture">
            <img src={user.avatar} alt={user.name} className="profile-avatar" />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          {/* User Profile Section in Sidebar */}
          <div className="sidebar-user">
            <img src={user.avatar} alt={user.name} className="sidebar-avatar" />
            {isOpen && (
              <div className="sidebar-user-info">
                <h6>{user.name}</h6>
                <p>{user.role}</p>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <nav className="sidebar-menu">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
                title={!isOpen ? item.title : ''}
              >
                <i className={`bi ${item.icon}`}></i>
                {isOpen && <span className="menu-text">{item.title}</span>}
                {isOpen && item.badge && (
                  <span className="menu-badge">{item.badge}</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        {isOpen && (
          <div className="sidebar-footer">
            <div className="help-card">
              <i className="bi bi-question-circle"></i>
              <h6>Need Help?</h6>
              <p>Check our documentation</p>
              <Link to="/help" className="btn btn-sm btn-success">
                Get Help
              </Link>
            </div>
          </div>
        )}
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;