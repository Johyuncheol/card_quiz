import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        toss: {
          blue: "#0064FF",
          navy: "#1B2B3A"
        }
      },
      borderRadius: {
        xl: "16px",
        "2xl": "24px"
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};
export default config;
