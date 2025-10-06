/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffef7',
          100: '#fffce7',
          200: '#fef9c3',
          300: '#fef08a',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        luxury: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'luxury': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'luxury-pulse': 'luxury-pulse 2s ease-in-out infinite',
        'floating': 'floating 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'luxury-pulse': {
          '0%, 100%': {
            opacity: '0.3',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.5',
            transform: 'scale(1.05)',
          },
        },
        floating: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        shimmer: {
          '0%': {
            'background-position': '-200% 0',
          },
          '100%': {
            'background-position': '200% 0',
          },
        },
        glow: {
          '0%': {
            'box-shadow': '0 0 20px rgba(147, 51, 234, 0.3)',
          },
          '100%': {
            'box-shadow': '0 0 30px rgba(147, 51, 234, 0.5)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'luxury-lg': '0 35px 60px -12px rgba(0, 0, 0, 0.3)',
        'luxury-xl': '0 45px 70px -12px rgba(0, 0, 0, 0.35)',
        'gold': '0 10px 25px rgba(250, 204, 21, 0.3)',
        'purple': '0 10px 25px rgba(147, 51, 234, 0.3)',
      },
      gradientColorStops: {
        'luxury-start': '#667eea',
        'luxury-end': '#764ba2',
        'gold-start': '#f6d365',
        'gold-end': '#fda085',
      }
    },
  },
  plugins: [],
}