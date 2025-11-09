import express from 'express';
import { verifyAdminToken } from '../middleware/verifyAdminToken.js';
import { 
    getProfile, 
    listAdmins, 
    promoteToAdmin, 
    demoteAdmin, 
    getAllUsers, 
    deleteUser ,
    getDashboardData
} from '../controller/adminAuth.js';

// Initialize admin router for all admin-specific routes
const Adminrouter = express.Router();

// =============================================
// PROFILE & USER MANAGEMENT ROUTES
// =============================================

Adminrouter.get('/dashboard', verifyAdminToken, getDashboardData);

/**
 * GET /api/admin/profile
 * Retrieves the authenticated admin's profile information
 * Protected by admin token verification middleware
 */
Adminrouter.get('/profile', verifyAdminToken, getProfile);

/**
 * GET /api/admin/users
 * Fetches a list of all users in the system
 * Requires admin privileges for access
 */
Adminrouter.get('/users', verifyAdminToken, getAllUsers);

/**
 * DELETE /api/admin/users/:id
 * Permanently deletes a user account from the system
 * :id - The unique identifier of the user to delete
 */
Adminrouter.delete('/users/:id', verifyAdminToken, deleteUser);

// =============================================
// ADMIN ROLE MANAGEMENT ROUTES
// =============================================

/**
 * GET /api/admin/list
 * Retrieves a list of all users with admin privileges
 * Used for admin team management and oversight
 */
Adminrouter.get('/list', verifyAdminToken, listAdmins);

/**
 * POST /api/admin/promote
 * Elevates a regular user to admin status
 * Expects user ID in request body
 * Requires careful authorization checks
 */
Adminrouter.post('/promote', verifyAdminToken, promoteToAdmin);

/**
 * DELETE /api/admin/demote/:id
 * Removes admin privileges from a user (demotes to regular user)
 * :id - The unique identifier of the admin to demote
 * Prevents self-demotion and maintains at least one admin
 */
Adminrouter.delete('/demote/:id', verifyAdminToken, demoteAdmin);

// Export the configured admin router for use in main application
export default Adminrouter;