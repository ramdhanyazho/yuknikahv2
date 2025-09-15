// app/actions.js
'use server';

import { signIn, signOut } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { db } from '@/lib/turso';
import { users } from '@/lib/schema';
import bcrypt from 'bcrypt';

// Fungsi login manual (credentials)
export async function authenticate(prevState, formData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Email atau password salah.';
        default:
          return 'Terjadi kesalahan. Coba lagi.';
      }
    }
    throw error;
  }
}

// Fungsi logout
export async function handleSignOut() {
  await signOut();
}

// 🔹 Fungsi registrasi manual
export async function registerUser(formData) {
  try {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    if (!name || !email || !password) {
      return { success: false, message: 'Semua field wajib diisi' };
    }

    // Cek apakah email sudah ada
    const existingUser = await db
      .select()
      .from(users)
      .where(users.email.eq(email))
      .limit(1);

    if (existingUser.length > 0) {
      return { success: false, message: 'Email sudah terdaftar' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return { success: true, message: 'Registrasi berhasil!' };
  } catch (err) {
    console.error('Register error:', err);
    return { success: false, message: 'Terjadi kesalahan saat registrasi' };
  }
}
