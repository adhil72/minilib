import type {Config} from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}",], theme: {
        extend: {
            backgroundColor: {
                primary: '#ffffff', secondary: '#f4f4f4', tint: '#4300b8',
            }, colors: {
                primary: "#000000", secondary: "#051F61", tint: "#4300b8", "tint-alt": "#5d00ff",

            }
        },
    }, plugins: [],
};
export default config;
