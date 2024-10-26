/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "white-bg": "#f1f1f1", // Основний темний фон
        "main-text": "#000000", // Колір тексту
        "accent": "#C33C54", // Акцентний колір
        "secondary-accent": "#1876D1",
        "secondary-bg": "#FFFFFF", // Додатковий фон

        "dark-bg": "#0E1117",
        "dark-text": "#F0F6FB",
        "":"",
        "":"",
        "dark-secondary-bg": "#151B23",
      },
    },
  },
  plugins: [],
};
