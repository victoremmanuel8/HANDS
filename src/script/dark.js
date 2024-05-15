// document.addEventListener('DOMContentLoaded', () => {
//     const themeToggle = document.getElementById('theme-toggle');
//     const themeLink = document.getElementById('theme-link');

//     // Verificar a preferência de tema do usuário no localStorage
//     const currentTheme = localStorage.getItem('theme');
//     if (currentTheme) {
//         themeLink.href = currentTheme;
//     }

//     themeToggle.addEventListener('click', () => {
//         if (themeLink.href.includes('base.css')) {
//             themeLink.href = 'dark-mode.css';
//             localStorage.setItem('theme', 'dark-mode.css');
//         } else {
//             themeLink.href = 'base.css';
//             localStorage.setItem('theme', 'base.css');
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("theme-toggle");
    const themeLinkLight = document.getElementById("theme-link-light");
    const themeLinkDark = document.getElementById("theme-link-dark");

    // Verificar o estado do modo escuro no localStorage
    if (localStorage.getItem("dark-mode") === "enabled") {
        enableDarkMode();
        toggleButton.checked = true;
    } else {
        enableLightMode();
    }

    toggleButton.addEventListener("change", function() {
        if (toggleButton.checked) {
            enableDarkMode();
            localStorage.setItem("dark-mode", "enabled");
        } else {
            enableLightMode();
            localStorage.setItem("dark-mode", "disabled");
        }
    });

    function enableDarkMode() {
        themeLinkLight.disabled = true;
        themeLinkDark.disabled = false;
    }

    function enableLightMode() {
        themeLinkLight.disabled = false;
        themeLinkDark.disabled = true;
    }
});
