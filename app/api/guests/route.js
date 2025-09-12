// app/api/guests/route.js
import { query } from '@/lib/db';
import crypto from 'node:crypto';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  if (!slug) return new Response(JSON.stringify({ error: 'Missing slug' }), { status: 400 });

  const inv = await query('SELECT id FROM invitations WHERE slug = ?', [slug]);
  if (inv.rows.length === 0) return new Response(JSON.stringify({ error: 'Invitation not found' }), { status: 404 });
  const invitationId = inv.rows.id;

  const res = await query('SELECT id, name, phone, token, checked_in_at FROM guests WHERE invitation_id = ? ORDER BY created_at DESC', [invitationId]);
  return Response.json({ data: res.rows });
}

export async function POST(req) {
  const body = await req.json();
  const { slug, name, phone } = body || {};
  if (!slug || !name) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });

  const inv = await query('SELECT id FROM invitations WHERE slug = ?', [slug]);
  if (inv.rows.length === 0) return new Response(JSON.stringify({ error: 'Invitation not found' }), { status: 404 });
  const invitationId = inv.rows.id;

  // token aman & unik
  const token = crypto.randomUUID().replace(/-/g, '') + crypto.randomBytes(4).toString('hex');

  await query('INSERT INTO guests (invitation_id, name, phone, token) VALUES (?, ?, ?, ?)', [invitationId, name, phone || null, token]);
  return Response.json({ ok: true, token });
}
