// app/api/upload-avatar/route.js
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions, req);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload ke Blob Storage (contoh)
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

    // Update avatar di database
    await query("UPDATE users SET avatar = ? WHERE id = ?", [
      avatarUrl,
      session.user.id,
    ]);

    return NextResponse.json({ message: "Avatar uploaded successfully", url: avatarUrl });
  } catch (err) {
    console.error("Upload Avatar Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
