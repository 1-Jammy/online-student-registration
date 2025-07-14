/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: ["var(--font-open-sans)"],
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // this is needed to detect Tailwind classes inside your code
  ],
  theme: {
    extend: {
      keyframes: {
        fadeSlide: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeSlide: 'fadeSlide 0.5s ease-out',
        slideDown: 'slideDown 0.4s ease-out',
        fadeIn: 'fadeIn 1s ease-out',
      },
    },
  },
  plugins: [],
};
