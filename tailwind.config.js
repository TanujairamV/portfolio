module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        seafoam: {
          100: '#E6F3F3',
          200: '#CDE7E8',
          500: '#A7D8D9',
          600: '#8CC6C7',
          700: '#70B4B5',
          800: '#559FA0',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
