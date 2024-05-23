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

document.addEventListener("DOMContentLoaded", async function () {
  const toggleButton = document.getElementById("theme-toggle");
  const themeLinkLight = document.getElementById("theme-link-light");
  const themeLinkDark = document.getElementById("theme-link-dark");

  // Obter a preferência de tema do servidor ao carregar a página
  const theme_pref = await get_theme();
  
  // Verificar se o tema preferido é dark ou light
  if (theme_pref === 'dark') {
    enableDarkMode();
    toggleButton.checked = true;
  } else {
    enableLightMode();
  }

  toggleButton.addEventListener("change", function () {
    if (toggleButton.checked) {
      enableDarkMode();
      setCookie("dark-mode", "enabled", 365);
      send_theme("dark"); 
    } else {
      enableLightMode();
      setCookie("dark-mode", "disabled", 365); 
      send_theme("light"); 
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

  // Função para obter o valor de um cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // Função para definir um cookie
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
  }

  //enviar tema para o servidor
  async function send_theme(theme_pref) {
    try {
      const response = await fetch("/profile/theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme_pref }),
      });
      if (!response.ok) {
        throw new Error("Erro ao enviar preferência de tema para o servidor");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Função para obter a preferência de tema do servidor
  async function get_theme() {
    try {
      const response = await fetch("/profile/theme", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao obter preferência de tema do servidor");
      }
      const data = await response.json();
      return data.theme_pref;
    } catch (error) {
      console.error(error);
    }
  }
});

