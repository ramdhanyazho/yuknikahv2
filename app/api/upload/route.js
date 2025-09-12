// app/api/upload/route.js
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

// Opsional: validasi sesi admin di sini sebelum generate token

export async function POST(request) {
  const body = (await request.json()) /** @type {HandleUploadBody} */;

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload, multipart) => {
        // Batasi ukuran dan tipe file agar storage efisien
        return {
          addRandomSuffix: true,
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          maximumSizeInBytes: 3 * 1024 * 1024, // 3 MB
          // validUntil: Date.now() + 60_000, // opsional: token 1 menit
          // tokenPayload: JSON.stringify({ by: 'admin', multipart }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Catatan: Callback ini tidak memanggil localhost; gunakan ngrok saat dev
        // Simpan blob.url ke DB (Turso) sebagai cover/galeri sesuai kebutuhan
        console.log('Upload selesai:', blob.url);
      },
    });

    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 400 },
    );
  }
}
