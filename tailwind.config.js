/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'asset-frame': "url('assets/Vector.svg')"
      },
      colors: {
        'primary': '#14172BFF',
        'frame-text': '#737BAE'
      },
    },
  },
  plugins: [],
}
