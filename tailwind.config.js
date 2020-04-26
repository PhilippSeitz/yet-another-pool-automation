module.exports = {
  theme: {
    boxShadow: {
      default: '0px 8px 16px rgba(0, 0, 0, 0.08)',
      strong: '0px 8px 16px rgba(0, 0, 0, 0.2)',
      inner: 'inset 0px 4px 16px #E5E5E5'
    },
    borderRadius: {
      none: '0',
      default: '1.5rem',
      light: '.25rem',
      stronger: '1rem',
      full: '9999px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: '#000',
      white: '#fff',
      gray: {
        100: '#FCFCFC',
        200: '#F4F4F4',
        300: '#EAEAEA',
        400: '#D1D1D1',
        500: '#A5A5A5',
        600: '#929292',
        700: '#3E3E3E',
        800: '#2D2D2D',
        900: '#202020'
      },
      blue: {
        100: '#ebf8ff',
        200: '#bee3f8',
        300: '#90cdf4',
        400: '#63b3ed',
        500: '#4299e1',
        600: '#3182ce',
        700: '#2b6cb0',
        800: '#2c5282',
        900: '#2a4365'
      }
    },
    fontSize: {
      base: '1rem',
      '12': '.75rem',
      '14': '.875rem',
      '18': '1.125rem',
      '24': '1.5rem',
      '36': '2.25rem',
      '72': '4.5rem'
    },
    extend: {
      fontFamily: {
        sans: [
          'Roboto',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ]
      }
    },
    linearGradientColors: {
      blue: ['#028090', '#00AEAE'],
      green: ['#00A896', '#01A271']
    }
  },
  variants: {},
  plugins: [require('tailwindcss-gradients')]
};
