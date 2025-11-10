import jwt from 'jsonwebtoken';
import { supabase } from '../utils/supabaseClient.js';

export const verifyAdminToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // check admins table for that id
    const { data: admin, error } = await supabase.from('admins').select('id, email, role').eq('id', decoded.id).single();
    if (error || !admin) return res.status(403).json({ message: 'Access denied' });

    // attach admin info
    req.admin = { id: admin.id, email: admin.email, role: admin.role };
    next();
  } catch (err) {
    console.error('verifyAdminToken error:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
