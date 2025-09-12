// app/admin/dashboard/page.js
async function createInvitation(formData) {
  'use server';
  const payload = Object.fromEntries(formData);
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/invitations`, {
    method: 'POST',
    body: JSON.stringify({
      slug: payload.slug,
      title: payload.title,
      brideName: payload.brideName,
      groomName: payload.groomName,
      eventDate: payload.eventDate,
      locationName: payload.locationName,
      locationAddress: payload.locationAddress,
      mapsUrl: payload.mapsUrl,
      coverImage: payload.coverImage,
      musicUrl: payload.musicUrl,
      theme: payload.theme || 'classic',
    }),
  });
}

export default function DashboardPage() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Buat Undangan</h1>
      <form action={createInvitation} className="space-y-2">
        <input name="slug" placeholder="slug-unik" required className="border p-2 w-full" />
        <input name="title" placeholder="Judul" required className="border p-2 w-full" />
        <input name="brideName" placeholder="Nama Mempelai Wanita" required className="border p-2 w-full" />
        <input name="groomName" placeholder="Nama Mempelai Pria" required className="border p-2 w-full" />
        <input name="eventDate" type="datetime-local" required className="border p-2 w-full" />
        <input name="locationName" placeholder="Nama Lokasi" className="border p-2 w-full" />
        <input name="locationAddress" placeholder="Alamat Lokasi" className="border p-2 w-full" />
        <input name="mapsUrl" placeholder="Google Maps URL" className="border p-2 w-full" />
        <input name="coverImage" placeholder="Cover Image URL" className="border p-2 w-full" />
        <input name="musicUrl" placeholder="Music URL" className="border p-2 w-full" />
        <input name="theme" placeholder="Tema (classic)" className="border p-2 w-full" />
        <button className="bg-black text-white px-4 py-2 rounded">Simpan</button>
      </form>
    </main>
  );
}
