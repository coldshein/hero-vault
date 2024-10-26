/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "white-bg": "#f1f1f1",
        "main-text": "#000000",
        "accent": "#C33C54",
        "secondary-accent": "#1876D1",
        "secondary-bg": "#FFFFFF",
      },
    },
  },
  plugins: [],
};
