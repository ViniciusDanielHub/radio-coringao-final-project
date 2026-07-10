/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/**/*.{tsx,ts,html}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#fbf9f8',
          dim: '#dbdad9',
          'container-lowest': '#ffffff',
          'container-low': '#f5f3f3',
          container: '#efeded',
          'container-high': '#e9e8e7',
          variant: '#e4e2e2',
        },
        primary: {
          DEFAULT: '#000000',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#bc000c',
          foreground: '#ffffff',
        },
        'on-surface': {
          DEFAULT: '#1b1c1c',
          variant: '#4c4546',
        },
        outline: {
          DEFAULT: '#7e7576',
          variant: '#cfc4c5',
        },
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Work Sans', 'sans-serif'],
      },
      fontSize: {
        'headline-lg': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-sm': ['18px', { lineHeight: '1.3', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'label-sm': ['12px', { lineHeight: '1.4', fontWeight: '700' }],
      },
      spacing: {
        'margin-desktop': '64px',
        'margin-mobile': '20px',
        gutter: '24px',
        'section-gap': '80px',
      },
    },
  },
  plugins: [],
};
