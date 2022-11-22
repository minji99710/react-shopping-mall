/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            spacing: {
                2800: "43rem",
                880: "13rem",
            },
        },
    },
    plugins: [require("daisyui")],
    base: false,
    daisyui: {
        styled: true,
        themes: ["light", "dark"],
    },
    darkMode: ["class", '[data-theme="dark"]'],
};
