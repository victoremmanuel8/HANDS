// Obtém todas as divs com a classe 'form-input'
var divs = document.querySelectorAll('.form-input');

// Define o estilo 'display: inline-block' para a primeira div
divs[0].style.display = 'inline-block';

// Adiciona um evento de input a cada div
divs.forEach(function(div, index) {
    div.addEventListener('input', function() {
        // Remove a classe pulsating desta div
        this.classList.remove('pulsating');
        
        // Verifica se a div atual não é a última
        if (index < divs.length - 1) {
            // Mostra a próxima div
            divs[index + 1].style.display = 'inline-block';
            divs[index + 1].classList.add('pulsating'); // Adiciona a classe pulsating à próxima div
        }
    });
});
