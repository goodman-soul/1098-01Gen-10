/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "8rem",
      },
    },
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#1A1A1A",
          50: "#F5F5F5",
          100: "#E8E8E8",
          200: "#D1D1D1",
          300: "#B3B3B3",
          400: "#8A8A8A",
          500: "#666666",
          600: "#4D4D4D",
          700: "#333333",
          800: "#262626",
          900: "#1A1A1A",
          950: "#0D0D0D",
        },
        champagne: {
          DEFAULT: "#D4AF37",
          50: "#FDF9ED",
          100: "#FBF1D2",
          200: "#F6E2A1",
          300: "#F0D06B",
          400: "#E9BF42",
          500: "#D4AF37",
          600: "#AF8D2B",
          700: "#856821",
          800: "#5E4918",
          900: "#3A2C0F",
        },
        burgundy: {
          DEFAULT: "#8B0000",
          50: "#FFF1F1",
          100: "#FFE0E0",
          200: "#FFB8B8",
          300: "#FF8787",
          400: "#FF4D4D",
          500: "#F52222",
          600: "#C71010",
          700: "#8B0000",
          800: "#6B0000",
          900: "#4A0000",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Noto Serif SC"', 'serif'],
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'ring-expand': 'ring-expand 1.8s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.5)' },
          '50%': { boxShadow: '0 0 0 12px rgba(212, 175, 55, 0)' },
        },
        'ring-expand': {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F0D06B 50%, #D4AF37 100%)',
        'charcoal-gradient': 'linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%)',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 10px 40px rgba(212, 175, 55, 0.35)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
