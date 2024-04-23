// Obtém todos os inputs
var inputs = document.querySelectorAll('.input');

// Define o estilo 'display: inline-block' para o primeiro e quarto inputs
inputs[0].style.display = 'inline-block';

// Adiciona um evento de input a cada input
inputs.forEach(function(input, index) {
    input.addEventListener('input', function() {
        // Remove a classe pulsating deste input
        this.classList.remove('pulsating');
        
        // Verifica se o input atual não é o último
        if (index < inputs.length - 1) {
            // Mostra o próximo input
            inputs[index + 1].style.display = 'inline-block';
            inputs[index + 1].classList.add('pulsating'); // Adiciona a classe pulsating ao próximo input
        }
    });
});