/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wmu-green': '#003366',
        'wmu-gold': '#FFD700',
        'energy-green': '#10B981',
        'energy-blue': '#3B82F6',
        'energy-orange': '#F97316',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
