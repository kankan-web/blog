/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 亮色主题
        light: {
          primary: '#ffffff',
          secondary: '#f3f4f6',
          accent: '#3b82f6',
          text: {
            primary: '#111827',
            secondary: '#4b5563',
            accent: '#3b82f6',
          },
          border: '#e5e7eb',
          hover: '#f9fafb',
        },
        // 暗色主题
        dark: {
          primary: '#111827',
          secondary: '#1f2937',
          accent: '#60a5fa',
          text: {
            primary: '#f9fafb',
            secondary: '#d1d5db',
            accent: '#60a5fa',
          },
          border: '#374151',
          hover: '#374151',
        },
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        accent: 'var(--accent)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        accent: 'var(--text-accent)',
      },
    },
  },
  plugins: [],
}
