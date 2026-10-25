// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void: '#05070D',
        ink: '#0C1018',
        bone: '#ECEAE3',
        mute: '#8B92A5',
        line: 'rgba(236,234,227,0.12)',
        accent: '#7CF5C8',
        amber: '#FFB86B',
        ice: '#8FB8FF',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
