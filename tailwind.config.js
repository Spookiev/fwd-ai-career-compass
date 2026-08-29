/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        kpi: {
          coral: 'var(--kpi-coral, #F14938)',
          navy: 'var(--kpi-navy, #1F3668)',
          light: 'var(--kpi-light, #FFFFFF)',
          purple: 'var(--kpi-purple, #4D3380)',
        },
        theme: {
          primary: 'var(--theme-primary, #8B5CF6)',
          accent: 'var(--theme-accent, #EC4899)',
          surface: 'var(--theme-surface, rgba(30, 23, 56, 0.75))',
          bg: 'var(--theme-bg, #120E1E)',
          glow: 'var(--theme-glow, rgba(139, 92, 246, 0.4))',
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow': '0 0 25px var(--theme-glow, rgba(139, 92, 246, 0.35))',
        'coral-glow': '0 0 25px rgba(241, 73, 56, 0.35)',
        'neon': '0 0 15px currentColor',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
