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

  const validatedFields = RegisterSchema.safeParse(Object.fromEntries(formData.entries()));
  console.log("✅ Hasil validasi Zod:", validatedFields);

  if (!validatedFields.success) {
    console.log("❌ Validasi gagal");
    return { success: false, message: 'Input tidak valid' };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("🔑 Password berhasil di-hash:", hashedPassword);

  try {
    console.log("📥 Mencoba INSERT ke database...");
    const result = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: 'CLIENT',
    }).returning();  // tambahin returning biar tahu hasil insert

    console.log("✅ User berhasil disimpan:", result);

    return { success: true, message: `Registrasi berhasil untuk ${email}` };

  } catch (e) {
    console.error("🔥 ERROR saat insert:", e);
    return { success: false, message: `DB Error: ${e.message}` };
  }
}
