/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: [
        '"Noto Sans SC"',
        '"Source Han Sans SC"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['"Noto Serif SC"', '"Source Han Serif SC"', '"Source Han Serif"', 'serif'],
      mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    extend: {
      colors: {
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        primary: {
          light: '#4f46e5',
          dark: '#818cf8',
        },
      },
      textColor: {
        primary: 'rgb(var(--color-text-primary))',
        secondary: 'rgb(var(--color-text-secondary))',
      },
      backgroundColor: {
        root: 'rgb(var(--color-bg-root))',
        primary: 'rgb(var(--color-bg-primary))',
        secondary: 'rgb(var(--color-bg-secondary))',
      },
      borderColor: {
        primary: 'rgb(var(--color-border-primary))',
        post: 'rgb(var(--post-border))',
      },
      minHeight: {
        main: 'calc(100vh - 200px)',
      },
      transitionProperty: {
        'bg-color': 'background-color',
      },
      zIndex: {
        1: '1',
      },
    },
  },
  plugins: [],
}
