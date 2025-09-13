// app/api/auth/[...nextauth]/route.js

// Mengimpor 'handlers' dari file auth.ts Anda yang ada di dalam folder /lib
import { handlers } from '@/lib/auth';

// Mengekspor metode GET dan POST dari handlers agar Next.js bisa menggunakannya
export const { GET, POST } = handlers;