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
    },
    colors: {
      'yellow': {
        light: ' #fbbd51',
        DEFAULT: '#f9b122',
        dark: '#ed9a00'
      },
      'summerblue': {
        light: '#21b5ea',
        DEFAULT: '#0093c6',
        dark: '#006b8c'
      },
      'mint': {
        light: '#8ccaae',
        DEFAULT: '#6cbe99',
        dark: '#49ad83'
      },
      'lavender': {
        light: '#f0eff9',
        DEFAULT: '#d2cde8',
        dark: '#bdb5da'
      }
    }
  },
  plugins: [],
}

