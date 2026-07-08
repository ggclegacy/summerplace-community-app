/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#07111f",
        harbor: "#0d2f5b",
        steel: "#8fa0b5",
        graphite: "#202832",
        frost: "#f6f9fc",
        aqua: "#7fd6ff",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(80, 170, 255, 0.18)",
        glass: "0 20px 60px rgba(1, 8, 18, 0.32)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
