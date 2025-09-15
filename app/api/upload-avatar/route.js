import { put } from '@vercel/blob';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(JSON.stringify({ message: 'File wajib diupload' }), { status: 400 });
    }

    // Upload ke vercel blob
    const blob = await put(`avatars/${Date.now()}-${file.name}`, file, {
      access: 'public',
    });

    // Simpan url ke DB
    await query('UPDATE users SET image = ? WHERE email = ?', [
      blob.url,
      session.user.email,
    ]);

    return new Response(
      JSON.stringify({ message: 'Avatar berhasil diupdate', url: blob.url }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Upload error:', err);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
