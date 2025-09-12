// app/(admin)/guests/page.js
'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function GuestsPage() {
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [items, setItems] = useState([]);
  const [qrMap, setQrMap] = useState({}); // token -> dataURL

  async function load() {
    if (!slug) return;
    const res = await fetch(`/api/guests?slug=${encodeURIComponent(slug)}`);
    const data = await res.json();
    setItems(data.data || []);
    // generate QR untuk setiap token
    const base = process.env.NEXT_PUBLIC_BASE_URL || '';
    const entries = await Promise.all(
      (data.data || []).map(async (g) => {
        const text = `${base}/check-in?token=${g.token}`;
        const url = await QRCode.toDataURL(text, { margin: 1, width: 240 });
        return [g.token, url];
      })
    );
    setQrMap(Object.fromEntries(entries));
  }

  async function create(e) {
    e.preventDefault();
    const res = await fetch('/api/guests', {
      method: 'POST',
      body: JSON.stringify({ slug, name, phone })
    });
    const data = await res.json();
    if (res.ok) {
      setName(''); setPhone('');
      await load();
    } else {
      alert(data.error || 'Gagal membuat tamu');
    }
  }

  useEffect(() => { /* auto-load saat slug diisi */ if (slug) load(); }, [slug]);

  return (
    <main className="container">
      <h1>Daftar Tamu</h1>

      <form onSubmit={create} className="card" style={{ marginBottom: 16 }}>
        <input className="border p-2" placeholder="slug undangan" value={slug} onChange={e => setSlug(e.target.value)} required />
        <input className="border p-2" placeholder="Nama tamu" value={name} onChange={e => setName(e.target.value)} required />
        <input className="border p-2" placeholder="No. HP (opsional)" value={phone} onChange={e => setPhone(e.target.value)} />
        <button className="btn">Tambah Tamu</button>
      </form>

      <div className="grid">
        {items.map(g => (
          <div className="card" key={g.token}>
            <h3>{g.name}</h3>
            <p>{g.phone || '-'}</p>
            <img src={qrMap[g.token]} alt="QR" style={{ width: 240, height: 240 }} />
            <small>Token: {g.token}</small>
            <div>Check‑in: {g.checked_in_at ? new Date(g.checked_in_at).toLocaleString() : '-'}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
