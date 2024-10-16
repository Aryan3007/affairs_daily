/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './dashboardscreens/**/*.{js,jsx,ts,tsx}',
    './**/*.{js,jsx,ts,tsx}',  // Scan any other directories
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
