/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981',      // Vibrant emerald
        accent: '#f59e0b',       // Modern amber
        background: '#f9fafb',   // Soft light background
        darkBg: '#1f2937',       // Deep gray for dark mode
        surface: '#ffffff',      // Card backgrounds
        muted: '#6b7280',        // Muted text
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [],
}
