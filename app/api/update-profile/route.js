import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // contoh update db
    // await query("UPDATE users SET name = ? WHERE email = ?", [
    //   body.name,
    //   session.user.email,
    // ]);

    return NextResponse.json({
      message: "Profile updated",
      data: body,
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
