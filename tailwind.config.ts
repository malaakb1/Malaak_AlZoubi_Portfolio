import type { Config } from 'tailwindcss';

/**
 * ── Malaak Al Zoubi — "Wine & Plum" identity (single dark theme) ─────────────
 * Palette:
 *   Wine/Raspberry #853953 → `primary`  (main action, links, active, highlights)
 *   Plum           #612D53 → `magenta`  (secondary accent / tags / gradients)
 *   Mauve (derived)        → `lavender` (tertiary accent)
 *   Dusty Rose (derived)   → `gold`     (counters / soft badges)
 *   Light-gray #F3F4F4 → text · Charcoal-plum → background
 * On the dark base, accent TEXT uses bright shades (300–400); accent FILLS use
 * 500–600 with light `cream` text.
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
        // ── Wine → primary ──────────────────────────────────────────────────
        primary: {
          DEFAULT: '#853953',
          50:  '#F7EAEE',
          100: '#ECCAD5',
          200: '#DBA0B2',
          300: '#C77E93',
          400: '#B8536F',
          500: '#A24460',
          600: '#853953',
          700: '#6E2F45',
          800: '#522334',
          900: '#371722',
        },
        // ── Plum → magenta (secondary) ──────────────────────────────────────
        magenta: {
          DEFAULT: '#612D53',
          50:  '#F3E9F0',
          100: '#E0C6D9',
          200: '#C79BBB',
          300: '#A96B96',
          400: '#8E4E7C',
          500: '#743F65',
          600: '#612D53',
          700: '#4E2443',
          800: '#3A1B32',
          900: '#271221',
        },
        // ── Mauve → lavender (tertiary) ─────────────────────────────────────
        lavender: {
          DEFAULT: '#A673A0',
          50:  '#F6EFF6',
          100: '#E9D8E8',
          200: '#D5B7D2',
          300: '#BE93BA',
          400: '#A673A0',
          500: '#8E5A88',
          600: '#74476F',
          700: '#5B3757',
          800: '#422840',
          900: '#2C1A2B',
        },
        // ── Dusty Rose → gold (counters / soft badges) ──────────────────────
        gold: {
          DEFAULT: '#D3757F',
          50:  '#FCEFF1',
          100: '#F6D9DC',
          200: '#ECB7BD',
          300: '#E0949D',
          400: '#D3757F',
          500: '#BC5B66',
          600: '#9C4751',
          700: '#7B383F',
          800: '#59292F',
          900: '#3A1B1F',
        },
        // ── Charcoal-plum neutrals (overlays / thumbnails / button text) ─────
        ink: {
          950: '#1A161C',
          900: '#221D26',
          850: '#2A2430',
          800: '#322A3A',
          700: '#3E3448',
          600: '#4C4057',
          500: '#5F5069',
        },
        warm: {
          50:  '#F4F2F3',
          100: '#E6E1E4',
          200: '#CBC2C7',
          300: '#AB9FA7',
          400: '#877A84',
          500: '#665A63',
          600: '#4C424A',
          700: '#372F36',
          800: '#241E24',
          900: '#161217',
        },
        blush: '#853953',
        cream: '#F3F4F4',
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
          'linear-gradient(120deg, #A24460 0%, #612D53 55%, #8E5A88 100%)',
        'gradient-mint-pink':
          'linear-gradient(135deg, #A24460 0%, #612D53 100%)',
        'gradient-pink-purple':
          'linear-gradient(135deg, #853953 0%, #8E5A88 100%)',
        'gradient-hero':
          'radial-gradient(60% 60% at 15% 10%, rgba(133,57,83,0.24) 0%, transparent 60%), radial-gradient(55% 55% at 90% 20%, rgba(97,45,83,0.22) 0%, transparent 60%), radial-gradient(50% 50% at 70% 90%, rgba(166,115,160,0.16) 0%, transparent 60%)',
      },
      backgroundSize: {
        'grid': '44px 44px',
      },
      boxShadow: {
        'soft':        '0 2px 24px 0 rgba(0,0,0,0.4)',
        'card':        '0 8px 30px -12px rgba(0,0,0,0.55)',
        'card-hover':  '0 16px 50px -14px rgba(133,57,83,0.35)',
        'glow':        '0 0 40px -6px rgba(133,57,83,0.5)',
        'glow-mint':   '0 0 42px -8px rgba(166,115,160,0.42)',
        'glow-pink':   '0 0 42px -8px rgba(133,57,83,0.5)',
        'glow-purple': '0 0 50px -10px rgba(97,45,83,0.5)',
        'glow-gold':   '0 0 40px -10px rgba(211,117,127,0.42)',
      },
    },
  },
  plugins: [],
};

export default config;
