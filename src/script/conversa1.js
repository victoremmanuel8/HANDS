
function escreverTexto(texto, elemento, velocidade = 20, callback) {
    let i = 0;
    const intervalo = setInterval(function() {
        elemento.textContent += texto.charAt(i);
        i++;
        if (i > texto.length) {
            clearInterval(intervalo);
            callback();
        }
    }, velocidade);
}

const textos = [
    "Olá, meu nome é Liz 🥰",
    "Está pronto para começar?"
];

const elementos = document.querySelectorAll('.texto');

function exibirTexto(index) {
    if (index < textos.length) {
        escreverTexto(textos[index], elementos[index], 100, () => {
            exibirTexto(index + 1);
        });
    }
}

exibirTexto(0);