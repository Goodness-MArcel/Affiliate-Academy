import express from 'express';
const mailRouter = express.Router();

import { sendMail } from '../services/mailservices.js';

mailRouter.post('/admin/send-mail', sendMail);

export default mailRouter;