// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#915EFF',
        secondary: '#AAAAAA',
        tertiary: '#151030',
        'black-100': '#100D25',
        'black-200': '#090325',
        'white-100': '#F3F3F3',
        accent: 'var(--color-accent)',
        'accent-light': 'var(--color-accent-light)',
        pink: colors.pink,
        cyan: colors.cyan, // ✅ Ensure cyan-500 is available
      },
      boxShadow: {
        card: '0px 35px 120px -15px #211E35',
      },
      screens: {
        xs: '450px',
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 5px #915EFF, 0 0 10px #915EFF, 0 0 15px #915EFF',
          },
          '100%': {
            boxShadow: '0 0 10px #915EFF, 0 0 20px #915EFF, 0 0 30px #915EFF',
          },
        },
      },
    },
  },
  plugins: [],
}
