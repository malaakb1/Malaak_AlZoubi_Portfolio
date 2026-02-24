import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C4829A',
          50:  '#FDF2F5',
          100: '#FAE5EC',
          200: '#F5C8D9',
          300: '#EDA5BE',
          400: '#D9849E',
          500: '#C4829A',
          600: '#A6607A',
          700: '#87455D',
          800: '#692E45',
          900: '#4D1E31',
        },
        lavender: {
          DEFAULT: '#9B8EC4',
          50:  '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#B09BD4',
          500: '#9B8EC4',
          600: '#7C6AAF',
          700: '#5D4A96',
          800: '#3F2F7A',
          900: '#24175F',
        },
        blush: '#F5E6EC',
        cream: '#F5F1EC',
        warm: {
          50:  '#FAFAF8',
          100: '#F5F1EC',
          200: '#EDE6DD',
          300: '#E0D6CA',
          400: '#CFC2B3',
          500: '#B5A594',
          600: '#9A8877',
          700: '#7F6C5C',
          800: '#645244',
          900: '#493A30',
        },
      },
      fontFamily: {
        serif:  ['var(--font-el-messiri)', 'El Messiri', 'sans-serif'],
        sans:   ['var(--font-el-messiri)', 'El Messiri', 'sans-serif'],
        arabic: ['var(--font-el-messiri)', 'El Messiri', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease forwards',
        'slide-up':   'slideUp 0.6s ease forwards',
        'slide-down': 'slideDown 0.4s ease forwards',
        'float':      'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(196,130,154,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(196,130,154,0.07) 1px, transparent 1px)',
        'grid-pattern-dark':
          'linear-gradient(to right, rgba(196,130,154,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(196,130,154,0.05) 1px, transparent 1px)',
        'gradient-rose-lavender':
          'linear-gradient(135deg, #F5E6EC 0%, #EDE9FE 100%)',
        'gradient-hero':
          'linear-gradient(160deg, #FDF2F5 0%, #F5F1EC 50%, #F0EDF8 100%)',
        'gradient-hero-dark':
          'linear-gradient(160deg, #0D0D14 0%, #12101A 50%, #0F0D18 100%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      boxShadow: {
        'soft':   '0 2px 24px 0 rgba(196,130,154,0.08)',
        'card':   '0 4px 32px 0 rgba(28,28,30,0.06)',
        'card-hover': '0 8px 48px 0 rgba(196,130,154,0.18)',
        'glow':   '0 0 32px 0 rgba(196,130,154,0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
