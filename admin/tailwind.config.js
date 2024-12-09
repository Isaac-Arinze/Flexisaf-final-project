/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",          // Make sure to include index.html and all JSX/TSX files
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors:{
          'primary':'#5F6FFF'
        }
      },
    },
    plugins: [],
  }