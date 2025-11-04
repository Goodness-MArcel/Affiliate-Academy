import React from 'react'
import AdminSidebar from '../adminLayout/AdminSidebar'

const AdminDashboard = () => {
  
  return (
    <div className="admin-layout d-flex">
      {/* Sidebar */}
      <AdminSidebar />
      <div className="admin-content flex-grow-1 p-3">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard!</p>
      </div>

    </div>
  )
}

export default AdminDashboard