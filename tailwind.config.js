
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Asegúrate de que esta línea esté presente
  ],
  extend: {
    backgroundImage: {
      'app-bg': "url('./src/assets/BackApp.jpg')",
    }
  },
  plugins: [],
}