# yuknikah — Undangan Digital

Aplikasi undangan pernikahan digital berbasis Next.js App Router dengan backend API Route Handlers dan database Turso (libSQL), siap deploy di Vercel [21].  

## Teknologi
- Next.js App Router untuk frontend dan backend dalam satu repo (Route Handlers di app/api) [21].  
- Turso (libSQL) via @libsql/client untuk koneksi database dari server code [22].  
- Vercel untuk hosting, dengan environment variables dikelola di Project Settings [23].  

## Struktur Proyek
Struktur mengikuti konvensi App Router: page.js untuk UI per rute dan route.js untuk handler HTTP per endpoint API [21].  
