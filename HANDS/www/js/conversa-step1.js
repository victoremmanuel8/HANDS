let textoStep1Exibido = false;

document.getElementById('btn-cadastro').addEventListener('click', function() {
    document.getElementById('step0').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
    if (!textoStep1Exibido) {
        exibirTextoStep1(0);
        exibirCamposStep1();
        textoStep1Exibido = true;
    }
});

