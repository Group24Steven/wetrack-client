/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css,scss,sass,less,styl}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '1/2': '50%',
        '1/3': '33%',
      },
      padding: {
        'p-1/2': '0,5rem',
      }
    },
  },
  plugins: [],
}

