// tailwind.config.js
module.exports = {
  content: ["./src/components/OrderSubmit.js"],
  theme: {
    // ...
    typography: {
      'receipt': {
        css: {
          ul: {
            fontFamily: 'VT323',
            fontSize: '1.5rem',
          },
        },
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
