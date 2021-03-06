/*
 * There are two color palettes on CSS for the data-theme: 'light' and 'dark'.
 * Initially the script check if a theme is set in session storage and alternatively listens to a MediaQuery callback looking for "prefers-color-scheme: dark".
 */


const themeButton = {
    'light': '<i class="fas fa-moon" aria-hidden="true"></i>',
    'dark': '<i class="fas fa-sun fa-rotate-180" aria-hidden="true"></i>'
}

const currentTheme = () => sessionStorage.getItem('theme')

function setMode(theme) {
    document.documentElement.setAttribute('data-theme', theme)
    sessionStorage.setItem('theme', theme)
    document.getElementById('theme-toggle').innerHTML = themeButton[theme]
}

function themeToggle() {
    let sessionPrefers = currentTheme()
    if (sessionPrefers === 'light') {
        setMode('dark')
    } else {
        setMode('light')
    }
}

window.onload = function bootstrapTheme() {
    if (isAutoTheme) {
        if (!currentTheme()) {
            // Load browser's preference
            let browserPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
            browserPrefersDark.addEventListener('change', () => {
                if (browserPrefersDark.matches) sessionStorage.setItem('theme', 'dark')
            });
        }

        // Load theme
        let sessionPrefers = currentTheme()
        setMode(sessionPrefers ? sessionPrefers : 'light')
    }
}
