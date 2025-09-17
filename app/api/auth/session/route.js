// app/api/auth/session/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic"; // ⬅️ wajib biar gak di-prerender statis

export async function GET(req) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user: session.user }, { status: 200 });
  } catch (err) {
    console.error("Session error:", err);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
