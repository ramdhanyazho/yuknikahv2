// app/api/logout/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "No active session" }, { status: 401 });
    }

    // Hapus cookie session
    const res = NextResponse.json({ message: "Logged out ✅" });
    res.cookies.set("next-auth.session-token", "", { maxAge: 0 });
    res.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });
    res.cookies.set("next-auth.callback-url", "", { maxAge: 0 });

    return res;
  } catch (err) {
    console.error("Logout Error:", err);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
