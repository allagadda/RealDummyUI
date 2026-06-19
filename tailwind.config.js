/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1a5c38',
          dark: '#134528',
          light: '#e8f5ee',
        },
      },
    },
  },
  plugins: [],
}

