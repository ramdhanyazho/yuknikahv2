import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";

// contoh pakai BLOB_STORAGE_URL + fetch
export async function POST(req) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file ke Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload ke Blob Storage
    const blobRes = await fetch(`${process.env.BLOB_STORAGE_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
      body: buffer,
    });

    if (!blobRes.ok) {
      return NextResponse.json({ error: "Failed to upload avatar" }, { status: 500 });
    }

    const blobData = await blobRes.json();
    const avatarUrl = blobData.url;

    // Simpan URL avatar di database
    await query(
      "UPDATE users SET avatar = ? WHERE id = ?",
      [avatarUrl, session.user.id]
    );

    return NextResponse.json({ message: "Avatar uploaded successfully", url: avatarUrl });
  } catch (err) {
    console.error("Upload Avatar Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
