/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#061a2a",
        harbor: "#176b93",
        steel: "#9aa6af",
        graphite: "#2f3942",
        frost: "#f7fbff",
        aqua: "#a9dceb",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(72, 151, 188, 0.22)",
        glass: "0 20px 60px rgba(6, 26, 42, 0.34)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
