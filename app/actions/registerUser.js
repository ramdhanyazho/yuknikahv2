"use server";

import { db } from "@/lib/turso";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function registerUser(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    console.log("📌 Register request received:", { email, name });

    // cek kalau email sudah ada
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      console.warn("⚠️ User already exists:", email);
      return { success: false, message: "User already exists" };
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user baru
    await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
    });

    console.log("✅ User created successfully:", email);

    return { success: true, message: "User created successfully" };
  } catch (err) {
    console.error("❌ Error in registerUser:", err);
    return { success: false, message: "Registration failed" };
  }
}
