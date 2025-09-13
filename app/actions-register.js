// app/actions-register.js
'use server';

import { db } from '@/lib/turso';
import { users } from '@/lib/schema';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const RegisterSchema = z.object({
  name: z.string().min(3, { message: "Nama minimal 3 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
});

export async function registerUser(prevState, formData) {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Input tidak valid. Mohon periksa kembali data Anda.',
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Debugging: Cetak data ke log server untuk memastikan data sampai di sini
    console.log('Mencoba menyimpan pengguna baru:', { name, email });

    await db.insert(users).values({
      name: name,
      email: email,
      password: hashedPassword,
      role: 'CLIENT',
    });

    console.log('Pengguna berhasil disimpan ke database.');

    // Mengembalikan pesan sukses
    return { success: true, message: 'Registrasi berhasil! Anda akan diarahkan ke halaman login.' };

  } catch (e) {
    console.error('Error saat registrasi:', e.message); // Debugging error
    
    if (e.message.includes('UNIQUE constraint failed: users.email')) {
      return { success: false, message: 'Email ini sudah terdaftar.' };
    }
    return { success: false, message: 'Terjadi kesalahan pada server. Coba lagi nanti.' };
  }
}