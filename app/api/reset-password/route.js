// app/api/reset-password/route.js

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const { oldPassword, newPassword } = await req.json();
    const email = session.user.email;

    // 🔹 Cek user lama
    const result = await query('SELECT * FROM users WHERE email = ?', [email]);
    const user = result.rows[0];
    if (!user) {
      return new Response(JSON.stringify({ message: 'User tidak ditemukan' }), { status: 404 });
    }

    // 🔹 Verifikasi password lama
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) {
      return new Response(JSON.stringify({ message: 'Password lama salah' }), { status: 400 });
    }

    // 🔹 Hash password baru
    const hashed = await bcrypt.hash(newPassword, 10);

    // 🔹 Update DB
    await query('UPDATE users SET password = ? WHERE email = ?', [hashed, email]);

    return new Response(JSON.stringify({ message: 'Password berhasil diubah' }), { status: 200 });
  } catch (err) {
    console.error('Reset error:', err);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
