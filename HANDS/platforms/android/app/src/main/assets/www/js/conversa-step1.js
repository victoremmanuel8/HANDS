let textosStep1Exibidos = false;

document.getElementById('btn-cadastro').addEventListener('click', function() {
    document.getElementById('step0').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
    if (!textosStep1Exibidos) {
        exibirTextoStep1(0);
        exibirCamposStep1();
        textosStep1Exibidos = true;
    }
});

function exibirTextoStep1(index) {
    const textosStep1 = [
        "Agora vamos colocar seus dados base, com eles você consegue fazer seu login futuramente"
    ];

    const elementoStep1 = document.querySelector('#texto3');

    function escreverTexto(texto, elemento, velocidade = 10, callback) {
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

    if (index < textosStep1.length) {
        escreverTexto(textosStep1[index], elementoStep1, 100, () => {
            exibirTextoStep1(index + 1);
        });
    }
}

