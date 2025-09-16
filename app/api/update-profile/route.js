// app/api/update-profile/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      console.error("❌ Session not found:", session);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    let { name, phone } = body;

    // Safety check
    name = name ? String(name) : "";
    phone = phone ? String(phone) : "";

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    console.log("🔹 Updating user:", { id: session.user.id, name, phone });

    await query(
      "UPDATE users SET name = ?, phone = ? WHERE id = ?",
      [name, phone, String(session.user.id)]
    );

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("❌ Update Profile Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

