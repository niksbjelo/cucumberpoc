/** @type {import("prettier").Config} */
const config = {
  trailingComma: "all",
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
