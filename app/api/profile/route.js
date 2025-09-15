/* app/api/profile/route.js */

import { auth } from "@/lib/auth";
import { query } from "@/lib/db";
import { put } from "@vercel/blob";

export async function POST(req) {
  try {
    const session = await auth();

    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const phone = formData.get("phone");
    const imageFile = formData.get("image");

    let imageUrl = null;

    // Jika ada upload foto → simpan ke Blob Storage
    if (imageFile && imageFile.size > 0) {
      const blob = await put(`avatars/${session.user.id}-${Date.now()}.png`, imageFile, {
        access: "public",
      });
      imageUrl = blob.url;
    }

    // Update ke database
    await query(
      "UPDATE users SET name = ?, phone = ?, image = COALESCE(?, image) WHERE email = ?",
      [name, phone, imageUrl, session.user.email]
    );

    return new Response(
      JSON.stringify({ message: "Profil berhasil diperbarui" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Profile update error:", err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
