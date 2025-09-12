// app/api/upload/route.js (JS)
import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          addRandomSuffix: true,
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          maximumSizeInBytes: 3 * 1024 * 1024, // 3MB limit server-side
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // Simpan blob.url ke DB bila perlu (catatan: webhook ini tidak memanggil localhost saat dev)
        console.log('Blob uploaded:', blob.url);
      },
    });

    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 400 });
  }
}
