'use server';

import { db } from '@/lib/turso';
import { users } from '@/lib/schema';
import bcrypt from 'bcryptjs';

export async function registerUser(prevState, formData) {
  console.log("=== registerUser terpanggil ===");

  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Data diterima dari form:", { name, email, password });

    if (!name || !email || !password) {
      console.log("Form kosong / tidak lengkap");
      return { success: false, message: "Semua field harus diisi" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Password berhasil di-hash:", hashedPassword.substring(0, 10) + "...");

    // Coba insert ke DB
    const result = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: "CLIENT",
    });

    console.log("Insert result:", result);

    return { success: true, message: "User berhasil dibuat!" };

  } catch (e) {
    console.error("Error registerUser:", e);
    return { success: false, message: "Terjadi error: " + e.message };
  }
}
