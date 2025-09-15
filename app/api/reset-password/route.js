// app/api/reset-password/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';
import { authOptions } from '@/lib/auth'; // pastikan authOptions ada

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { oldPassword, newPassword } = await req.json();
    const email = session.user.email;

    // 1. Ambil user dari DB
    const userRes = await query('SELECT * FROM users WHERE email = ?', [email]);
    const user = userRes.rows[0];
    if (!user) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    // 2. Cek password lama
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Password lama salah' }, { status: 400 });
    }

    // 3. Hash password baru
    const hashed = await bcrypt.hash(newPassword, 10);
    await query('UPDATE users SET password = ? WHERE email = ?', [hashed, email]);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
