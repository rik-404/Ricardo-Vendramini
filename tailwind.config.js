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
          deep: '#040705',
          dark: '#070d0b',
          card: '#0a1410',
          hover: '#0f1f18',
          border: 'rgba(0, 242, 254, 0.15)',
        },
        brand: {
          cyan: '#00f2fe',
          cyanDark: '#00838f',
          dark: '#0c2e17',
          emerald: '#059669',
          primary: '#10b981',
          accent: '#22c55e',
          neon: '#00ff88',
          glow: 'rgba(0, 255, 136, 0.2)',
          glowCyan: 'rgba(0, 242, 254, 0.2)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(0, 255, 136, 0.2), 0 0 15px rgba(0, 242, 254, 0.15)',
        'glow-md': '0 0 30px rgba(0, 255, 136, 0.3), 0 0 25px rgba(0, 242, 254, 0.2)',
        'glow-lg': '0 0 50px rgba(0, 255, 136, 0.4), 0 0 40px rgba(0, 242, 254, 0.25)',
        'glow-cyan': '0 0 30px rgba(0, 242, 254, 0.3)',
      },
      backgroundImage: {
        'gradient-cyan-green': 'linear-gradient(135deg, #00f2fe 0%, #10b981 50%, #00ff88 100%)',
        'gradient-cyan-emerald': 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(0, 255, 136, 0.15) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 30%, rgba(0, 242, 254, 0.12) 0%, rgba(0, 255, 136, 0.12) 40%, rgba(4, 7, 5, 0) 70%)',
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
