// index.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

import paymentVerificationRoutes from './routes/paymentVerification.js';

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', paymentVerificationRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});