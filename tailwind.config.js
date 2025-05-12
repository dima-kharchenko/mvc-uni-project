/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/**/*.ejs"],
    theme: {
        extend: {
            colors: {
                primary: {
                    a0: '#72a9e4',
                    a10: '#84b2e7',
                    a20: '#94bbea',
                    a30: '#a5c5ed',
                    a40: '#b4cef0',
                    a50: '#c3d8f3',
                },
                surface: {
                    a0: '#121212',
                    a10: '#282828',
                    a20: '#3f3f3f',
                    a30: '#575757',
                    a40: '#717171',
                    a50: '#8b8b8b',
                }
            }
        }
    },
    plugins: [],
};
