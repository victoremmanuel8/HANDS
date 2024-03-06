  // Função que incrementa o contador a cada segundo até o limite de 100
  function iniciarContador() {
    let contador = 0;
    const contadorElemento = document.getElementById('contador');
    
    // Função para atualizar o contador a cada segundo
    function atualizarContador() {
      if (contador < 100) {
        contador++;
        contadorElemento.textContent = contador;
      } else {
        clearInterval(intervalID); // Parar o contador quando atingir 100
      }
    }
    
    // Chamar a função atualizarContador a cada segundo
    const intervalID = setInterval(atualizarContador, 100);
  }
  
  // Iniciar o contador automaticamente quando a página carregar
  window.onload = iniciarContador;