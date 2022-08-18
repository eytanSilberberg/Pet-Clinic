/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      priClr: '#CBE7DE',
      secClr: '#F8EEB7',
      textureClr: ' #C5D3DE',
      borderClr: '#7F8180',
      primary: "#4D4DFE",
      shadowClr: '#18181B',
      white: '#FFFFFF',
      red: '#F36464',
      body: '#F7FBFF'
    },
    screens: {
      'xs': '400px',
      ...defaultTheme.screens,
    },
    fontFamily: {
      mono: ["ui-monospace", "monospace"],
      sans: ["ui-serif", "sans-serif"],
      serif: ["Roboto", "sans-serif"],
      display: ["Oswald", "sans-serif"],
      body: ["Roboto", "sans-serif"],
    },
    extend: {
      gridTemplateRows: {
        "auto-1fr": "auto 1fr",
      },
      gridTemplateColumns: {
        'main-layout': '30px 1fr 30px'
      }
    },
  },
  plugins: [function ({ addVariant }) {
    addVariant('child', '& > *');
    addVariant('child-hover', '& > *:hover');
  }],
};
