
document.addEventListener("DOMContentLoaded", async function () {
  const toggleButtonLight = document.getElementById("theme-toggle-light");
  const toggleButtonDark = document.getElementById("theme-toggle-dark");
  const toggleButtonBlue = document.getElementById("theme-toggle-blue");
  const toggleButtonFullBlack = document.getElementById("theme-toggle-full-black")
  const toggleButtonPink = document.getElementById("theme-toggle-pink");
  const themeLinkLight = document.getElementById("theme-link-light");
  const themeLinkDark = document.getElementById("theme-link-dark");
  const themeLinkBlue = document.getElementById("theme-link-blue");
  const themeLinkFullBlack = document.getElementById("theme-link-full-black")
  const themeLinkPink = document.getElementById("theme-link-pink");

  // Obter a preferência de tema do servidor ao carregar a página
  const theme_pref = await get_theme();
  
  // Verificar qual é o tema preferido
  if (theme_pref === 'dark') {
    enableDarkMode();
  } else if (theme_pref === 'blue') {
    enableBlueMode();
  } else if (theme_pref === 'full-dark'){
    enableDarkTotalMode();
  } else if (theme_pref === 'pink'){
    enablePinkMode();
  } else {
    enableLightMode();
  }


  toggleButtonLight.addEventListener("click", function () {
    enableLightMode();
    setCookie("theme-mode", "light", 365);
    send_theme("light");
  });

  toggleButtonDark.addEventListener("click", function () {
    enableDarkMode();
    setCookie("theme-mode", "dark", 365);
    send_theme("dark");
  });

  toggleButtonBlue.addEventListener("click", function () {
    enableBlueMode();
    setCookie("theme-mode", "blue", 365);
    send_theme("blue");
  });

  toggleButtonFullBlack.addEventListener("click", function () {
    enableDarkTotalMode();
    setCookie("theme-mode", "full-dark", 365);
    send_theme("full-dark")
  })
  
  toggleButtonPink.addEventListener("click", function () {
    enablePinkMode();
    setCookie("theme_mode", "pink", 365);
    send_theme("pink")
  })

  function enableDarkMode() {
    themeLinkLight.disabled = true;
    themeLinkDark.disabled = false;
    themeLinkBlue.disabled = true;
    themeLinkFullBlack.disabled = true;
    themeLinkPink.disabled = true;
  }

  function enableLightMode() {
    themeLinkLight.disabled = false;
    themeLinkDark.disabled = true;
    themeLinkBlue.disabled = true;
    themeLinkFullBlack.disabled = true;
    themeLinkPink.disabled= true;
  }

  function enableBlueMode() {
    themeLinkLight.disabled = true;
    themeLinkDark.disabled = true;
    themeLinkBlue.disabled = false;
    themeLinkFullBlack.disabled = true;
    themeLinkPink.disabled= true;
  }

  function enableDarkTotalMode() {
    themeLinkLight.disabled = true;
    themeLinkDark.disabled = true;
    themeLinkBlue.disabled = true;
    themeLinkFullBlack.disabled = false;
    themeLinkPink.disabled = true;
  }

  function enablePinkMode() {
    themeLinkLight.disabled = true;
    themeLinkDark.disabled = true;
    themeLinkBlue.disabled = true;
    themeLinkFullBlack.disabled = true;
    themeLinkPink.disabled = false;
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



// document.addEventListener("DOMContentLoaded", async function () {
//   const toggleButtonLight = document.getElementById("theme-toggle-light");
//   const toggleButtonDark = document.getElementById("theme-toggle-dark");
//   const toggleButtonBlue = document.getElementById("theme-toggle-blue");
//   const toggleButtonFullBlack = document.getElementById("theme-toggle-full-black");
//   const toggleButtonPink = document.getElementById("theme-toggle-pink");

//   const themeLinkLight = document.getElementById("theme-link-light");
//   const themeLinkDark = document.getElementById("theme-link-dark");
//   const themeLinkBlue = document.getElementById("theme-link-blue");
//   const themeLinkFullBlack = document.getElementById("theme-link-full-black");
//   const themeLinkPink = document.getElementById("theme-link-pink");

//   // Obter a preferência de tema do localStorage ao carregar a página
//   const theme_pref = get_theme();
  
//   // Verificar qual é o tema preferido
//   if (theme_pref === 'dark') {
//     enableDarkMode();
//   } else if (theme_pref === 'blue') {
//     enableBlueMode();
//   } else if (theme_pref === 'full-black') {
//     enableFullBlackMode();
//   } else if (theme_pref === 'pink') {
//     enablePinkMode();
//   } else {
//     enableLightMode();
//   }

//   toggleButtonLight.addEventListener("click", function () {
//     enableLightMode();
//     localStorage.setItem("theme-mode", "light");
//     send_theme("light");
//   });

//   toggleButtonDark.addEventListener("click", function () {
//     enableDarkMode();
//     localStorage.setItem("theme-mode", "dark");
//     send_theme("dark");
//   });

//   toggleButtonBlue.addEventListener("click", function () {
//     enableBlueMode();
//     localStorage.setItem("theme-mode", "blue");
//     send_theme("blue");
//   });

//   toggleButtonFullBlack.addEventListener("click", function () {
//     enableFullBlackMode();
//     localStorage.setItem("theme-mode", "full-black");
//     send_theme("full-black");
//   });

//   toggleButtonPink.addEventListener("click", function () {
//     enablePinkMode();
//     localStorage.setItem("theme-mode", "pink");
//     send_theme("pink");
//   });

//   function enableDarkMode() {
//     themeLinkLight.disabled = true;
//     themeLinkDark.disabled = false;
//     themeLinkBlue.disabled = true;
//     themeLinkFullBlack.disabled = true;
//     themeLinkPink.disabled = true;
//   }

//   function enableLightMode() {
//     themeLinkLight.disabled = false;
//     themeLinkDark.disabled = true;
//     themeLinkBlue.disabled = true;
//     themeLinkFullBlack.disabled = true;
//     themeLinkPink.disabled = true;
//   }

//   function enableBlueMode() {
//     themeLinkLight.disabled = true;
//     themeLinkDark.disabled = true;
//     themeLinkBlue.disabled = false;
//     themeLinkFullBlack.disabled = true;
//     themeLinkPink.disabled = true;
//   }

//   function enableFullBlackMode() {
//     themeLinkLight.disabled = true;
//     themeLinkDark.disabled = true;
//     themeLinkBlue.disabled = true;
//     themeLinkFullBlack.disabled = false;
//     themeLinkPink.disabled = true;
//   }

//   function enablePinkMode() {
//     themeLinkLight.disabled = true;
//     themeLinkDark.disabled = true;
//     themeLinkBlue.disabled = true;
//     themeLinkFullBlack.disabled = true;
//     themeLinkPink.disabled = false;
//   }

//   // Função para enviar o tema preferido para o servidor
//   async function send_theme(theme_pref) {
//     try {
//       const response = await fetch("/profile/theme", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ theme_pref }),
//       });
//       if (!response.ok) {
//         throw new Error("Erro ao enviar preferência de tema para o servidor");
//       }
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // Função para obter a preferência de tema do localStorage
//   function get_theme() {
//     return localStorage.getItem("theme-mode") || "light";
//   }
// });