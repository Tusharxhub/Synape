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
          bg: "#09090b",
          surface: "#111827",
          panel: "#18181b",
          border: "rgba(255,255,255,0.06)",
          accent: "#22d3ee",
          success: "#10b981",
          warning: "#f59e0b",
          danger: "#ef4444",
          text: "#f8fafc",
          "text-muted": "#94a3b8",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}
