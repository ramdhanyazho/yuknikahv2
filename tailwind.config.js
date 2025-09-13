/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Menambahkan warna pink dari logo Anda
        'theme-pink': '#F3C4D4',
        'theme-dark-text': '#333333',
      },
      fontFamily: {
        // Menambahkan font script yang mirip logo
        'script': ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
};