let allowModification = true;

const carousel = document.querySelector(".carousel");

carousel.addEventListener("touchstart", (e) => {
    if (!allowModification) return;

    const touchStartX = e.touches[0].clientX;

    carousel.addEventListener("touchend", (e) => {
        if (!allowModification) return;

        const touchEndX = e.changedTouches[0].clientX;
        const threshold = 40; 
        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) >= threshold) {
            allowModification = false; // Impede modificações enquanto o rolamento está em andamento

            if (distance > 0) {
                carousel.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
            }

            // Habilita modificações após um breve intervalo (ajuste conforme necessário)
            setTimeout(() => {
                allowModification = true;
            }, 500); // 500 milissegundos (meio segundo) como exemplo
        }
    }, { once: true }); // Remove o event listener após a primeira execução
});
