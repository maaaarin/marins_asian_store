import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'primary': '#2E2DDD',
      'secondary': '#EF9EE5',
      'light-yellow': '#F9F2A2',
      'orange': '#FF4900',
      'beige': '#FFEAD9',
      'white': '#fff',
      'black': '#000'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '12rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [],
};
export default config;
