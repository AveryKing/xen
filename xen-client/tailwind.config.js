module.exports = {
    mode:'jit',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                ubuntu: ['Ubuntu'],
                logo: ['Merienda'],
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite'
            }
        },
    },
    plugins: [],
}