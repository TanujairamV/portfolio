/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cabinet-grotesk': ['"Cabinet Grotesk"', 'sans-serif'],
        ranade: ['Ranade', 'sans-serif'],
        'dancing-script': ['"Dancing Script"', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
