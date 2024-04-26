
// tailwind.config.js
import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend:
    
    {
      transitionProperty: {
        'height': 'height',
        'width': 'width'
      }
,
      fontFamily: {
      iranSans_1: ["var(--font_1)"],
      iranSans_2: ["var(--font_2)"],
      iranSans_3: ["var(--font_3)"],
      iranSans_4: ["var(--font_4)"],
    },},
  },
  variants: {
    extend: {
        display: ["group-hover"],
    },
},
  darkMode: "class",
  plugins: [nextui()]
}

export default config;