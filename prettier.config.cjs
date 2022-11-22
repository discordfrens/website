/** @type {import("prettier").Config} */
module.exports = {
    plugins: [require.resolve('prettier-plugin-tailwindcss')],
    trailingComma: 'es5',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
}
