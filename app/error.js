// app/error.js
'use client';

export default function GlobalError({ error, reset }) {
  console.error('🔴 Caught global error:', error);

  return (
    <html>
      <body>
        <h2>Terjadi error: {error.message}</h2>
        <button onClick={() => reset()}>Coba Lagi</button>
      </body>
    </html>
  );
}
