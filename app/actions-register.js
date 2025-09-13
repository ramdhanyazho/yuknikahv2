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
  console.log("🔥 registerUser TERPANGGIL dengan formData:", Object.fromEntries(formData.entries()));

  return { success: false, message: "DEBUG: Server action terpanggil, cek console." };

  // sementara return debug, nanti kita balikin insert DB
}
