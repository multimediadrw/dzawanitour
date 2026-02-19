import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dzawani Brand Colors
        magenta: {
          DEFAULT: "#e85297",
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fad0e8",
          300: "#f7a8d3",
          400: "#f270b4",
          500: "#e85297",
          600: "#d63a7e",
          700: "#b52a67",
          800: "#952556",
          900: "#7c2249",
        },
        purple: {
          DEFAULT: "#503861",
          50: "#f5f3f7",
          100: "#ede9f1",
          200: "#d9d1e5",
          300: "#baafd0",
          400: "#9585b5",
          500: "#7a6299",
          600: "#664d83",
          700: "#553e6c",
          800: "#503861",
          900: "#3d2b4c",
        },
        ocean: {
          DEFAULT: "#00BBF9",
          50: "#f0fbff",
          100: "#e0f7fe",
          200: "#b9effe",
          300: "#7ce3fd",
          400: "#37d2fa",
          500: "#00BBF9",
          600: "#0398d1",
          700: "#0779a8",
          800: "#0c648a",
          900: "#105372",
        },
        // Additional colors
        sunset: "#FF9500",
        mint: "#00D084",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "dzawani-gradient":
          "linear-gradient(135deg, #503861 0%, #00BBF9 50%, #e85297 100%)",
        "hero-gradient":
          "linear-gradient(180deg, rgba(80, 56, 97, 0.85) 0%, rgba(0, 187, 249, 0.6) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
