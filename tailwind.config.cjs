/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,css}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#ffffff", // white
                foreground: "#000000", // black
                "muted-foreground": "#6b7280", // gray
            },
        },
    },
    plugins: [],
};
