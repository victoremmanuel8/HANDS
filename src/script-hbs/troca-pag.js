// texto bonitinho

// o debouce ta fazendo o script funcionar direito, sem ele a função não acontece e o texto continua com opacidade 0
const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
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

/*
    A função debounce recebe três parâmetros:

    func: A função que será executada.
    wait: O tempo de espera em milissegundos. Após esse período de tempo, a função será executada se não houver mais chamadas.
    immediate: Um valor booleano opcional. Se for true, a função será executada imediatamente na primeira chamada e, em seguida,
    aguardará o tempo de espera até poder ser chamada novamente. Se for false ou não for fornecido, a função aguardará o tempo 
    de espera antes de ser executada pela primeira vez.
*/
  
  const target = document.querySelectorAll('[data-anime]');
  const animationClass = 'animate';
  
  function animeScroll() {
    const windowTop = window.pageYOffset + (window.innerHeight * 0.70);
    target.forEach(function(elemento) {
      if((windowTop) > elemento.offsetTop) {
        elemento.classList.add(animationClass);
      } else {
        // elemento.classList.remove(animationClass);
      }
    })
  }
  
  animeScroll();
  
  if(target.length) { //length me da o total de itens q existem dentro do target
    window.addEventListener('scroll', debounce(function() {
      animeScroll();
    }, 1 /*quanto tempo que vai ter a espera, nesse caso ta em 1 ms*/ ));
  }

  
















//   {{!-- <div class="background">
//   <svg width="140%" height="180vh" viewBox="0 0 1280 1490" fill="none" xmlns="http://www.w3.org/2000/svg">
// <g filter="url(#filter0_f_385_10)">
// <ellipse cx="215.5" cy="178.984" rx="242.5" ry="276.192" fill="#C2D9F4"/>
// </g>
// <g filter="url(#filter1_f_385_10)">
// <ellipse cx="179.032" cy="181.856" rx="179.032" ry="181.856" transform="matrix(0.997138 0.0755975 -0.0647442 0.997902 -13.0385 -54.0126)" fill="#FFABD5"/>
// </g>
// <g filter="url(#filter2_f_385_10)">
// <ellipse cx="63.5" cy="89.8024" rx="100.5" ry="119.989" fill="#B5FBEF"/>
// </g>
// <g filter="url(#filter3_f_385_10)">
// <ellipse cx="1138.5" cy="555.192" rx="242.5" ry="276.192" fill="#FF6D9C"/>
// </g>
// <g filter="url(#filter4_f_385_10)">
// <ellipse cx="562.375" cy="637.655" rx="101.375" ry="115.459" fill="#E96BFD" fill-opacity="0.5"/>
// </g>
// <g filter="url(#filter5_f_385_10)">
// <ellipse cx="179.032" cy="181.856" rx="179.032" ry="181.856" transform="matrix(0.997138 0.0755975 -0.0647442 0.997902 948.548 1639.93)" fill="#FF6D9C"/>
// </g>
// <g filter="url(#filter6_f_385_10)">
// <ellipse cx="1158.5" cy="-53.4281" rx="227.5" ry="254.572" fill="#FF66B2"/>
// </g>
// <g filter="url(#filter7_f_385_10)">
// <ellipse cx="99.9911" cy="892.434" rx="121.962" ry="138.907" fill="#AD00B0" fill-opacity="0.5"/>
// </g>
// <g filter="url(#filter8_f_385_10)">
// <ellipse cx="76.9618" cy="1754.66" rx="121.962" ry="138.907" fill="#AD00B0" fill-opacity="0.5"/>
// </g>
// <g filter="url(#filter9_f_385_10)">
// <ellipse cx="90.0413" cy="91.4619" rx="90.0413" ry="91.4619" transform="matrix(0.997138 0.0755975 -0.0647442 0.997902 -99.949 455)" fill="#FF6D9C"/>
// </g>
// <g filter="url(#filter10_f_385_10)">
// <ellipse cx="-61.455" cy="527.33" rx="50.545" ry="60.3469" fill="#E6DBF5"/>
// </g>
// {{!-- <rect width="1280" height="2490" fill="#FBCCFF" fill-opacity="0.3"/> --}}
// <defs>
// <filter id="filter0_f_385_10" x="-327" y="-397.208" width="1085" height="1152.38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
// <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_385_10"/>
// </filter>
// <filter id="filter1_f_385_10" x="-325.207" y="-340.991" width="957.828" height="963.974" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
// <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_385_10"/>
// </filter>
// <filter id="filter2_f_385_10" x="-337" y="-330.187" width="801" height="839.979" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
// <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_385_10"/>
// </filter>
// <filter id="filter3_f_385_10" x="596" y="-21" width="1085" height="1152.38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
// <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_385_10"/>
// </filter>
// <filter id="filter4_f_385_10" x="261" y="322.196" width="602.75" height="630.918" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
// <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_385_10"/>
// </filter>
// <filter id="filter5_f_385_10" x="636.38" y="1352.96" width="957.828" height="963.974" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
// <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_385_10"/>
// </filter>
// <filter id="filter6_f_385_10" x="631" y="-608" width="1055" height="1109.14" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
// <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_385_10"/>
// </filter>
// <filter id="filter7_f_385_10" x="-321.971" y="453.527" width="843.924" height="877.813" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
// <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_385_10"/>
// </filter>
// <filter id="filter8_f_385_10" x="-345" y="1315.75" width="843.924" height="877.813" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
// <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_385_10"/>
// </filter>
// <filter id="filter9_f_385_10" x="-406.069" y="161.549" width="779.964" height="783.055" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
// <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_385_10"/>
// </filter>
// <filter id="filter10_f_385_10" x="-412" y="166.983" width="701.09" height="720.694" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
// <feFlood flood-opacity="0" result="BackgroundImageFix"/>
// <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
// <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_385_10"/>
// </filter>
// </defs>
// </svg>
// </div>
// <div class="area-cadastro">
//    <div>
//        <h3 class="titulo-1">Seja bem-vindo ao HANDS</h3>
//        <h4 class="titulo-2">Crie sua conta conosco</h4>
//    </div>
//         <div class="area-cadastro">
//           <div class="alert-text">
//              {{#each erros}}
//            <div class="alertalert-danger">{{text}}</div>
//              {{/each}}
//            </div>
//           {{#if message }}
// <div class="alert-text">{{message}}</div>
// {{/if}}
//    <div class="progresso"></div>
//    <div class="campos">
//        <form id="Form" action="/auth/cadastro" method="POST" required>
//        <input class="input" type="text" name="nome" id="" placeholder="Nome" required>
//        <input class="input" type="text" name="sobrenome" id="" placeholder="Sobrenome" required>
//        <input class="input" type="date" name="dt_nascimento" id="dt_nascimento" placeholder="Data de nascimento" required>
//        <input class="input" type="email" name="email" id="" placeholder="E-mail" required>
//        <input class="input" type="password" name="senha" id="" placeholder="Senha" required>
//        <input class="input" type="password" name="Confir_Senha" id="" placeholder="Confirmação de senha" required>
//        <br>
//        <div class="g-recaptcha" data-sitekey="6LcW8X4pAAAAAKHfmywUcAyarIYi5RwVY7DVPP20" data-callback="onSubmit">
//        </div>
//        <div class="termos_uso">
//            <div class="row">
//                <input class="check" type="checkbox" id="termos_uso" name="termos_uso" required>
//                <p for="termos_uso">Concordo com os <a href="/termos-uso" target="_blank">Termos de Uso</a></p>
//            </div>
//             <input class="button" type="submit" id= "submit" class="btn btn-primary" disabled/>
//        </div>
//        <br>
//        </form>
//    </div>
//    <footer>
//        <p class="titulo-3">Já possuí uma conta? <a href="/">Log in</a></p>
//        <p class="título-3">ou</p>
//            <a href="/auth/google">Login com o google</a>
//    </footer>
// </div>
// <script src="/troca-pag.js"></script>
// <script src="cordova.js"></script>
// <script src="/index.js"></script>
// <script src="/carrossel.js"></script> --}}