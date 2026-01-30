/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--border))",
                ring: "hsl(var(--primary))",
                background: "hsl(var(--bg-app))",
                foreground: "hsl(var(--text-main))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-content))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-content))",
                },
                success: {
                    DEFAULT: "hsl(var(--success))",
                    foreground: "white",
                },
                error: {
                    DEFAULT: "hsl(var(--error))",
                    foreground: "white",
                },
                muted: {
                    DEFAULT: "hsl(var(--bg-card))",
                    foreground: "hsl(var(--text-muted))",
                },
                // Custom mapping to match my class usage
                'bg-app': "hsl(var(--bg-app))",
                'bg-card': "hsl(var(--bg-card))",
            },
            borderRadius: {
                lg: "var(--radius-lg)",
                md: "var(--radius-md)",
                sm: "var(--radius-sm)",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
