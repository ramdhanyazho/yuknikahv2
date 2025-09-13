// app/actions.js
'use server';

import { signIn } from '@/lib/auth'; // <-- Path diubah
import { AuthError } from 'next-auth';

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