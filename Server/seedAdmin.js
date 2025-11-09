import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { supabase } from './utils/supabaseClient.js';


dotenv.config();

const run = async () => {
  try {
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
    const rawPassword = process.env.SEED_ADMIN_PASSWORD || 'admin123';
    const hashed = await bcrypt.hash(rawPassword, 10);

    const { data, error } = await supabase
      .from('admins')
      .upsert([{ email, password: hashed }], { onConflict: ['email'] });

    if (error) {
      console.error('Seed error:', error);
      process.exit(1);
    }

    console.log('Seeded admin (email):', email);
    console.log('If you want to change password, edit .env and re-run seed.');
    process.exit(0);
  } catch (err) {
    console.error('Seed script error:', err);
    process.exit(1);
  }
};

run();