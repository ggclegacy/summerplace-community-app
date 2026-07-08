/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#071B2A",
        harbor: "#0078A8",
        steel: "#A7B0B5",
        graphite: "#414A50",
        frost: "#F5F8FA",
        aqua: "#A8D8EA",
        deepnavy: "#0A1F30",
        ocean: "#005F86",
        deepblue: "#003F5F",
        darkgraphite: "#2F363A",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(168, 216, 234, 0.2)",
        glass: "0 24px 70px rgba(7, 27, 42, 0.38)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
