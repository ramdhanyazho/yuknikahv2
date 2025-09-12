// app/api/checkin/route.js
import { query } from '@/lib/db';

export async function POST(req) {
  const { token } = await req.json();
  if (!token) return new Response(JSON.stringify({ error: 'Missing token' }), { status: 400 });

  const g = await query('SELECT id, checked_in_at FROM guests WHERE token = ?', [token]);
  if (g.rows.length === 0) return new Response(JSON.stringify({ error: 'Guest not found' }), { status: 404 });

  if (g.rows.checked_in_at) {
    return Response.json({ ok: true, alreadyCheckedIn: true });
  }

  await query('UPDATE guests SET checked_in_at = datetime(\'now\') WHERE id = ?', [g.rows.id]);
  return Response.json({ ok: true, alreadyCheckedIn: false });
}
