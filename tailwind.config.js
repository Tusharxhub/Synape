/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        synapse: {
          dark: "#0a0e27",
          darker: "#050811",
          panel: "#0f1428",
          cyan: "#00d9ff",
          violet: "#a855f7",
          red: "#ff1744",
          muted: "#1e2749",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}
