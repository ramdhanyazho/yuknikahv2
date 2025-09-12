// app/(public)/[slug]/page.js
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function getInvitation(slug) {
  const res = await query('SELECT * FROM invitations WHERE slug = ?', [slug]);
  return res.rows || null;
}

export default async function InvitationPage({ params }) {
  const { slug } = params;
  const inv = await getInvitation(slug);
  if (!inv) return <div>Undangan tidak ditemukan</div>;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{inv.title}</h1>
      <p className="mb-4">
        {inv.bride_name} &amp; {inv.groom_name} — {new Date(inv.event_date).toLocaleString()}
      </p>

      {inv.cover_image && (
        <img src={inv.cover_image} alt="Cover" className="w-full rounded mb-4" />
      )}

      {inv.music_url && (
        <audio src={inv.music_url} controls className="mb-4" />
      )}

      {inv.location_name && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold">Lokasi</h2>
          <p>{inv.location_name}</p>
          <p className="text-sm text-gray-600">{inv.location_address}</p>
          {inv.maps_url && (
            <a className="text-blue-600 underline" href={inv.maps_url} target="_blank" rel="noreferrer">
              Buka Peta
            </a>
          )}
        </section>
      )}

      <section className="mb-6">
        <h2 className="text-xl font-semibold">RSVP</h2>
        <RsvpForm slug={slug} />
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Ucapan</h2>
        <WishForm slug={slug} />
      </section>
    </main>
  );
}

function RsvpForm({ slug }) {
  async function action(formData) {
    'use server';
    const payload = {
      slug,
      name: formData.get('name'),
      phone: formData.get('phone'),
      attending: formData.get('attending') === 'yes',
      guestsCount: Number(formData.get('guestsCount') || 1),
      message: formData.get('message'),
    };
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/rsvp`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  return (
    <form action={action} className="space-y-2">
      <input name="name" placeholder="Nama" className="border p-2 w-full" required />
      <input name="phone" placeholder="No. HP (opsional)" className="border p-2 w-full" />
      <select name="attending" className="border p-2 w-full" required>
        <option value="yes">Hadir</option>
        <option value="no">Tidak Hadir</option>
      </select>
      <input name="guestsCount" type="number" min="1" defaultValue="1" className="border p-2 w-full" />
      <textarea name="message" placeholder="Ucapan (opsional)" className="border p-2 w-full" />
      <button className="bg-black text-white px-4 py-2 rounded">Kirim</button>
    </form>
  );
}

function WishForm({ slug }) {
  async function action(formData) {
    'use server';
    const payload = {
      slug,
      name: formData.get('name'),
      message: formData.get('message'),
    };
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/wishes`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  return (
    <form action={action} className="space-y-2">
      <input name="name" placeholder="Nama" className="border p-2 w-full" required />
      <textarea name="message" placeholder="Ucapan" className="border p-2 w-full" required />
      <button className="bg-black text-white px-4 py-2 rounded">Kirim</button>
    </form>
  );
}
