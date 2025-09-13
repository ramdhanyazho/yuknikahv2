import { db } from "@/lib/turso";
import { users } from "@/lib/schema";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role: "CLIENT",
    });

    return Response.json({
      success: true,
      message: "✅ User berhasil dibuat",
    });
  } catch (err) {
    console.error("❌ Register error:", err);
    return Response.json(
      { success: false, message: "Gagal membuat user" },
      { status: 500 }
    );
  }
}
