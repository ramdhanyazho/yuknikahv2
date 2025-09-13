// app/actions-register.js
'use server';

import { db } from '@/lib/turso';
import { users } from '@/lib/schema';
import bcrypt from 'bcrypt';
import { z } from 'zod';

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
    console.log('Validasi gagal:', validatedFields.error.format());
    return {
      success: false,
      message: 'Input tidak valid. Mohon periksa kembali data Anda.',
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    console.log('Mencoba simpan user:', { name, email });

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: 'CLIENT',
    });

    console.log('User berhasil dibuat!');
    return { success: true, message: 'Registrasi berhasil! Anda akan diarahkan ke halaman login.' };

  } catch (e) {
    console.error('Error saat registrasi:', e);
    if (e.message.includes('UNIQUE constraint failed')) {
      return { success: false, message: 'Email ini sudah terdaftar.' };
    }
    return { success: false, message: 'Server error: ' + e.message };
  }
}
