/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        chillax: ['Chillax', 'sans-serif'],
        'plus-jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'general-sans': ['General Sans', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
        'clash-grotesk': ['Clash Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
