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
        'accent-purple': 'var(--accent-purple)',
        'card-bg': 'var(--card-bg)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #1A1A1A, #4B0082, #2A2A2A)',
        'gradient-nav': 'linear-gradient(135deg, rgba(26,26,26,0.9), rgba(58,58,58,0.7))',
      },
      fontSize: {
        '2.25rem': '2.25rem',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-accent-purple',
    'text-accent-purple',
    'border-accent-purple',
    'hover:bg-accent-purple',
    'hover:text-bg-primary',
    'backdrop-blur-md',
    'bg-gradient-dark',
    'bg-gradient-nav',
  ],
};
