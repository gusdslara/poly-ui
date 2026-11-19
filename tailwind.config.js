/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2b4f81',
                    50: '#f0f4f9',
                    100: '#d9e4f0',
                    200: '#b8cde3',
                    300: '#8aadcf',
                    400: '#5a88b8',
                    500: '#3b6ca1',
                    600: '#2b4f81',
                    700: '#254169',
                    800: '#223758',
                    900: '#21304b',
                },
                secondary: {
                    DEFAULT: '#648991',
                    50: '#f3f7f8',
                    100: '#e1ebed',
                    200: '#c6d9dd',
                    300: '#9fbfc6',
                    400: '#729da8',
                    500: '#648991',
                    600: '#4f6d75',
                    700: '#445b61',
                    800: '#3d4d52',
                    900: '#364247',
                },
                neutral: {
                    DEFAULT: '#484f59',
                    50: '#f6f7f8',
                    100: '#ebedef',
                    200: '#d3d7dc',
                    300: '#adb4bd',
                    400: '#808a98',
                    500: '#636d7d',
                    600: '#484f59',
                    700: '#3f444d',
                    800: '#373b42',
                    900: '#31353a',
                }
            },
            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-in': 'slideIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideIn: {
                    '0%': { transform: 'translateX(-10px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
