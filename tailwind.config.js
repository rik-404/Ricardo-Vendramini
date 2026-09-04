/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          deep: '#09090b',
          dark: '#0e0e11',
          card: '#141417',
          hover: '#1c1c21',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        brand: {
          cyan: '#f8fafc',
          cyanDark: '#94a3b8',
          dark: '#18181b',
          emerald: '#71717a',
          primary: '#ffffff',
          accent: '#e4e4e7',
          neon: '#ffffff',
          glow: 'rgba(255, 255, 255, 0.15)',
          glowCyan: 'rgba(241, 245, 249, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(255, 255, 255, 0.12), 0 0 25px rgba(255, 255, 255, 0.05)',
        'glow-md': '0 0 30px rgba(255, 255, 255, 0.18), 0 0 35px rgba(255, 255, 255, 0.08)',
        'glow-lg': '0 0 50px rgba(255, 255, 255, 0.25)',
        'glow-cyan': '0 0 30px rgba(255, 255, 255, 0.2)',
      },
      backgroundImage: {
        'gradient-cyan-green': 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)',
        'gradient-cyan-emerald': 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, rgba(9, 9, 11, 0) 70%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
