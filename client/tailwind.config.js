/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
      backgroundImage: {
        'hero-pattern': "url('/assets')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      fontFamily: {
        sanslinear: ["Recursive", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        sans: ["Open Sans", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        jost: ["Jost", "sans-serif"],
        baloobhai: ["baloo-bhai", "sans-serif"],
      },
      borderRadius: {
        circle: "50%",
      },
      colors: {
        brand: "#37475A",
        primary: '#09B294',
        secondary:'#2D719D',
        hover: '#676aad',
        hover2: '#f3f7fc',
        background: '#fafafa',
        red: '#de3929',
        sidebar: '#F4F4F4',
        active: '#E2E6EB',
        hovercancel: '#9B1A1B',
        cancel: '#9B1A1A',
        customBlue: '#2D719D',
        customYellow: '#E9C368',
        customGreen: '#2E9E8F',
        customGray: '#37475A',
        customBlack: '#131A22',
        bgRed: '#FED7D7',
        brRed: '#FC8181',
        backgroundImage: {
          login: "",
        },
        colors: {
          brand: "#37475A",
        },
        fontFamily: {
          poppins: ["Poppins", "sans-serif"],
        },
      },
      screens: {
        xs: { max: "425px" },
        sm: { min: "426px" },
        md: { min: "769px" },
        lg: { min: "1440px" },
        xl: { min: "2560px" },
        mdl: { min: "1024px" },
        laptop: { max: "1165px" },
      },
    },
    variants: {},
    plugins: [],
  },
};
