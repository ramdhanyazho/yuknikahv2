// app/admin/checkin/page.js
'use client';

import { useEffect, useState } from 'react';

function parseToken(text) {
  try {
    // dukung format URL: https://domain/check-in?token=xxx
    const url = new URL(text);
    return url.searchParams.get('token') || text;
  } catch {
    // fallback: token mentah
    return text;
  }
}

export default function CheckinPage() {
  const [status, setStatus] = useState('Arahkan kamera ke QR tamu...');
  const [last, setLast] = useState(null);

  useEffect(() => {
    let scanner;
    let cleared = false;

    (async () => {
      const mod = await import('html5-qrcode');
      const { Html5QrcodeScanner } = mod;
      scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 240 });
      const onSuccess = async (decodedText) => {
        const token = parseToken(decodedText);
        setStatus('Memproses check-in...');
        try {
          const res = await fetch('/api/checkin', { method: 'POST', body: JSON.stringify({ token }) });
          const data = await res.json();
          if (res.ok) {
            setLast({ token, already: !!data.alreadyCheckedIn });
            setStatus(data.alreadyCheckedIn ? 'Sudah check-in sebelumnya' : 'Check-in berhasil');
          } else {
            setStatus(data.error || 'Gagal check-in');
          }
        } catch (e) {
          setStatus('Gagal terhubung ke server');
        }
      };
      const onError = () => {};
      scanner.render(onSuccess, onError);
    })();

    return () => {
      if (scanner) {
        scanner.clear().catch(() => {});
      }
      cleared = true;
    };
  }, []);

  return (
    <main className="container">
      <h1>Check‑in QR</h1>
      <p>{status}</p>
      <div id="reader" style={{ maxWidth: 480 }} />
      {last && (
        <div className="card" style={{ marginTop: 16 }}>
          <strong>Token:</strong> {last.token}
          <div>Status: {last.already ? 'Sudah check‑in' : 'Baru check‑in'}</div>
        </div>
      )}
    </main>
  );
}
