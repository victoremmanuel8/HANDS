document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeLink = document.getElementById('theme-link');

    // Verificar a preferência de tema do usuário no localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        themeLink.href = currentTheme;
    }

    themeToggle.addEventListener('click', () => {
        if (themeLink.href.includes('base.css')) {
            themeLink.href = 'dark-mode.css';
            localStorage.setItem('theme', 'dark-mode.css');
        } else {
            themeLink.href = 'base.css';
            localStorage.setItem('theme', 'base.css');
        }
    });
});
