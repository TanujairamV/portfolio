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
        background: ({ opacityValue }) => `rgba(var(--background-rgb, 15, 15, 15), ${opacityValue})`,
        foreground: ({ opacityValue }) => `rgba(var(--foreground-rgb, 250, 250, 250), ${opacityValue})`,
        subheading: ({ opacityValue }) => `rgba(var(--subheading-rgb, 161, 161, 170), ${opacityValue})`,
        heading: ({ opacityValue }) => `rgba(var(--heading-rgb, 250, 250, 250), ${opacityValue})`,
        accent: ({ opacityValue }) => `rgba(var(--accent-rgb, 107, 70, 193), ${opacityValue})`,
        secondary: ({ opacityValue }) => `rgba(var(--secondary-rgb, 255, 106, 193), ${opacityValue})`,
      },
    },
  },
  plugins: [],
};
