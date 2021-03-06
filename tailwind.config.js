import daisyUI from "daisyui";

export default {
  darkmode: true,
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyUI],
};
