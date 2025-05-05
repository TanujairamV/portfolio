/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'cabinet-grotesk': ['Cabinet Grotesk', 'sans-serif'],
        ranade: ['Ranade', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        subheading: 'var(--subheading)',
        heading: 'var(--heading)',
        accent: 'var(--accent)',
        secondary: 'var(--secondary)',
      },
    },
  },
  plugins: [],
};
