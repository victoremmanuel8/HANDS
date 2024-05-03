document.addEventListener('DOMContentLoaded', function() {
    var etapas = document.querySelectorAll('.etapa');
    var botoesProximo = document.querySelectorAll('.proximo');
    var botoesAnterior = document.querySelectorAll('.anterior');

    function mostrarEtapa(etapa) {
        etapas.forEach(function(elemento) {
            elemento.classList.remove('visivel');
        });
        etapas[etapa].classList.add('visivel');
    }

    function validarCampos(etapa) {
        var campos = etapas[etapa].querySelectorAll('.input');
        for (var i = 0; i < campos.length; i++) {
            if (campos[i].value === '') {
                return false;
            }
        }
        return true;
    }

    function proximaEtapa(etapaAtual) {
        if (validarCampos(etapaAtual)) {
            mostrarEtapa(etapaAtual + 1);
        } else {
            alert('Por favor, preencha todos os campos antes de prosseguir.');
        }
    }

    function etapaAnterior(etapaAtual) {
        mostrarEtapa(etapaAtual - 1);
    }

    botoesProximo.forEach(function(botao, indice) {
        botao.addEventListener('click', function() {
            proximaEtapa(indice);
        });
    });

    botoesAnterior.forEach(function(botao, indice) {
        botao.addEventListener('click', function() {
            etapaAnterior(indice);
        });
    });
});
