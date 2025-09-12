// app/api/invitations/route.js
import { query } from '@/lib/db';

export async function GET() {
  const res = await query('SELECT id, slug, title, bride_name, groom_name, event_date, theme FROM invitations ORDER BY created_at DESC');
  return Response.json({ data: res.rows });
}

export async function POST(req) {
  const body = await req.json();
  const {
    slug, title, brideName, groomName, eventDate,
    locationName, locationAddress, mapsUrl,
    coverImage, musicUrl, theme = 'classic',
  } = body || {};

  if (!slug || !title || !brideName || !groomName || !eventDate) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
  }

  try {
    await query(
      `INSERT INTO invitations
       (slug, title, bride_name, groom_name, event_date, location_name, location_address, maps_url, cover_image, music_url, theme)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, title, brideName, groomName, eventDate, locationName, locationAddress, mapsUrl, coverImage, musicUrl, theme]
    );
    return Response.json({ ok: true, slug });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
