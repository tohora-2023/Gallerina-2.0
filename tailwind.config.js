/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./client/**/*.{tsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        'garamond': ['Garamond']
      },
      colors: {
        'my-gold': '#A48948', //BDB5A2
      },
    },
  },
  plugins: [],
  variants: {
    extend: { display: ['group-hover'] },
  },
  utilities: {
    '.custom-link': {
      marginTop: '1rem',
      marginRight: '1rem',
      display: 'block',
      color: 'my-red',
      borderColor: 'my-red',
      borderWidth: '1px',
      borderRadius: 'md',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      '&:hover': {
        borderColor: 'red-600',
        color: 'red-600',
      },
      '@screen lg': {
        marginTop: '0',
        display: 'inline-block',
      },
    },
  },
}
