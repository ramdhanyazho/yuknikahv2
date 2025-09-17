// app/api/update-profile/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const phone = formData.get("phone");

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name & phone are required" },
        { status: 400 }
      );
    }

    const result = await query(
      "UPDATE users SET name = ?, phone = ? WHERE email = ?",
      [String(name), String(phone), session.user.email]
    );

    console.log("Update result:", result);

    return NextResponse.json({
      message: "Profile updated ✅",
      updated: true,
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
