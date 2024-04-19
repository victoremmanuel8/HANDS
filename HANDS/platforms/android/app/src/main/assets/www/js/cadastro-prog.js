    // function startRegistration() {
    //     document.getElementById('step0').classList.add('hidden');
    //     document.getElementById('step1').classList.remove('hidden');
    // }

    // function previousStep(step) {
    //     document.getElementById('step' + step).classList.add('hidden');
    //     document.getElementById('step' + (step - 1)).classList.remove('hidden');
    //     if (step === 3) {
    //         updateText(1); // Atualiza o texto para o step 1 ao voltar
    //     }
    // }

    // function nextStep(step) {
    //     if (step === 1) {
    //         checkStep1();
    //     } else if (step === 2) {
    //         checkStep2();
    //     } else if (step === 3) {
    //         checkStep3();
    //     }
    // }


    // function checkStep1() {
    //     var nome = document.getElementById('nome').value.trim();
    //     var sobrenome = document.getElementById('sobrenome').value.trim();
    //     var email = document.getElementById('email').value.trim();

    //     if (nome !== '' && sobrenome !== '' && email !== '') {
    //         document.getElementById('step1').classList.add('hidden');
    //         document.getElementById('step2').classList.remove('hidden');
    //     }
    // }

    // function checkStep2() {
    //     var senha = document.getElementById('senha').value.trim();
    //     var confirmarSenha = document.getElementById('confirmarSenha').value.trim();

    //     if (senha !== '' && confirmarSenha !== '' && senha === confirmarSenha) {
    //         document.getElementById('step2').classList.add('hidden');
    //         document.getElementById('step3').classList.remove('hidden');
    //     }
    // }

    // function checkStep3() {
    //     var termos = document.getElementById('termos').checked;

    //     if (termos) {
    //         // Aqui você pode adicionar a lógica para enviar o formulário
    //         alert('Formulário enviado com sucesso!');
    //     }
    // }