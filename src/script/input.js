
// Obtém todos os inputs, a div com a classe "row", a div com a classe "g-recaptcha", o input com a classe "btn-primary", o label com a classe "nascimento" e o elemento com a classe "row1"
var inputs = document.querySelectorAll('.input');
var rowDiv = document.querySelector('.row');
var recaptchaDiv = document.querySelector('.g-recaptcha');
var btnPrimary = document.querySelector('.btn-primary');
var labelNascimento = document.querySelector('.nascimento');
var row1Div = document.querySelector('.row1');

// Define o estilo 'display: inline-block' para o primeiro input
inputs[0].style.display = 'inline-block';

// Calcula o deslocamento de rolagem para 1/6 da altura da tela
var scrollOffset = window.innerHeight / 4;

// Função para rolar a página suavemente
function smoothScroll(element, offset) {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop - offset
    });
}

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
            
            // Rola suavemente para o próximo input
            smoothScroll(inputs[index + 1], scrollOffset);
            
            // Se o index é 1 (segundo input), mostra o label com a classe "nascimento"
            if (index === 1 && labelNascimento) {
                labelNascimento.style.display = 'inline-block';
            }
        } else {
            // Se o último input foi preenchido, mostra a div com a classe "row"
            rowDiv.style.display = 'block';
            
            // Se a div com a classe "g-recaptcha" estiver presente, mostra ela também
            if (recaptchaDiv) {
                recaptchaDiv.style.display = 'block';
            }
            
            // Se o input com a classe "btn-primary" estiver presente, mostra ele também
            if (btnPrimary) {
                btnPrimary.style.display = 'inline-block';
            }

            // Se o index é 5 (sexto input), mostra o elemento com a classe "row1"
            if (index === 5 && row1Div) {
                row1Div.style.display = 'block';
            }
            
            // Rola suavemente para a div com a classe "row", "g-recaptcha", o input com a classe "btn-primary", o label com a classe "nascimento" ou o elemento com a classe "row1"
            smoothScroll(rowDiv || recaptchaDiv || btnPrimary || labelNascimento || row1Div, scrollOffset);
        }
        
        // Rola suavemente para o último input sempre que um novo input for exibido
        smoothScroll(inputs[inputs.length - 1], scrollOffset);
    });
});
