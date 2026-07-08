/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#07131C",
        harbor: "#006F98",
        steel: "#9FAAB0",
        graphite: "#27323A",
        frost: "#F5F8FA",
        aqua: "#B5C0C6",
        deepnavy: "#101820",
        ocean: "#006F98",
        deepblue: "#004B68",
        darkgraphite: "#1A232A",
        silver: "#D7DEE2",
        gunmetal: "#3A444B",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(168, 216, 234, 0.13)",
        glass: "0 24px 70px rgba(7, 19, 28, 0.42)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
