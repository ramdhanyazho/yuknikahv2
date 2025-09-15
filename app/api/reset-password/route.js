// app/api/reset-password/route.js
import { auth } from "@/lib/auth"; 
import { query } from "@/lib/db"; 
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    // ✅ pakai helper auth (bukan getServerSession)
    const session = await auth();
    if (!session || !session.user?.email) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return Response.json(
        { message: "Password lama dan baru wajib diisi" },
        { status: 400 }
      );
    }

    // cek user di DB
    const userRes = await query(
      "SELECT * FROM users WHERE email = ?",
      [session.user.email]
    );
    const user = userRes.rows[0];

    if (!user) {
      return Response.json({ message: "User tidak ditemukan" }, { status: 404 });
    }

    // validasi password lama
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) {
      return Response.json({ message: "Password lama salah" }, { status: 400 });
    }

    // hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update DB
    await query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedPassword, session.user.email]
    );

    return Response.json(
      { message: "Password berhasil diperbarui" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Reset error:", err);
    return Response.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
