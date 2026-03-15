/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate"

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // Shadcn UI base colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Brand Colors
        brand: {
          DEFAULT: "hsl(var(--brand))",
          dark: "hsl(var(--brand-dark))",
          foreground: "hsl(var(--brand-foreground))",
        },

        // Gray Scale
        gray: {
          800: "hsl(var(--gray-800))",
          700: "hsl(var(--gray-700))",
          600: "hsl(var(--gray-600))",
          500: "hsl(var(--gray-500))",
          400: "hsl(var(--gray-400))",
          300: "hsl(var(--gray-300))",
          200: "hsl(var(--gray-200))",
          100: "hsl(var(--gray-100))",
        },

        // Feedback
        success: "hsl(var(--success))",
        danger: "hsl(var(--danger))",

        // Full Color Palette from Image
        blue: {
          dark: "hsl(var(--blue-dark))",
          base: "hsl(var(--blue-base))",
          light: "hsl(var(--blue-light))",
        },
        purple: {
          dark: "hsl(var(--purple-dark))",
          base: "hsl(var(--purple-base))",
          light: "hsl(var(--purple-light))",
        },
        pink: {
          dark: "hsl(var(--pink-dark))",
          base: "hsl(var(--pink-base))",
          light: "hsl(var(--pink-light))",
        },
        red: {
          dark: "hsl(var(--red-dark))",
          base: "hsl(var(--red-base))",
          light: "hsl(var(--red-light))",
        },
        orange: {
          dark: "hsl(var(--orange-dark))",
          base: "hsl(var(--orange-base))",
          light: "hsl(var(--orange-light))",
        },
        yellow: {
          dark: "hsl(var(--yellow-dark))",
          base: "hsl(var(--yellow-base))",
          light: "hsl(var(--yellow-light))",
        },
        green: {
          dark: "hsl(var(--green-dark))",
          base: "hsl(var(--green-base))",
          light: "hsl(var(--green-light))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
}