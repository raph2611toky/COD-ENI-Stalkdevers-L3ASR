/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        linear: "linear-gradient(90deg, #7F31FF 20%, #2BB2FF)",
      },
      colors: {
        primary: "#FF527B",
        secondary: "#0F121A",
        contrast: "#0B1228",
        landing: "#07090D",
        features: "#10151E",
      },
    },
  },
  plugins: [],
};
