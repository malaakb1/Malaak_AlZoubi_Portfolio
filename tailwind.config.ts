import type { Config } from 'tailwindcss';

/**
 * ── Malaak Al Zoubi — "Cyber Feminine AI" design tokens ──────────────────────
 * Palette:
 *   Neon Mint     #00E0BA  → `primary`  (main action, links, active, highlights)
 *   Deep Purple   #91008D  → `lavender` (gradients, secondary surfaces, glow)
 *   Hot Pink      #FF3483  → `magenta`  (hover glow, labels, emphasis)
 *   Electric Yellow #FFCF00 → `gold`    (limited accents, counters, badges)
 * Existing components reference `primary-*` / `lavender-*`; repointing those
 * scales flows the new identity everywhere without breaking class names.
 */
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
        // ── Neon Mint → primary action ──────────────────────────────────────
        primary: {
          DEFAULT: '#00E0BA',
          50:  '#E6FFFA',
          100: '#C0FFF2',
          200: '#87FCE6',
          300: '#4DF4D7',
          400: '#1EEBC8',
          500: '#00E0BA',
          600: '#00B89A',
          700: '#048D78',
          800: '#0A6C5D',
          900: '#0C4B42',
        },
        // ── Deep Purple → gradients / secondary ─────────────────────────────
        lavender: {
          DEFAULT: '#91008D',
          50:  '#FBE9FA',
          100: '#F5C9F3',
          200: '#EA97E6',
          300: '#DD63D8',
          400: '#C633BF',
          500: '#91008D',
          600: '#7C0079',
          700: '#640563',
          800: '#4C0A4B',
          900: '#360935',
        },
        // ── Hot Pink → hover glow / labels ──────────────────────────────────
        magenta: {
          DEFAULT: '#FF3483',
          50:  '#FFE9F1',
          100: '#FFCCDF',
          200: '#FF99BF',
          300: '#FF66A0',
          400: '#FF4D90',
          500: '#FF3483',
          600: '#E01466',
          700: '#B30B4F',
          800: '#850739',
          900: '#5C0526',
        },
        // ── Electric Yellow → limited accent / counters ─────────────────────
        gold: {
          DEFAULT: '#FFCF00',
          50:  '#FFFBE6',
          100: '#FFF4B8',
          200: '#FFEA7A',
          300: '#FFDF3D',
          400: '#FFD41F',
          500: '#FFCF00',
          600: '#D9AF00',
          700: '#A88700',
          800: '#7A6200',
          900: '#4D3E00',
        },
        // ── Cyber-dark neutrals ─────────────────────────────────────────────
        ink: {
          950: '#050507',
          900: '#0B0610',
          850: '#120B18',
          800: '#1A1024',
          700: '#241633',
          600: '#332145',
          500: '#463159',
        },
        // Soft neutral (used by toggles / muted chrome) — repurposed warm scale
        warm: {
          50:  '#FFF8FB',
          100: '#F1ECF4',
          200: '#DAD2E2',
          300: '#BEB4C8',
          400: '#9A8DA8',
          500: '#77697F',
          600: '#574C60',
          700: '#3D3446',
          800: '#221A2E',
          900: '#140D1C',
        },
        blush: '#FF3483',
        cream: '#FFF8FB',
      },
      fontFamily: {
        serif:  ['var(--font-el-messiri)', 'El Messiri', 'sans-serif'],
        sans:   ['var(--font-el-messiri)', 'El Messiri', 'sans-serif'],
        arabic: ['var(--font-el-messiri)', 'El Messiri', 'sans-serif'],
        display:['var(--font-el-messiri)', 'El Messiri', 'sans-serif'],
        mono:   ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        megatight: '-0.06em',
      },
      animation: {
        'fade-in':      'fadeIn 0.6s ease forwards',
        'slide-up':     'slideUp 0.6s ease forwards',
        'slide-down':   'slideDown 0.4s ease forwards',
        'float':        'float 7s ease-in-out infinite',
        'float-slow':   'float 11s ease-in-out infinite',
        'pulse-soft':   'pulseSoft 3s ease-in-out infinite',
        'gradient':     'gradientShift 6s ease infinite',
        'gradient-fast':'gradientShift 3.5s ease infinite',
        'aurora':       'aurora 18s ease-in-out infinite',
        'marquee':      'marquee var(--marquee-duration, 32s) linear infinite',
        'marquee-rev':  'marqueeRev var(--marquee-duration, 32s) linear infinite',
        'shimmer':      'shimmer 2.4s linear infinite',
        'glow-pulse':   'glowPulse 3.2s ease-in-out infinite',
        'spin-slow':    'spin 14s linear infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
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
          '50%':      { transform: 'translateY(-14px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.55' },
        },
        gradientShift: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)',       opacity: '0.55' },
          '33%':      { transform: 'translate3d(6%,-4%,0) scale(1.12)', opacity: '0.8'  },
          '66%':      { transform: 'translate3d(-5%,5%,0) scale(0.95)', opacity: '0.6'  },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        marqueeRev: {
          from: { transform: 'translateX(-50%)' },
          to:   { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%':      { opacity: '0.7',  transform: 'scale(1.06)' },
        },
      },
      backgroundImage: {
        'gradient-brand':
          'linear-gradient(120deg, #00E0BA 0%, #FF3483 50%, #91008D 100%)',
        'gradient-mint-pink':
          'linear-gradient(135deg, #00E0BA 0%, #FF3483 100%)',
        'gradient-pink-purple':
          'linear-gradient(135deg, #FF3483 0%, #91008D 100%)',
        'gradient-hero':
          'radial-gradient(60% 60% at 15% 10%, rgba(145,0,141,0.35) 0%, transparent 60%), radial-gradient(55% 55% at 90% 20%, rgba(255,52,131,0.28) 0%, transparent 60%), radial-gradient(50% 50% at 70% 90%, rgba(0,224,186,0.22) 0%, transparent 60%)',
      },
      backgroundSize: {
        'grid': '44px 44px',
      },
      boxShadow: {
        'soft':        '0 2px 24px 0 rgba(0,0,0,0.35)',
        'card':        '0 6px 34px -8px rgba(0,0,0,0.6)',
        'card-hover':  '0 14px 60px -12px rgba(255,52,131,0.35)',
        'glow':        '0 0 40px -6px rgba(0,224,186,0.5)',
        'glow-mint':   '0 0 42px -8px rgba(0,224,186,0.55)',
        'glow-pink':   '0 0 42px -8px rgba(255,52,131,0.55)',
        'glow-purple': '0 0 54px -10px rgba(145,0,141,0.6)',
        'glow-gold':   '0 0 40px -10px rgba(255,207,0,0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
