// app/admin/media/page.js
'use client';

import { upload } from '@vercel/blob/client';
import { useRef, useState } from 'react';

const MAX_MB = 3;
const MAX_BYTES = MAX_MB * 1024 * 1024;

export default function MediaUploadPage() {
  const inputRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const [error, setError] = useState('');
  const [blobUrl, setBlobUrl] = useState('');
  const [folder, setFolder] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setPercent(0);
    setBlobUrl('');

    // FIX: akses file pertama dengan optional chaining pada array
    const file = inputRef.current?.files?.;
    if (!file) return setError('Pilih file terlebih dahulu');

    if (file.size > MAX_BYTES) {
      return setError(`Maksimum ${MAX_MB}MB. File ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
    }

    try {
      const name = folder ? `${folder}/${file.name}` : file.name;
      const result = await upload(name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
        multipart: true,
        onUploadProgress: ({ percentage }) => setPercent(Math.round(percentage)),
      });
      setBlobUrl(result.url);
    } catch (e) {
      setError(e.message || 'Gagal upload');
    }
  }

  return (
    <main className="container">
      <h1>Upload Media (Blob)</h1>
      <form onSubmit={onSubmit} className="card">
        <input placeholder="slug/folder (opsional)" value={folder} onChange={(e) => setFolder(e.target.value)} />
        <input type="file" accept="image/jpeg,image/png,image/webp" ref={inputRef} required />
        <button className="btn">Upload</button>

        {percent > 0 && (
          <div>
            <div style={{ height: 8, background: '#222', borderRadius: 999 }}>
              <div style={{ width: `${percent}%`, height: 8, background: '#6ee7b7', borderRadius: 999 }} />
            </div>
            <small>{percent}%</small>
          </div>
        )}

        {error && <p style={{ color: '#f87171' }}>{error}</p>}
      </form>

      {blobUrl && (
        <div className="card">
          <div>URL: <a href={blobUrl} target="_blank" rel="noreferrer">{blobUrl}</a></div>
        </div>
      )}
    </main>
  );
}
