const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const svgImage = document.querySelector(".svg-image");
const successGif = document.querySelector(".success-gif");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".btnRestart");

import questions from "./questoes.js";

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
};

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    if (questionsCorrect === questions.length) {
      finishWithSuccess();
    } else {
      finish();
    }
  }
}

function finish() {
  textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";

  if (questionsCorrect === questions.length) {
    fetch("/auth/atividades", {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }
}

function finishWithSuccess() {
  textFinish.innerHTML = `Parabéns! Você acertou todas as ${questions.length} questões!`;
  content.style.display = "none";
  successGif.style.display = "block";
  if (questionsCorrect === questions.length) {
    fetch("/auth/atividades", {
      method: "PUT",
    });
    setTimeout(() => {
      successGif.style.display = "none";
      contentFinish.style.display = "flex";
    }, 2000); // 2 segundos
  }
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  svgImage.src = item.svg;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
