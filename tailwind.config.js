/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#6D263D',
          dark: '#4B192B',
          secondary: '#8A4053',
          light: '#8A4053',
          hover: '#5A1F32',
          subtle: '#FAF3F5',
        },
        ivory: {
          DEFAULT: '#F7F3EB',
          warm: '#F7F3EB',
          card: '#FFFCF7',
          pure: '#FFFFFF',
          muted: '#F0EAE0',
        },
        beige: {
          DEFAULT: '#E9DFD0',
          dark: '#D9CBBB',
          light: '#F4ECE2',
        },
        rose: {
          muted: '#D8B9B5',
          soft: '#EEDFDA',
        },
        antique: {
          DEFAULT: '#B58C72',
          light: '#C7A28A',
          dark: '#967058',
        },
        ink: {
          primary: '#302B29',
          secondary: '#82766F',
          muted: '#A2968F',
          faint: '#C0B7B0',
        },
        border: {
          DEFAULT: '#E8DED2',
          subtle: '#F0E8DC',
          dark: '#D8CDBC',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(75, 25, 43, 0.04)',
        'card': '0 4px 20px -2px rgba(75, 25, 43, 0.06)',
        'elevated': '0 12px 32px -4px rgba(75, 25, 43, 0.09)',
        'modal': '0 20px 48px -8px rgba(75, 25, 43, 0.16)',
      },
      borderRadius: {
        'refined': '8px',
        'card': '12px',
      }
    },
  },
  plugins: [],
};
