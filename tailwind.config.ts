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
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
    colors: {
      'primary': '#2E2DDD',
      'secondary': '#EF9EE5',
      'pink': '#FF86F8',
      'light-yellow': '#F9F2A2',
      'orange': '#FF4900',
      'beige': '#FFEAD9',
      'dark-blue': '#007BD0'
    }},
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '6rem',
        xl: '8rem',
        '2xl': '10rem',
      },
    },
  },
  plugins: [],
};
export default config;
