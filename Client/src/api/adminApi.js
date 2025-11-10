import axiosInstance from '../utils/axiosInstance';

export const adminLogin = async (email, password) => {
  try {
    const res = await axiosInstance.post('/api/adminlogin/login', { email, password });
    console.log('adminLogin response:', res.data);      
    return res.data; // { message, token, admin }
  } catch (err) {
    const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
    throw new Error(message);
  }
};

export const fetchAdminProfile = async (token) => {
  try {
    const res = await axiosInstance.get('/admin/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch admin profile');
  }
};

export const fetchUsersList = async (token, page = 1, limit = 10, search = '') => {
  if (!token) throw new Error('Missing authentication token');

  try {
    const res = await axiosInstance.get('/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
      params: { page, limit, search },
    });

    return res.data;
  } catch (error) {
    console.error('fetchUsersList error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch users list');
  }
};


export const deleteUserById = async (userId, token) => {
  try {
    const res = await axiosInstance.delete(`/api/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error('deleteUserById error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
};


export const fetchDashboardDataFromBackend = async (token) => {
  try {
    const res = await axiosInstance.get('/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error('fetchDashboardDataFromBackend error:', error);
    throw new Error('Failed to fetch dashboard data');
  }
};



export const fetchAdminsList = async (token) => {
  try {
    const res = await axiosInstance.get('/api/admin/list', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch admins list');
  }
};
