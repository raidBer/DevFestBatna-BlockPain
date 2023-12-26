/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      serif: ["DM Serif Display", "serif"],
    },

    extend: {
      colors: {
        green: "#A1EDB1",
        red: "#EF3920",
        darkBlue: "#0E1218",
        darkGreen: "#10151A",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
