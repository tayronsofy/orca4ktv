/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./page-components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Orca Deep Sea palette
        'orca-navy': {
          DEFAULT: '#001f3f',
          deeper: '#000a1c',
          deepest: '#00050d',
          surface: '#001a36',
          elevated: '#002952',
          dark: '#001530',
          mid: '#001737',
        },
        'orca-cyan': {
          DEFAULT: '#00E5FF',
          dim: '#22D3EE',
        },
        'orca-blue': {
          DEFAULT: '#003580',
          dark: '#003566',
          mid: '#0066CC',
        },
      },
    },
  },
  plugins: [],
}
