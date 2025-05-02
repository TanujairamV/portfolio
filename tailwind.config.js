/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        'fira-sans': ['Fira Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        'dancing-script': ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}
