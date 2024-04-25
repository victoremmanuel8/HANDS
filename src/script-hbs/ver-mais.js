document.addEventListener("DOMContentLoaded", function() {
  var lerMaisBtn = document.querySelector('.ler-mais-btn');
  var maisConteudo = document.querySelector('.mais-conteudo');

  lerMaisBtn.addEventListener('click', function() {
      if (maisConteudo.style.display === 'none' || maisConteudo.style.display === '') {
          maisConteudo.style.display = 'block';
          lerMaisBtn.innerText = 'ver menos';
      } else {
          maisConteudo.style.display = 'none';
          lerMaisBtn.innerText = 'Ver mais...';
      }
  });
});
