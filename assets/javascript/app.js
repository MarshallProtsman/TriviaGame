// making constants
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const gameOver = document.getElementById("game-over");

//Set allowed quiz time here (unit = minutes)
const quizTime = 0.5;

//create a timer function
function startTimer(duration, display) {
  //the timer is equal to the duration
  var timer = duration,
    minutes,
    seconds;
  //
  setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    // If the minutes or seconds value is one digit, add a "0" before
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    //display it
    `<div class='time2'>
    ${(display.textContent = minutes + ":" + seconds)}
    </div>`;
    
    // what to do if the timer hits zero
    if (--timer < 0) {
      timer = "";
      //stop displaying the quiz body
      quizContainer.style.display = "none";
      console.log("Quiz over");
      //stop displaying the submit button
      submitButton.style.display = "none;";
      // show the game over text
      gameOver.style.display = "inline";
      showResults();
    }
  }, 1000);
}
function startIt(x) {
  var Minute = 60,
    display = document.querySelector("#timer");
  startTimer(Minute * x, display);
  console.log(parseInt((Minute * x) / 60) + ":00");
  //   startTimer.style.display = "none";
}


//Calls the timer and passes the ammount of time
startIt(quizTime);

// ALL MY QUESTIONS AND ANSWERS IN AN ARRAY
const myQuestions = [
  {
    question: "How many ounces are in a traditional cappucino?",
    answers: {
      a: "10 ounces",
      b: "6 ounces",
      c: "8 ounces",
      d: "depends on what size you order"
    },
    correctAnswer: "c"
  },
  {
    question: "Which country is the largest producer of coffee?",
    answers: {
      a: "Brazil",
      b: "Ethiopia",
      c: "Columbia"
    },
    correctAnswer: "a"
  },
  {
    question: "What are coffee beans technically?",
    answers: {
      a: "Fruits",
      b: "Beans, duh...",
      c: "Seeds"
    },
    correctAnswer: "c"
  },
  {
    question: "What does espresso mean in Italian?",
    answers: {
      a: '"express" ',
      b: '"quickly" ',
      c: '"Pressed out" '
    },
    correctAnswer: "c"
  }
];

// a function to make a quiz. Called back to at the end
function buildQuiz() {
  //creating an array
  const output = [];

  // loop that for each object in the array of q/a stuff, assigns it as current question and question number
  myQuestions.forEach((currentQuestion, questionNumber) => {
    // create an array to contain answers
    const answers = [];
    for (letter in currentQuestion.answers) {
      //pushes the
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

      answerContainers[questionNumber].style.color = "#609BCD";
    } else {
      answerContainers[questionNumber].style.color = "red";
    }
  });
  resultsContainer.innerHTML = `You got ${numCorrect} out of ${
    myQuestions.length
  } correct`;
}

buildQuiz();
submitButton.addEventListener("click", function() {
  showResults();
  submitButton.style.display = "none";
});
resetButton.addEventListener("click", function() {
  buildQuiz();
  submitButton.style.display = "inline";
  quizContainer.style.display = "inline";
  startTimer();
  startIt();
  startIt(quizTime);
});
