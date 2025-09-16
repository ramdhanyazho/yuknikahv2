// app/api/update-profile/route.js
'use server';

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";

// Update profil + avatar
export async function POST(req) {
  try {
    // Ambil session
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }

    const formData = await req.formData();
    const name = formData.get("name")?.toString() ?? null;
    const phone = formData.get("phone")?.toString() ?? null;
    const avatarFile = formData.get("avatar"); // optional

    // Validasi minimal
    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    // Simpan avatar dulu jika ada
    let avatarUrl = null;
    if (avatarFile && avatarFile.size > 0) {
      const bytes = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const blobRes = await fetch(`${process.env.BLOB_STORAGE_URL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
        },
        body: buffer,
      });

      if (!blobRes.ok) {
        console.error("Failed to upload avatar", await blobRes.text());
        return NextResponse.json({ error: "Failed to upload avatar" }, { status: 500 });
      }

      const blobData = await blobRes.json();
      avatarUrl = blobData.url;
    }

    // Build query dan params secara dinamis
    const updates = ["name = ?", "phone = ?"];
    const params = [name, phone];

    if (avatarUrl) {
      updates.push("avatar = ?");
      params.push(avatarUrl);
    }

    params.push(userId);

    await query(
      `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
      params.map(v => v?.toString()) // Pastikan semua string untuk LibSQL
    );

    return NextResponse.json({ message: "Profile updated successfully", avatar: avatarUrl });
  } catch (err) {
    console.error("Update Profile Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
