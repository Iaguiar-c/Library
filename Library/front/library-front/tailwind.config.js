/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
          colors: {
            primary: {
              50: "#FBF7FD",
              100: "#F6ECFB",
              200: "#eeddf7",
              300: "#DBB6EE",
              400: "#CD9AE6",
              500: "#B972DA",
              600: "#A554C9",
              700: "#8f41af",
              800: "#783990",
              900: "#622F74",
              950: "#431853"
            }
          }
        }
    },
  plugins: [],
}

