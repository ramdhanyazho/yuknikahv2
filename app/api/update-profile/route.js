// app/api/update-profile/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const session = await auth(); // pakai auth() dari lib/auth
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const name = String(body.name || "");
    const phone = String(body.phone || "");

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Update data user
    await query(
      "UPDATE users SET name = ?, phone = ? WHERE id = ?",
      [name, phone, session.user.id]
    );

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update Profile Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
