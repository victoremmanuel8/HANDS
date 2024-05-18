function startRegistration() {
  document.getElementById("step0").classList.add("hidden");
  document.getElementById("step1").classList.remove("hidden");

  // Mostrar o botão após 6 segundos somente no passo 1
  setTimeout(function () {
    document.querySelector(".voltar").style.display = "inline-block";
  }, 6500);
}

function previousStep(step) {
  document.getElementById("step" + step).classList.add("hidden");
  document.getElementById("step" + (step - 1)).classList.remove("hidden");
}

function nextStep(step) {
  if (step === 1) {
    checkStep1();
  } else if (step === 2) {
    checkStep2();
  } else if (step === 3) {
    checkStep3();
  }
}

function checkStep1() {
  var nomeInput = document.getElementById("nome");
  var sobrenomeInput = document.getElementById("sobrenome");
  var emailInput = document.getElementById("email");

  var nome = nomeInput.value.trim();
  var sobrenome = sobrenomeInput.value.trim();
  var email = emailInput.value.trim();

  // Expressões regulares para validação
  var nomeRegex = /^[a-zA-ZÀ-ÿ\s']{2,}$/; // Pelo menos duas letras, permitindo acentos e espaços
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Verifica o formato do email

  // Lista de palavras de baixo calão
  var palavrasProibidas = [
    "pau",
    "biscate",
    "mãe",
    "pai",
    "vo",
    "vó",
    "vô",
    "tia",
    "tio",
    "prima",
    "primo",
    "irmã",
    "safada",
    "fds",
    "pika",
    "piroca",
    "buceta",
    "bct",
    "vagina",
    "xana",
    "xereca",
    "larisinha",
    "cu",
    "uc",
    "cool",
    "cookie",
    "porra",
    "poha",
    "caralho",
    "cona",
    "foda",
    "foda-se",
    "foder",
    "fodido",
    "fodida",
    "fodidos",
    "fodidas",
    "fodemos",
    "fodem",
    "foda",
    "fodilhão",
    "fodilhona",
    "fodona",
    "fode",
    "foderes",
    "fodes",
    "fodendo",
    "fodesse",
    "cona",
    "foda",
    "foda-se",
    "fodido",
    "fodida",
    "fodidos",
    "fodidas",
    "fodemos",
    "fodem",
    "foda",
    "fode",
    "foder",
    "foderes",
    "fodes",
    "fodendo",
    "fodesse",
    "caralho",
  ];

  // Lista de palavras permitidas
  var palavrasPermitidas = ["paulo", "pietra", "pietro"]; // Adicione aqui as palavras permitidas

  // Verifica se o nome contém palavras proibidas, exceto as excepcionais
  var nomeValido =
    ((nomeRegex.test(nome) &&
      !palavrasProibidas.some((palavra) =>
        nome.toLowerCase().includes(palavra.toLowerCase())
      )) ||
      palavrasPermitidas.includes(nome.toLowerCase())) &&
    nome.length >= 2;

  // Verifica se o sobrenome contém palavras proibidas, exceto as excepcionais
  var sobrenomeValido =
    nomeRegex.test(sobrenome) &&
    (!palavrasProibidas.some((palavra) =>
      sobrenome.toLowerCase().includes(palavra.toLowerCase())
    ) ||
      palavrasPermitidas.includes(sobrenome.toLowerCase())) &&
    sobrenome.length >= 2;

  // Verifica se os campos não estão vazios e seguem as regras de validação
  if (
    nome !== "" &&
    sobrenome !== "" &&
    email !== "" &&
    nomeValido &&
    sobrenomeValido &&
    emailRegex.test(email)
  ) {
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.remove("hidden");
  } else if (!nomeValido) {
    exibirTextoPalavra();
  } else {
    exibirTextoErro();
  }
}

function exibirTextoErro() {
  escreverTexto(
    "Verifique se todos os campos foram digitados corretamente",
    document.getElementById("texto5"),
    0.1,
    () => {
      document.querySelector(".balao1").style.display = "block";
      limparTexto(document.getElementById("texto5"), 3500); // Limpa o texto após 3 segundos
    }
  );
}

function exibirTextoPalavra() {
  escreverTexto(
    "Nome não permitido, verifique se foi digitado corretamente ou se existe campos vazios",
    document.getElementById("texto6"),
    0.1,
    () => {
      document.querySelector(".balao1").style.display = "block";
      limparTexto(document.getElementById("texto6"), 3500); // Limpa o texto após 3 segundos
    }
  );
}

// Funções auxiliares de escrita e limpeza de texto
function escreverTexto(texto, elemento, velocidade = 50, callback) {
  let i = 0;
  const intervalo = setInterval(function () {
    elemento.textContent += texto.charAt(i);
    i++;
    if (i > texto.length) {
      clearInterval(intervalo);
      callback();
    }
  }, velocidade);
}

function limparTexto(elemento, delay) {
  setTimeout(function () {
    elemento.textContent = ""; // Limpa o conteúdo do elemento
  }, delay);
}

document.getElementById("nome").addEventListener("keypress", function (event) {
  // Obtém o código da tecla digitada
  var keyCode = event.keyCode || event.which;
  var keyChar = String.fromCharCode(keyCode);

  // Verifica se o caractere é um número, um caractere especial ou um dos caracteres restritos
  if (
    (keyCode >= 48 && keyCode <= 57) ||
    /[!@#$%^&*()[\]\-+=_'":;\/\\{}<>|,.¨?`ªº§¹²³£¢¬₢]/.test(keyChar)
  ) {
    event.preventDefault();
  }
});

document
  .getElementById("sobrenome")
  .addEventListener("keypress", function (event) {
    // Obtém o código da tecla digitada
    var keyCode = event.keyCode || event.which;
    var keyChar = String.fromCharCode(keyCode);

    // Verifica se o caractere é um número, um caractere especial ou um dos caracteres restritos
    if (
      (keyCode >= 48 && keyCode <= 57) ||
      /[!@#$%^&*()[\]\-+=_'":;\/\\{}<>|,.¨?`ªº§¹²³£¢¬₢]/.test(keyChar)
    ) {
      event.preventDefault();
    }
  });

function checkStep2() {
  var senha = document.getElementById("senha").value.trim();
  var confirmarSenha = document.getElementById("confirmarSenha").value.trim();
  var balaoErro = document.getElementById("balaoErro");

  // Expressão regular para verificar se a senha tem pelo menos 6 caracteres e uma letra maiúscula
  var senhaRegex = /^(?=.*[A-Z]).{6,}$/;

  if (
    senha !== "" &&
    confirmarSenha !== "" &&
    senha === confirmarSenha &&
    senhaRegex.test(senha)
  ) {
    document.getElementById("step2").classList.add("hidden");
    document.getElementById("step3").classList.remove("hidden");
  } else {
    if (!senhaRegex.test(senha)) {
      balaoErro.textContent =
        "A senha deve ter pelo menos 6 caracteres e conter pelo menos 1 letra maiúscula. Por favor, verifique e tente novamente. 😔";
    } else {
      balaoErro.textContent =
        "As senhas não são compatíveis. Por favor, verifique e tente novamente. 😔";
    }
    const balao = document.getElementById("balaoErro");
    balao.style.display = "block";
  }
}

function checkStep3() {
  var termos = document.getElementById("termos").checked;

  if (termos) {
    // Aqui você pode adicionar a lógica para enviar o formulário
  }
}
