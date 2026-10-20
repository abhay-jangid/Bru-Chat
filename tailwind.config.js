/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#070709",
          panel: "rgba(18, 18, 22, 0.55)",
          border: "rgba(255, 255, 255, 0.18)",
          primary: "#FFFFFF",
          secondary: "#E4E4E7",
          heading: "#F4F4F5",
          muted: "#A1A1AA",
          subtle: "#71717A"
        }
      },
      backgroundImage: {
        'bottom-mask-light': 'linear-gradient(0deg, transparent 0, #ffffff 160px)',
        'bottom-mask-dark': 'linear-gradient(0deg, transparent 0, #070709 160px)',
        'primary-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #E4E4E7 100%)',
      },
      maskImage: {
        'bottom-fade': 'linear-gradient(0deg, transparent 0, #000 160px)',
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
}
