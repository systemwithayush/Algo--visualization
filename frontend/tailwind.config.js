/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-color)',
        card: 'var(--card-bg)',
        primary: 'var(--primary-color)',
        secondary: 'var(--text-secondary)',
        border: 'var(--border-color)',
      }
    },
  },
  plugins: [],
}
