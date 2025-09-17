// app/api/upload-avatar/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ambil formData dari request
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Baca isi file sebagai buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Tentukan path penyimpanan (misal /public/avatars/)
    const uploadDir = path.join(process.cwd(), "public", "avatars");
    await fs.mkdir(uploadDir, { recursive: true });

    // Nama file unik (email + timestamp + ekstensi)
    const ext = path.extname(file.name) || ".png";
    const filename = `${session.user.email.replace(/[@.]/g, "_")}_${Date.now()}${ext}`;
    const filepath = path.join(uploadDir, filename);

    await fs.writeFile(filepath, buffer);

    // Simpan path/avatar URL ke DB (opsional, sesuai kebutuhan)
    // await query("UPDATE users SET avatar = ? WHERE email = ?", [`/avatars/${filename}`, session.user.email]);

    return NextResponse.json({
      message: "Avatar uploaded ✅",
      url: `/avatars/${filename}`,
    });
  } catch (err) {
    console.error("Upload Avatar Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
