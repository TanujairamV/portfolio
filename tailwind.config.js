/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
      },
      colors: {
        background: 'var(--background)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'accent-purple': 'var(--accent-purple)',
        'card-bg': 'var(--card-bg)',
        'input-bg': 'var(--input-bg)',
      },
    },
  },
  plugins: [],
}
