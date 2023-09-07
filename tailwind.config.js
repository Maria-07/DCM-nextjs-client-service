/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#AB459F",
        secondary: "#77217A",
        light: "#EBBDE7",
        popover: "#F1F1F1",
        accent: "#808080",
        dark: "#3C4048",
      },
      fontFamily: {
        // primary: ["EB Garamond", "serif"],
        // secondary: ["Rufina", "serif"],
      },
    },
  },
  plugins: [],
};
