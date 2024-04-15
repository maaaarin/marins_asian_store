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
        primary: "#0201FE",
        secondary: "#FA73F3",
        pink: "#FF86F8",
        "light-yellow": "#F9F2A2",
        orange: "#FF4900",
        beige: "#FFEAD9",
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
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
  plugins: [nextui(), require("tailwindcss-animate")],
};
export default config;
