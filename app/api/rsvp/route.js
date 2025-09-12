// app/api/rsvp/route.js
import { query } from '@/lib/db';

export async function POST(req) {
  const body = await req.json();
  const { slug, name, phone, attending, guestsCount = 1, message } = body || {};
  if (!slug || !name || typeof attending !== 'boolean') {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
  }

  try {
    const inv = await query('SELECT id FROM invitations WHERE slug = ?', [slug]);
    if (inv.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Invitation not found' }), { status: 404 });
    }
    const invitationId = inv.rows.id;

    await query(
      `INSERT INTO rsvps (invitation_id, name, phone, attending, guests_count, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [invitationId, name, phone || null, attending ? 1 : 0, guestsCount, message || null]
    );

    return Response.json({ ok: true });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
