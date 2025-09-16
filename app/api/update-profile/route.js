// app/api/update-profile/route.js

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
    const name = formData.get("name");
    const phone = formData.get("phone");

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone required" }, { status: 400 });
    }

    await query("UPDATE users SET name = ?, phone = ? WHERE id = ?", [
      name,
      phone,
      session.user.id,
    ]);

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update Profile Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
