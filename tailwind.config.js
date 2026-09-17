/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 4px 30px 0px #00000014",
        "btn-shadow": "0px 4px 32px 0px #00000014",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(100.05deg, #FFFFFF 3.14%, #D4FFFD 162.5%, #F6FCF8 162.5%)",

        gradient1:
          "linear-gradient(80.51deg, #FFFFFF -6.77%, #D4FFFD 101.58%, #F6FCF8 101.58%)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#44D9E6",
        muted: "#6B7280",
        gold: "#F1DD74",
        green: "#80C577",
      },
      fontFamily: {
        mulish: ["var(--mulish-font)", ...fontFamily.sans],
        raleway: ["var(--raleway-font)", ...fontFamily.sans],
      },
      maxWidth: {
        "6xl": "1190px", // Custom max-width for 6xl
      },
    },
  },
  plugins: [],
};
