/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      black:       '#0a0a0a',
      white:       '#ffffff',
      transparent: 'transparent',
      current:     'currentColor',
      gray: {
        50:  '#f9f9f9',
        100: '#eeeeee',
        200: '#d4d4d4',
        300: '#b0b0b0',
        400: '#888888',
        500: '#666666',
        600: '#444444',
        700: '#2e2e2e',
        800: '#1c1c1c',
        900: '#111111',
      },
      gold: {
        light:   '#e8c97a',
        DEFAULT: '#c9a84c',
        dark:    '#a07830',
      },
    },
    fontFamily: {
      display: ['Couture', 'sans-serif'],
      heading: ['Couture', 'sans-serif'],
      body:    ['Montserrat', 'sans-serif'],
      sans:    ['Montserrat', 'sans-serif'],
    },
    extend: {
      borderRadius: {
        'xl':  '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '3rem',
      },
    },
  },
  plugins: [],
}
