// app/api/logout/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "No active session" }, { status: 401 });
    }

    const res = NextResponse.json({ message: "Logged out ✅" });

    // Hapus semua variasi cookie NextAuth
    const cookieOptions = { maxAge: 0, path: "/", httpOnly: true, secure: true, sameSite: "lax" };
    res.cookies.set("next-auth.session-token", "", cookieOptions);
    res.cookies.set("__Secure-next-auth.session-token", "", cookieOptions);
    res.cookies.set("next-auth.csrf-token", "", cookieOptions);
    res.cookies.set("next-auth.callback-url", "", cookieOptions);

    return res;
  } catch (err) {
    console.error("Logout Error:", err);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
