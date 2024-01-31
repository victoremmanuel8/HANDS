
// const carousel = document.querySelector(".carousel"),
// firstImg = carousel.querySelectorAll("img")[0],
// arrowIcons = document.querySelectorAll(".wrapper i");

// let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

// const showHideIcons = () => {
//     // showing and hiding prev/next icon according to carousel scroll left value
//     let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
//     arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "bloock" : "block";
//     arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "block" : "block";
// }

// arrowIcons.forEach(icon => {
//     icon.addEventListener("click", () => {
//         let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
//         // if clicked icon is left, reduce width value from the carousel scroll left else add to it
//         carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
//         setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
//     });
// });

const carousel = document.querySelector(".carousel");
let isDragging = false,
    startPosition,
    startScrollLeft;

carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startPosition = e.pageX || e.touches[0].pageX;
    startScrollLeft = carousel.scrollLeft;
    carousel.style.scrollBehavior = "auto"; // Desativa o comportamento de rolagem suave temporariamente
});

carousel.addEventListener("mouseup", () => {
    isDragging = false;
    carousel.style.scrollBehavior = "smooth"; // Reativa o comportamento de rolagem suave
});

carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const currentPosition = e.pageX || e.touches[0].pageX;
    const distance = currentPosition - startPosition;
    carousel.scrollLeft = startScrollLeft - distance;
});

carousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    startPosition = e.touches[0].pageX;
    startScrollLeft = carousel.scrollLeft;
    carousel.style.scrollBehavior = "auto"; // Desativa o comportamento de rolagem suave temporariamente
});

carousel.addEventListener("touchend", () => {
    isDragging = false;
    carousel.style.scrollBehavior = "smooth"; // Reativa o comportamento de rolagem suave
});

carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentPosition = e.touches[0].pageX;
    const distance = currentPosition - startPosition;
    carousel.scrollLeft = startScrollLeft - distance;
});
