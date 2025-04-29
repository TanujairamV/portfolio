/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'accent-yellow': 'var(--accent-yellow)',
        'card-bg': 'var(--card-bg)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-accent-yellow',
    'text-accent-yellow',
    'border-accent-yellow',
    'hover:bg-accent-yellow',
    'hover:text-bg-primary',
    'backdrop-blur-md',
  ],
};
