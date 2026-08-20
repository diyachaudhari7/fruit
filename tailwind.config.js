/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        secondary: '#66BB6A',
        lightGreen: '#E8F5E9',
        accent: '#FF9800',
        background: '#FAFAF7',
        textMain: '#263238',
        textMuted: '#607D8B',
        error: '#D32F2F',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
