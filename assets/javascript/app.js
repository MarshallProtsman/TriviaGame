//TIMER

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const gameOver = document.getElementById("game-over")

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
      quizContainer.style.display = 'none';
      console.log("Quiz over");
      submitButton.style.display = 'none;'
      gameOver.style.display = 'inline';
      showResults();
    }
  }, 1000);
}
function startIt(x) {
  var Minute = 60,
    display = document.querySelector("#timer");
  startTimer(Minute * x, display);
  console.log(parseInt((Minute * x) / 60) + ":00");
}

//Calls the timer and passes the ammount of time
startIt(1);

// QUESTIONS
const myQuestions = [
  {
    question: "How many ounces are in a cappucino?",
    answers: {
      a: "10 ounces",
      b: "6 ounces",
      c: "8 ounces",
      d: "depends on what size you order"
    },
    correctAnswer: "c"
  },
  {
    question: "What is my favorite drink?",
    answers: {
      a: "americano",
      b: "iced latte",
      c: "caramel macchiato"
    },
    correctAnswer: "a"
  },
  {
    question: "How do you do?",
    answers: {
      a: "good",
      b: "bad",
      c: "okay"
    },
    correctAnswer: "c"
  },
  {
      question: "Who is dwayne Shivers?",
        answers: {
            a: 'Micah Dalton',
            b: 'Jeffery Scott',
            c: 'Tim Apple'
        },
        correctAnswer: 'a'
  }
];

function buildQuiz() {

  const output = [];
  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    for (letter in currentQuestion.answers) {
      answers.push(
        `<label>
            <input type="radio" name="question${questionNumber}"
            value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
            </label>`
      );
    }
    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>
        `
    );
  });
  quizContainer.innerHTML = output.join("");
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".answers");

  let numCorrect = 0;

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;

      answerContainers[questionNumber].style.color = "lightblue";
    } else {
      answerContainers[questionNumber].style.color = "red";
    }
  });
  resultsContainer.innerHTML = `You got ${numCorrect} out of ${
    myQuestions.length
  } correct`;
}

buildQuiz();
submitButton.addEventListener("click", showResults);
