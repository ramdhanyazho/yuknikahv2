// app/page.js
import Link from 'next/link';

export const metadata = {
  title: 'yuknikah — Undangan Digital',
  description: 'Buat undangan pernikahan digital lengkap dengan RSVP dan buku tamu.',
};

export default function HomePage() {
  return (
    <main>
      <section className="container hero">
        <h1>yuknikah — Undangan Pernikahan Digital</h1>
        <p>Bangun undangan web yang elegan, bagikan link, kumpulkan RSVP, dan kelola ucapan dalam satu tempat.</p>
        <div className="actions">
          <Link className="btn primary" href="/dashboard">Buka Dashboard</Link>
          <Link className="btn" href="/docs">Dokumentasi</Link>
          <Link className="btn accent" href="/contoh-sarah-dan-budi">Lihat Contoh Undangan</Link>
        </div>
      </section>

      <section className="container section">
        <div className="grid">
          <div className="card">
            <h3>RSVP & Buku Tamu</h3>
            <p>Kumpulkan konfirmasi kehadiran dan ucapan yang tersimpan langsung di database.</p>
          </div>
          <div className="card">
            <h3>Peta & Musik</h3>
            <p>Sematkan tautan Google Maps dan audio musik pembuka pada halaman undangan.</p>
          </div>
          <div className="card">
            <h3>Tema & Gambar Sampul</h3>
            <p>Pilih tema dan unggah cover image agar undangan tampil menawan di berbagai perangkat.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
