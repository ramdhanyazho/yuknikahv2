// app/api/upload/route.js
import { put } from '@vercel/blob';

export async function POST(request) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    const folder = form.get('folder') || '';

    if (!file || typeof file === 'string') {
      return new Response(JSON.stringify({ ok: false, error: 'No file uploaded' }), { status: 400 });
    }

    const baseName = folder ? `${folder}-${file.name}` : file.name;

    const blob = await put(baseName, file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type || 'application/octet-stream',
    });

    return Response.json({ ok: true, file: blob });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 400 });
  }
}
