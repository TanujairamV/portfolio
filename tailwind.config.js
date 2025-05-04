module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: 'class',
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
        dark: '#121212',
        light: '#FFFFFF',
        accent: '#6B46C1',
        secondary: '#FF6AC1',
        hover: '#FFD700',
      },
    },
  },
  plugins: [],
};
