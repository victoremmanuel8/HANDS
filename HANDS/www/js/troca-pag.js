// Função para adicionar classe de cobertura e navegar para a próxima página
function navigateWithCover(href) {
    const transition = document.getElementById('transition');
    transition.classList.add('cover-left'); // Adiciona a classe de cobertura (cobrir da esquerda)
    setTimeout(() => {
        window.location.href = href; // Navega para a próxima página após a transição
    }, 500); // Tempo da animação em milissegundos
}

// Função para adicionar classe de cobertura e navegar para a página anterior
function navigateBackWithCover(href) {
    const transition = document.getElementById('transition');
    transition.classList.add('cover-right'); // Adiciona a classe de cobertura (cobrir da direita)
    setTimeout(() => {
        window.location.href = href; // Navega para a página anterior após a transição
    }, 500); // Tempo da animação em milissegundos
}