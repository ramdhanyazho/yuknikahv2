// app/actions.js
'use server';

// 1. Tambahkan 'signOut' ke dalam import
import { signIn, signOut } from '@/lib/auth'; 
import { AuthError } from 'next-auth';

// Fungsi authenticate yang sudah ada (jangan diubah)
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

// 2. Tambahkan fungsi baru ini untuk logout
export async function handleSignOut() {
  await signOut();
}