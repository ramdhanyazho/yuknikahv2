/* /app/api/update-profile/route.js */

import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getServerSession } from "next-auth"; // <-- dari sini sekarang
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  try {
    // Ambil session yang valid di server
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    await query(
      "UPDATE users SET name = ?, phone = ? WHERE id = ?",
      [name.trim(), phone.trim(), session.user.id]
    );

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update Profile Error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
