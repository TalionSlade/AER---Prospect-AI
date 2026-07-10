/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Official IDBI Bank branding — jade green primary, saffron-orange accent.
        // Mapped onto the `teal` scale so existing utility classes render on-brand.
        teal: {
          950: '#084c43',
          900: '#0a6357',
          800: '#0c7c6d', // IDBI green (primary)
          700: '#0e8074',
          600: '#12968a',
        },
        idbi: {
          green: '#0c7c6d',
          greenDark: '#0a6357',
          orange: '#ee7623', // IDBI saffron (primary action)
          orangeLight: '#f5891f',
        },
        idbiOrange: '#ee7623',
        idbiAmber: '#f5a623',
        rag: {
          green: '#16a34a',
          amber: '#f59e0b',
          red: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
