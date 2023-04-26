/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        100: "100%",
      },
      colors: {
        red: "#dc2430",
        yellow: "#FCD354",
        purple: "#7b4397",
        lightYellow: "#fcd354",
      },
      screens: {
        ipad: "430px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
