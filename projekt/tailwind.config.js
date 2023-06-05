// tailwind.config.js
module.exports = {
  content: ["./src/components/OrderSubmit.js"],
  theme: {
    extend: {
      fontSize: {
        big: '1.25rem', // Define a custom font size for 'big' class
      },
      spacing: {
        big: '1.5rem', // Define a custom spacing for 'big' class
      },
    },
  },
  variants: {},
  plugins: [],
};
