// app/api/auth/session/route.js
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(session, { status: 200 });
  } catch (err) {
    console.error("❌ Session API error:", err);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}
