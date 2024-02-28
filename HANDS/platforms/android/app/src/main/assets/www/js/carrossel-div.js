const carousel = document.querySelector(".carousel");

carousel.addEventListener("touchstart", (e) => {
    const touchStartX = e.touches[0].clientX;

    carousel.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const threshold = 40; 
        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) >= threshold) {
            if (distance > 0) {
                carousel.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
            }
        }
    }, { once: true }); // Remove o event listener após a primeira execução
});
