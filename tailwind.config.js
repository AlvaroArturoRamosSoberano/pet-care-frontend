/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Lusitana: ["serif"],
        Raleway: ["sans - serif"]
      },
      colors: {
        regent: {
          50: "#f5f8f8",
          100: "#edf1f2",
          200: "#dde5e8",
          300: "#c8d4d9",
          400: "#b2bfc7",
          500: "#9daab7",
          600: "#8895a5",
          700: "#747f8e",
          800: "#5f6974",
          900: "#50585f",
          950: "#2f3337"
        },
        tuscany: {
          50: "#fdf7ef",
          100: "#faebda",
          200: "#f3d5b5",
          300: "#ebb886",
          400: "#e29155",
          500: "#db7434",
          600: "#c85b28",
          700: "#aa4824",
          800: "#883b24",
          900: "#6e3220",
          950: "#3b170f"
        },
        water: {
          50: "#f3f6fb",
          100: "#e3ecf6",
          200: "#d3e2f2",
          300: "#aac8e6",
          400: "#82acd8",
          500: "#6490cd",
          600: "#5077c0",
          700: "#4666af",
          800: "#3e548f",
          900: "#364772",
          950: "#242d47"
        },
        spindle: {
          50: "#f4f7fa",
          100: "#e5ebf4",
          200: "#d1deec",
          300: "#b8cde2",
          400: "#8baccf",
          500: "#7091c1",
          600: "#5d7ab3",
          700: "#5269a3",
          800: "#475886",
          900: "#3c4a6c",
          950: "#282f43"
        }
      }
    }
  },
  plugins: []
};
