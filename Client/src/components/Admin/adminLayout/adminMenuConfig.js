// Admin Menu Configuration Data
export const ADMIN_MENU_ITEMS = [
    {
      title: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      path: '/admin/dashboard',
      description: 'Overview & Analytics'
    },
    {
      title: 'Manage Users',
      icon: 'fas fa-users',
      path: '/admin/users',
      description: 'User Management',
      submenu: [
        { title: 'All Users', path: '/admin/users/all' },
        { title: 'Active Users', path: '/admin/users/active' },
        { title: 'Inactive Users', path: '/admin/users/inactive' },
        { title: 'User Roles', path: '/admin/users/roles' }
      ]
    },
    {
      title: 'Course Management',
      icon: 'fas fa-graduation-cap',
      path: '/admin/courses',
      description: 'Upload & Manage Courses',
      submenu: [
        { title: 'Upload Course', path: '/admin/courses/upload' },
        { title: 'All Courses', path: '/admin/courses/all' },
        { title: 'Course Categories', path: '/admin/courses/categories' },
        { title: 'Course Analytics', path: '/admin/courses/analytics' }
      ]
    },
    {
      title: 'Payment Requests',
      icon: 'fas fa-money-check-alt',
      path: '/admin/payments',
      description: 'Withdrawal Requests',
      submenu: [
        { title: 'Pending Requests', path: '/admin/payments/pending' },
        { title: 'Approved Requests', path: '/admin/payments/approved' },
        { title: 'Rejected Requests', path: '/admin/payments/rejected' },
        { title: 'Payment History', path: '/admin/payments/history' }
      ]
    },
    {
      title: 'Affiliate System',
      icon: 'fas fa-network-wired',
      path: '/admin/affiliate',
      description: 'Referral Management',
      submenu: [
        { title: 'Commission Rates', path: '/admin/affiliate/rates' },
        { title: 'Referral Tree', path: '/admin/affiliate/tree' },
        { title: 'Bonus Management', path: '/admin/affiliate/bonuses' },
        { title: 'Payout Reports', path: '/admin/affiliate/payouts' }
      ]
    },
    {
      title: 'Real Estate',
      icon: 'fas fa-house-user',
      path: '/admin/realestate',
      description: 'Real Estate Management',
      submenu: [
        { title: 'Property Listings', path: '/admin/realestate/listings' },
        { title: 'Investment Plans', path: '/admin/realestate/plans' },
        { title: 'Property Analytics', path: '/admin/realestate/analytics' }
      ]
    },
    {
      title: 'Site Settings',
      icon: 'fas fa-cogs',
      path: '/admin/settings',
      description: 'System Configuration',
      submenu: [
        { title: 'General Settings', path: '/admin/settings/general' },
        { title: 'Payment Settings', path: '/admin/settings/payments' },
        { title: 'Email Settings', path: '/admin/settings/email' },
        { title: 'Security Settings', path: '/admin/settings/security' }
      ]
    },
    {
      title: 'Analytics & Reports',
      icon: 'fas fa-chart-line',
      path: '/admin/analytics',
      description: 'Performance Metrics',
      submenu: [
        { title: 'Revenue Reports', path: '/admin/analytics/revenue' },
        { title: 'User Activity', path: '/admin/analytics/users' },
        { title: 'Course Performance', path: '/admin/analytics/courses' }
      ]
    },
    {
      title: 'Notifications',
      icon: 'fas fa-bell',
      path: '/admin/notifications',
      description: 'System Alerts',
      submenu: [
        { title: 'Send Notifications', path: '/admin/notifications/send' },
        { title: 'Email Templates', path: '/admin/notifications/templates' },
        { title: 'Notification History', path: '/admin/notifications/history' }
      ]
    }
];

// Profile Menu Items
export const PROFILE_MENU_ITEMS = [
    {
      title: 'Administrator',
      type: 'header'
    },
    {
      title: 'View Profile',
      icon: 'fas fa-user',
      path: '/admin/profile'
    },
    {
      title: 'Account Settings',
      icon: 'fas fa-cog',
      path: '/admin/account'
    },
    {
      title: 'Change Password',
      icon: 'fas fa-key',
      path: '/admin/change-password'
    },
    {
      title: 'Logout',
      icon: 'fas fa-sign-out-alt',
      path: '/logout',
      className: 'text-danger'
    }
];

// Sidebar Configuration
export const SIDEBAR_CONFIG = {
  brandText: 'Admin Panel',
  searchPlaceholder: 'Search admin panel...',
  adminName: 'Administrator',
  adminStatus: 'Online',
  adminAvatar: 'https://ui-avatars.com/api/?name=Admin&background=8b4513&color=fff&size=40'
};