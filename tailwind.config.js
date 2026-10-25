// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void: 'rgb(var(--void) / <alpha-value>)',
        bone: 'rgb(var(--bone) / <alpha-value>)',
        mute: 'rgb(var(--mute) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        amber: 'rgb(var(--amber) / <alpha-value>)',
        ice: 'rgb(var(--ice) / <alpha-value>)',
        line: 'rgb(var(--bone) / 0.12)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
