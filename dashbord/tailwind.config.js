/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px", // Extra Small
        sm: "640px", // Small
        md: "768px", // Medium
        lg: "1024px", // Large
        xl: "1280px", // Extra Large
        "2xl": "1536px", // Double Extra Large
      },
      maxWidth: {
           container: "1604px"
         },

      fontFamily: {
        paprika: ["Paprika", 'serif' ],
        secondary: ['Open Sans', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
        dm: ["DM Sans","sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        railway: ["Raleway", "sans-serif"],
        Fira: ["Fira Sans", "sans-serif"],
        SpaceGrotesk: ["Space Grotesk", "sans-serif"],
        Cabin: ["Cabin", "sans-serif"],
        Bangla: ["Hind Siliguri", "sans-serif"],
        Barlow: ["Barlow Condensed", "sans-serif"],
        RedHat: ["Red Hat Display", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        Lato: ["Lato", "sans-serif"],
        Oswald: ["Oswald", "sans-serif"],
      },
      colors: {
        primary: "#262626 ",
        transpa: "#bdc1c6"
      },
    
    // keyframes: {
    //     'plane-flight': {
    //       '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '1' },
    //       '30%': { transform: 'translate(20px, -30px) rotate(25deg)' },
    //       '50%': { transform: 'translate(40px, -50px) rotate(45deg)', opacity: '1' },
    //       '70%': { transform: 'translate(60px, -20px) rotate(70deg)' },
    //       '100%': { transform: 'translate(80px, 40px) rotate(90deg)', opacity: '0' },
    //     },
    //     'dot-appear': {
    //       '0%': { opacity: '0', transform: 'scale(0)' },
    //       '50%': { opacity: '0', transform: 'scale(0)' },
    //       '51%': { opacity: '1', transform: 'scale(1)' },
    //       '100%': { opacity: '1', transform: 'scale(1)' },
    //     },
    //     'fade-in': {
    //       '0%': { opacity: '0', transform: 'scale(0.5)' },
    //       '100%': { opacity: '1', transform: 'scale(1)' },
    //     },
    //   },
    //   animation: {
    //     'plane-flight': 'plane-flight 2s ease-in-out forwards',
    //     'dot-appear': 'dot-appear 2s ease-in-out forwards',
    //     'fade-in': 'fade-in 0.5s ease-in-out forwards',
    //   },


    keyframes: {
        'plane-flight': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '1' },
          '30%': { transform: 'translate(25px, -35px) rotate(30deg)' },
          '60%': { transform: 'translate(50px, 5px) rotate(60deg)' },
          '100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '1' },
        },
        'smoke-1': {
          '0%': { transform: 'translate(0, 0)', opacity: '0.8', width: '0.25rem', height: '0.25rem' },
          '30%': { transform: 'translate(15px, -20px)', opacity: '0.6' },
          '60%': { transform: 'translate(30px, -5px)', opacity: '0.4' },
          '100%': { transform: 'translate(45px, 10px)', opacity: '0', width: '0.75rem', height: '0.75rem' },
        },
        'smoke-2': {
          '0%': { transform: 'translate(0, 0)', opacity: '0.7', width: '0.2rem', height: '0.2rem' },
          '30%': { transform: 'translate(20px, -25px)', opacity: '0.5' },
          '60%': { transform: 'translate(35px, -10px)', opacity: '0.3' },
          '100%': { transform: 'translate(50px, 5px)', opacity: '0', width: '0.5rem', height: '0.5rem' },
        },
        'smoke-3': {
          '0%': { transform: 'translate(0, 0)', opacity: '0.9', width: '0.15rem', height: '0.15rem' },
          '30%': { transform: 'translate(10px, -15px)', opacity: '0.7' },
          '60%': { transform: 'translate(25px, 0px)', opacity: '0.5' },
          '100%': { transform: 'translate(40px, 15px)', opacity: '0', width: '0.6rem', height: '0.6rem' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'plane-flight': 'plane-flight 5s ease-in-out',
        'smoke-1': 'smoke-1 1.8s ease-out forwards',
        'smoke-2': 'smoke-2 1.6s ease-out forwards',
        'smoke-3': 'smoke-3 1.4s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-in-out forwards',
      },
    },
    theme: {
  extend: {
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
        '33%': { transform: 'translateY(-20px) rotate(120deg)' },
        '66%': { transform: 'translateY(10px) rotate(240deg)' },
      },
    },
    animation: {
      float: 'float 6s ease-in-out infinite',
    },
  },
}

  

    },
  
  plugins: [],
}
