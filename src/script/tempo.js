// // Função para formatar o tempo em HH:MM:SS
// function formatTime(hours, minutes, seconds) {
//     return (
//         (hours < 10 ? "0" : "") + hours + ":" +
//         (minutes < 10 ? "0" : "") + minutes + ":" +
//         (seconds < 10 ? "0" : "") + seconds
//     );
// }

// // Função para atualizar o contador de tempo
// function atualizarTempo() {
//     var agora = new Date().getTime();
//     var diferenca = agora - inicio + tempoAnterior;

//     var horas = Math.floor(diferenca / (1000 * 60 * 60));
//     var minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
//     var segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

//     document.getElementById("tempoDecorrido").innerHTML = formatTime(horas, minutos, segundos);
// }

// // Verificar se é a primeira visita à página
// if (!localStorage.getItem('inicio')) {
//     localStorage.setItem('inicio', new Date().getTime());
// }

// // Início do contador ao carregar a página
// var inicio = parseInt(localStorage.getItem('inicio'));
// var tempoAnterior = localStorage.getItem('tempoAnterior') ? parseInt(localStorage.getItem('tempoAnterior')) : 0;
// var intervalo = setInterval(atualizarTempo, 1000);

// // Evento para limpar o intervalo quando a página é fechada ou recarregada
// window.addEventListener('beforeunload', function() {
//     localStorage.setItem('tempoAnterior', tempoAnterior);
//     clearInterval(intervalo);
// });