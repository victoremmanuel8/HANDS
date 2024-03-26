
// const carousel = document.querySelector(".carousel");
// let isDragging = false,
//     startPosition,
//     startScrollLeft;

// carousel.addEventListener("mousedown", (e) => {
//     isDragging = true;
//     startPosition = e.pageX || e.touches[0].pageX;
//     startScrollLeft = carousel.scrollLeft;
//     carousel.style.scrollBehavior = "auto"; // Desativa o comportamento de rolagem suave temporariamente
// });

// carousel.addEventListener("mouseup", () => {
//     isDragging = false;
//     carousel.style.scrollBehavior = "smooth"; // Reativa o comportamento de rolagem suave
// });

// carousel.addEventListener("mousemove", (e) => {
//     if (!isDragging) return;
//     const currentPosition = e.pageX || e.touches[0].pageX;
//     const distance = currentPosition - startPosition;
//     carousel.scrollLeft = startScrollLeft - distance;
// });

// carousel.addEventListener("touchstart", (e) => {
//     isDragging = true;
//     startPosition = e.touches[0].pageX;
//     startScrollLeft = carousel.scrollLeft;
//     carousel.style.scrollBehavior = "auto"; // Desativa o comportamento de rolagem suave temporariamente
// });

// carousel.addEventListener("touchend", () => {
//     isDragging = false;
//     carousel.style.scrollBehavior = "smooth"; // Reativa o comportamento de rolagem suave
// });

// carousel.addEventListener("touchmove", (e) => {
//     if (!isDragging) return;
//     const currentPosition = e.touches[0].pageX;
//     const distance = currentPosition - startPosition;
//     carousel.scrollLeft = startScrollLeft - distance;
// });

const carousel = document.querySelector(".carousel");
let isDragging = false,
    startPosition,
    startScrollLeft;

carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startPosition = e.pageX;
    startScrollLeft = carousel.scrollLeft;
    carousel.style.scrollBehavior = "auto";
});

carousel.addEventListener("mouseup", () => {
    isDragging = false;
    carousel.style.scrollBehavior = "smooth";
});

carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const currentPosition = e.pageX;
    const distance = currentPosition - startPosition;
    carousel.scrollLeft = startScrollLeft - distance;
});

carousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    startPosition = e.touches[0].pageX;
    startScrollLeft = carousel.scrollLeft;
    carousel.style.scrollBehavior = "auto";
});

carousel.addEventListener("touchend", () => {
    isDragging = false;
    carousel.style.scrollBehavior = "smooth";
});

carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentPosition = e.touches[0].pageX;
    const distance = currentPosition - startPosition;
    carousel.scrollLeft = startScrollLeft - distance;
});

carousel.addEventListener("wheel", (e) => {
    e.preventDefault();
    const scrollAmount = e.deltaY * 5; // Ajuste a sensibilidade de rolagem conforme necessário
    carousel.scrollLeft += scrollAmount;
});
