function drawCircle(progress) {
  var canvas = document.getElementById("progressCircle");
  var context = canvas.getContext("2d");

  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var radius = canvas.width / 3;

  context.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhar o círculo externo completo
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.strokeStyle = "#00000070";
  context.lineWidth = 7;
  context.stroke();

  // Desenhar o círculo de progresso
  var startAngle = -0.5 * Math.PI; // -90 graus
  var endAngle = startAngle + (progress / 100) * 2 * Math.PI;
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle, false);
  context.strokeStyle = "#444";
  context.lineWidth = 7;
  context.stroke();
}

function iniciarContador() {
  let contador = 0;
  const contadorElemento = document.getElementById("contador");
  const intervalID = setInterval(function () {
    if (contador < 100) {
      contador++;
      contadorElemento.textContent = contador;
      drawCircle(contador);
    } else {
      clearInterval(intervalID); // Parar o contador quando atingir 100
    }
  }, 100);
}

window.onload = function () {
  iniciarContador();
  drawCircle(0); // Inicia o círculo de progresso com 0%
};
