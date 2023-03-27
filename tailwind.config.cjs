/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        '100': '100%',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
