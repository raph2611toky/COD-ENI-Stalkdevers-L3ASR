/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        linear: "linear-gradient(90deg, #7F31FF 20%, #2BB2FF)",
      },
      colors: {
        primary: "#7F31FF",
        secondary: "#0F121A",
        contrast: "#0B1228",
        landing: "#07090D",
        features: "#10151E",
        error: "#B60909",
        warning: "#FF9A15",
        success: "#084F20"
      },
    },
  },
  plugins: [],
};
