// texto bonitinho

const debounce = function (func, wait, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const target = document.querySelectorAll("[data-anime]");
const animationClass = "animate";

function animeScroll() {
  const windowTop = window.pageYOffset + window.innerHeight * 0.7;
  target.forEach(function (elemento) {
    if (windowTop > elemento.offsetTop) {
      elemento.classList.add(animationClass);
    } else {
      // elemento.classList.remove(animationClass);
    }
  });
}

animeScroll();

if (target.length) {
  //length me da o total de itens q existem dentro do target
  window.addEventListener(
    "scroll",
    debounce(function () {
      animeScroll();
    }, 1 /*quanto tempo que vai ter a espera, nesse caso ta em 1 ms*/)
  );
}
