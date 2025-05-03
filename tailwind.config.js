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
        dark: '#0A0A0A',
        light: '#F5F5F5',
        accent: '#6B46C1',
        hover: '#FFD700',
      },
    },
  },
  plugins: [],
};
