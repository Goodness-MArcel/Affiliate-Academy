import express from 'express';
import { adminLogin } from '../controller/adminAuth.js';

const adminLoginRouter = express.Router();

// POST /api/admin/login
adminLoginRouter.post('/login', adminLogin);

export default adminLoginRouter;

