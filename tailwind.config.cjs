/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: "bg-hero",
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('images/pattern-bg.png')",
      },
    },
  },
  plugins: [],
};
