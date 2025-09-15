// app/page.js

'use client';

import dynamic from 'next/dynamic';

// Import komponen dengan SSR dimatikan agar tidak error di server
const Header = dynamic(() => import('@/components/Header'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });

export default function HomePage() {
return (
<>
<Header />
<main>
<Hero />
{/* Tambahkan komponen lain di sini seperti: /}
{/ <Kategori /> /}
{/ <Harga /> /}
{/ <Fitur /> /}
{/ <Testimoni /> /}
{/ <FAQ /> /}
{/ <Footer /> */}
</main>
</>
);
}