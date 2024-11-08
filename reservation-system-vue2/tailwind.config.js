const { purge } = require('tailwindcss/stubs/defaultConfig.stub');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
   purge: [
    "./public/**/*.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  content: [
    "./public/**/*.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

