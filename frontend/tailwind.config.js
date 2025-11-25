

// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   theme: {
//     extend: {
//       fontFamily: {
//         // Overwriting the default sans font to use the CSS variable
//         sans: ['var(--font-sans)', 'system-ui', 'sans-serif'], 
//         oswald: ['Oswald', 'Arial'],
//         // Creating a new 'display' utility
//         // The resulting class will be: .font-display { font-family: var(--font-display), sans-serif; }
//         display: ['var(--font-display)', 'sans-serif'],
        
//         // Creating a new 'heading' utility
//         heading: ['var(--font-heading)', 'serif'],
//       },
//     },
//   },
//   plugins: [],
// }





/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Using direct font names
        'oswald': ['Oswald', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'roboto': ['Roboto', 'Arial', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'heading': ['Montserrat', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}



