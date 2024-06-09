// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const firstHalf = carousel.innerHTML;
    const secondHalf = carousel.innerHTML;
    carousel.innerHTML = firstHalf + secondHalf;
});
