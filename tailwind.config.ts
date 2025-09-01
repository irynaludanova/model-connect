/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#2563eb",
        primaryDark: "#1e40af",
        error: "#dc2626",
        text: "#1a202c",
        muted: "#4a5568",
        background: "#f8f9fa",
      },
    },
  },
  plugins: [],
}
