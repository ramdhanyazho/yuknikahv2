// app/actions/registerUser.js
'use server';

import { query } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function registerUser(formData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!name || !email || !password) {
      return { success: false, message: 'Semua field wajib diisi' };
    }

    // cek user existing
    const existing = await query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.rows.length > 0) {
      return { success: false, message: 'Email sudah terdaftar' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'user']
    );

    return { success: true, message: 'Registrasi berhasil' };
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, message: 'Terjadi kesalahan server' };
  }
}
