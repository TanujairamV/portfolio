/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'dark-bg': 'var(--bg-primary)',
        'light-bg': 'var(--bg-primary)',
        'dark-text': 'var(--text-primary)',
        'light-text': 'var(--text-primary)',
        'dark-text-secondary': 'var(--text-secondary)',
        'light-text-secondary': 'var(--text-secondary)',
        'dark-card': 'var(--card-bg)',
        'light-card': 'var(--card-bg)',
        'accent-magenta': 'var(--accent-magenta)',
        'accent-cyan': 'var(--accent-cyan)',
        'accent-purple': 'var(--accent-purple)',
      },
      backgroundOpacity: {
        10: '0.1',
        50: '0.5',
        80: '0.8',
      },
    },
  },
  plugins: [],
};
