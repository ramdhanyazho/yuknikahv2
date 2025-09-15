import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // TODO: upload ke cloud (misal S3/Cloudinary)
    // const uploadedUrl = await uploadToCloud(file);

    return NextResponse.json({
      message: "Avatar uploaded",
      // avatarUrl: uploadedUrl,
    });
  } catch (err) {
    console.error("Upload Avatar Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
