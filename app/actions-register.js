'use server';

import { db } from '@/lib/turso';
import { users } from '@/lib/schema';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { redirect } from 'next/navigation';

// Skema validasi untuk form registrasi
const RegisterSchema = z.object({
  name: z.string().min(3, { message: "Nama minimal 3 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
});

export async function registerUser(prevState, formData) {
  // 1. Validasi input
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Gagal mendaftar. Mohon periksa kembali input Anda.',
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Simpan ke database Turso
    await db.insert(users).values({
      name: name,
      email: email,
      password: hashedPassword,
      role: 'CLIENT', // Role default
    });

  } catch (e) {
    // Tangani jika email sudah terdaftar
    if (e.message.includes('UNIQUE constraint failed: users.email')) {
      return { message: 'Email ini sudah terdaftar.' };
    }
    return { message: 'Terjadi kesalahan pada database.' };
  }

  // 4. Arahkan ke halaman login jika berhasil
  redirect('/login');
}