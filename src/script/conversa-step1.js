// let textoStep1Exibido = false;

// document.getElementById('btn-cadastro').addEventListener('click', function() {
//     document.getElementById('step0').classList.add('hidden');
//     document.getElementById('step1').classList.remove('hidden');
//     if (!textoStep1Exibido) {
//         exibirTextoStep1(0);
//         exibirCamposStep1();
//         textoStep1Exibido = true;
//     }
// });

// function exibirTextoStep1(index) {
//     const textosStep1 = [
//         "Qual é o seu nome? Seu e-mail será para login futuramente."
//     ];

//     const elementoStep1 = document.querySelector('#texto3');

//     function escreverTexto(texto, elemento, velocidade = 10, callback) {
//         let i = 0;
//         const intervalo = setInterval(function() {
//             elemento.textContent += texto.charAt(i);a
//             i++;
//             if (i >= texto.length) {
//                 clearInterval(intervalo);
//                 callback();
//             }
//         }, velocidade);
//     }

//     if (index < textosStep1.length) {
//         escreverTexto(textosStep1[index], elementoStep1, 100, () => {
//             // Não é necessário chamar novamente a função exibirTextoStep1, pois queremos exibir o texto apenas uma vez.
//         });
//     }
// }