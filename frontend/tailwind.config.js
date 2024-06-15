/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        linear: "linear-gradient(90deg, #FF527B, #3E1FFF)",
      },
      colors: {
        primary: "#9334DF",
        secondary: "#0F121A",
        contrast: "#0B1228",
        landing: "#07090D",
        features: "#10151E",
      },
      boxShadow: {
        "right-lg":
          "8px 8px 18px -3px rgba(0, 0, 0, 0.1), -8px -8px 8px -2px rgba(0, 0, 0, 0.05)",
        "hover-right-lg":
          "-15px 0px 18px -3px rgba(0, 0, 0, 0.2), 15px 0px 8px -2px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
