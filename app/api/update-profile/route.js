import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { query } from '@/lib/db';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const { name, phone } = await req.json();

    if (!name || !phone) {
      return new Response(
        JSON.stringify({ message: 'Nama dan nomor telepon wajib diisi' }),
        { status: 400 }
      );
    }

    await query('UPDATE users SET name = ?, phone = ? WHERE email = ?', [
      name,
      phone,
      session.user.email,
    ]);

    return new Response(JSON.stringify({ message: 'Profil berhasil diupdate' }), {
      status: 200,
    });
  } catch (err) {
    console.error('Update profile error:', err);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
