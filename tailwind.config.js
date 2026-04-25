/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        floatYWide: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(2px, -14px, 0)' },
        },
      },
      animation: {
        'float-soft': 'floatY 5.2s ease-in-out infinite',
        'float-gentle': 'floatY 4.4s ease-in-out infinite',
        'float-wide': 'floatYWide 6.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

