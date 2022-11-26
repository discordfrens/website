/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                "background": "#0e0e11",
                "text": "#f7f7f8",
                "foreground": "#1a191e",
                "foreground-light": "#26252B",
                "border": "#1e1d21",
                "border-mid": "#2A282D",
                "border-light": "#37363b"
            }
        },
    },
    plugins: [],
};
