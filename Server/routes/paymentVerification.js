import express from 'express';
const router = express.Router();

import { verifyPaystack } from '../controller/payment.js';

// Use GET – verification is idempotent
router.get('/payment/verify/:reference', verifyPaystack);
// Use POST – for verification with additional data (user_id, referrer_id)
router.post('/payment/verify/:reference', verifyPaystack);

export default router;
