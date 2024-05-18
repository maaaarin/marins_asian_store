import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: "#0028FF",
        secondary: "#FF29D2",
        pink: "#FF86F8",
        "pink-light": "#F2D8EB",
        orange: "#FF4900",
        beige: "#FFF3E8",
        "dark-blue": "#007BD0",
        golden: "#FC9700",
        calories: "#FFBAA3",
        sugar: "#D7E8F9",
        protein: "#EFD1F2",
        carbh: "#C1F9E8",
        salt: "#CCFCA5",
        fat: "#FFE791",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "2rem",
        xl: "4rem",
        "2xl": "10rem",
      },
    },
    keyframes: {
      "caret-blink": {
        "0%,70%,100%": { opacity: "1" },
        "20%,50%": { opacity: "0" },
      },
      "slide-out-blurred-top": {
        from: {
          transform: "translateY(0) scaleY(1) scaleX(1)",
          transformOrigin: "50% 0",
          filter: "blur(0)",
          opacity: "1",
        },
        to: {
          transform: "translateY(-2000px) scaleY(2) scaleX(0.2)",
          transformOrigin: "50% 0",
          filter: "blur(40px)",
          opacity: "0",
        },
      },
      "slide-in-blurred-bottom": {
        from: {
          transform: "translateY(1000px) scaleY(2.5) scaleX(0.2)",
          transformOrigin: "50% 100%",
          filter: "blur(40px)",
          opacity: "0",
          display: "flex",
        },
        to: {
          transform: "translateY(0) scaleY(1) scaleX(1)",
          transformOrigin: "50% 50%",
          filter: "blur(0)",
          opacity: "1",
        },
      },
      "slide-in-blurred-top": {
        from: {
          transform: "translateY(-1000px) scaleY(2.5) scaleX(.2)",
          transformOrigin: "50% 0",
          filter: "blur(40px)",
          opacity: "0",
        },
        to: {
          transform: "translateY(0) scaleY(1) scaleX(1)",
          transformOrigin: "50% 50%",
          filter: "blur(0)",
          opacity: "1",
        },
      },
      floating: {
        "0%": {
          transform: "translatey(0px)",
        },
        "50%": {
          transform: "translatey(-20px)",
        },
        "100%": {
          transform: "translatey(0px)",
        },
      },
      fade: {
        from: {
          opacity: "0",
        },
        to: {
          opacity: "1",
        },
      },
      display: {
        from: {
          display: "none",
        },
        to: {
          display: "flex",
        },
      },
    },
    animation: {
      "slide-out-blurred-top":
        "slide-out-blurred-top 0.2s cubic-bezier(0.755, 0.05, 0.855, 0.06) both",
      "slide-in-blurred-bottom":
        "slide-in-blurred-bottom 0.6s cubic-bezier(0.23, 1, 0.32, 1) both",
      "slide-in-blurred-top":
        "slide-in-blurred-top 0.15s cubic-bezier(0.230, 1.000, 0.320, 1.000) both",
      "floating-4": "floating 4s ease-in-out infinite",
      "floating-6": "floating 6s ease-in-out infinite",
      "fade-in": "fade 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      "fade-out":
        "fade 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both reverse",
      display: "display 0.5s linear forwards",
      "caret-blink": "caret-blink 1.25s ease-out infinite",
    },
  },
  plugins: [nextui(), require("tailwindcss-animate")],
};
export default config;
