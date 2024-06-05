const txt = document.querySelector("#class");
function updateProgressBar() {
var senha = document.getElementById("senha").value;
var progress = 0;

// Verifica o comprimento da senha
if (senha.length >= 8) {
    progress = 25;
    
    // Verifica se contém somente números ou somente letras
    if (/^\d+$/.test(senha) || /^[a-zA-Z]+$/.test(senha)) {
    // Permanece em 25% caso seja somente números ou somente letras
    } else {
    progress = 50;
    }
    
    // Verifica se contém número, letra e uma letra maiúscula
    if (/\d/.test(senha) && /[a-z]/.test(senha) && /[A-Z]/.test(senha)) {
    progress = 75;
    }
    
    // Verifica se contém número, letra, letra maiúscula e caractere especial
    if (/\d/.test(senha) && /[a-z]/.test(senha) && /[A-Z]/.test(senha) && /\W|_/.test(senha)) {
    progress = 100;
    }
}

document.getElementById("progress").style.width = progress + "%";
updateProgressBarColor(progress);
}

function updateProgressBarColor(progress) {
var progressBar = document.getElementById("progress");

if (progress === 25) {
    progressBar.style.backgroundColor = "#be1515ef"; // Vermelho
   fraca();
} else if (progress === 50) {
    progressBar.style.backgroundColor = "#eeea14ef"; // Amarelo
    boa();
} else if (progress === 75) {
    progressBar.style.backgroundColor = "#16569ec9"; // Azul
    muitoBoa();
} else if (progress === 100) {
    progressBar.style.backgroundColor = "#169e93c9"; // Verde
    excelente();
}
}

function fraca() {
    txt.innerHTML = "Fraca";
}
function boa() {
    txt.innerHTML = "Boa";
}
function muitoBoa() {
    txt.innerHTML = "Muito boa";
}
function excelente() {
    txt.innerHTML = ' <a class="termos" href="/termos-uso">excelente </a> ';
}
