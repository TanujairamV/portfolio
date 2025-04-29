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
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #1A1A1A, #2A2A2A, #3A3A3A)',
        'gradient-nav': 'linear-gradient(135deg, rgba(26,26,26,0.9), rgba(58,58,58,0.7))',
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
    'bg-gradient-dark',
    'bg-gradient-nav',
  ],
};
