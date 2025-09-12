// app/(admin)/media/list/page.js
import { list } from '@vercel/blob';
import Image from 'next/image';

export const revalidate = 0;

export default async function MediaListPage() {
  const { blobs } = await list(); // bisa dipakai dengan filter prefix bila diperlukan
  return (
    <main className="container">
      <h1>Media (Blob)</h1>
      <div className="grid">
        {blobs.map((b, i) => (
          <div className="card" key={b.pathname}>
            <Image
              priority={i < 2}
              src={b.url}
              alt={b.pathname}
              width={240}
              height={240}
            />
            <small>{b.pathname}</small>
          </div>
        ))}
      </div>
    </main>
  );
}
