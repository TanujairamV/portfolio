module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'cabinet-grotesk': ['Cabinet Grotesk', 'sans-serif'],
        ranade: ['Ranade', 'sans-serif'],
        'dancing-script': ['Dancing Script', 'cursive'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        dark: '#080808',
        light: '#F8F8F8',
        accent: '#6B46C1',
        secondary: '#FF6AC1',
        hover: '#FFD700',
      },
    },
  },
  plugins: [],
};
