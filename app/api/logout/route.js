// app/api/logout/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // custom auth checker

export async function POST() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "No active session" }, { status: 401 });
    }

    // 🔹 Hapus cookie session (baik NextAuth atau custom session)
    const res = NextResponse.json({ message: "Logged out ✅" });

    // Kalau pakai custom token (misalnya "session"), reset
    res.cookies.set("session", "", {
      path: "/",
      httpOnly: true,
      maxAge: 0,
    });

    // Kalau pakai NextAuth, reset cookie default juga
    res.cookies.set("next-auth.session-token", "", {
      path: "/",
      httpOnly: true,
      maxAge: 0,
    });
    res.cookies.set("__Secure-next-auth.session-token", "", {
      path: "/",
      httpOnly: true,
      maxAge: 0,
    });

    return res;
  } catch (err) {
    console.error("Logout Error:", err);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
