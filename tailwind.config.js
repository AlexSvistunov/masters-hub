import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'minimal-size': '360px',
      
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }
      'default-tablet' : '768px',

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
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