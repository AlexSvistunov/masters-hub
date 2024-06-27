import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.5)',
        'gray-border': '#E1EAF5',
      }
    },
  },
  plugins: [
    daisyui,
  ],

  daisyui: {
    themes: ['light', 'dark']
  }
}