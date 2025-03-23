/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3771C8",
        secondary: "#007AFF",
        text: "#333333",
        iconsBg: "#E3DFF9",
        unselectedItem: "#717171",
        white: "#FEFEFE",
        cardBg: '#F5F5F5',
      },
    },
  },
  plugins: [],
};
