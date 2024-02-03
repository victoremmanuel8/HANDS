const carousel = document.querySelector(".carousel");
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

carousel.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", () => {
    const threshold = 50; // Define a distância mínima que o dedo precisa percorrer para mudar de página
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) >= threshold) {
        if (distance > 0) {
            // Deslize para a direita, mudar para a página anterior
            carousel.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
        } else {
            // Deslize para a esquerda, mudar para a próxima página
            carousel.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
        }
    }
});
