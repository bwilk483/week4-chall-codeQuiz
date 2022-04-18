var startBtnEl = document.querySelector("#start-quiz"); //targets the start button
var timerEl = document.querySelector("#timer"); //targets the timer
var mainHead = document.querySelector("#main-head"); //targets Main Head ID
var mainP = document.querySelector("#main-p"); //target Main P Id
var headerEl = document.querySelector("#header"); //targets header
var pageContentEl = document.querySelector("#question-text"); //targets page content
var highscoreBtnEl = document.querySelector(".btn-vhs"); //targets high score btn
var questionCount = 0; //counts how many questions have been asked
var questionNum = {}; //empty object to pass questions through

//--------------------------Timer Variable------------------------------
var timeLeft = 0; //sets timer
timerEl.textContent = "time: " + timeLeft;

//--------------------------displays answer corrent or wrong------------------------------
var correctAnswer = document.createElement("div");
correctAnswer.className = "user-answer";
correctAnswer.textContent = "Previous Question: CORRECT!";
var incorrectAnswer = document.createElement("div");
incorrectAnswer.className = "user-answer";
incorrectAnswer.textContent = "Previous Question: WRONG!";

// array of questions to be askeed
var questionList = [
  {
    question: "Commonly used data types do NOT include:",
    answerOne: "Strings",
    answerTwo: "Booleans",
    answerThree: "Alerts",
    answerFour: "Numbers",
    correct: "answer-three",
  },
  {
    question: "The condition in an if/else statement is enclosed with:",
    answerOne: "Quotes",
    answerTwo: "Curly Brackets",
    answerThree: "Parenthesis",
    answerFour: "Square Brackets",
    correct: "answer-two",
  },
  {
    question:
      "A useful tool used during debugging to print content to the debugger is:",
    answerOne: "JavaScript",
    answerTwo: "For Loops",
    answerThree: "Terminal/Bash",
    answerFour: "console.log",
    correct: "answer-four",
  },
  {
    question: "Arrays can be used to store:",
    answerOne: "Numbers and Strings",
    answerTwo: "Other Arrays",
    answerThree: "Booleans",
    answerFour: "All of the Above",
    correct: "answer-four",
  },
  {
    question:
      "String values must be enclosed within ___ when being assigned to variables.",
    answerOne: "Quotes",
    answerTwo: "Curly Brackets",
    answerThree: "Parenthesis",
    answerFour: "Square Brackets",
    correct: "answer-one",
  },
  {
    question: "Arrays are enclosed with:",
    answerOne: "Quotes",
    answerTwo: "Curly Brackets",
    answerThree: "Parenthesis",
    answerFour: "Square Brackets",
    correct: "answer-four",
  },
];
//--------------------------Makes the html for each question------------------------------

var questionHead = document.createElement("h1"); //create h1
questionHead.className = "mb-5";
var questionDiv = document.createElement("ol"); //create ordered list
questionDiv.className = "row";
var questionBtnOne = document.createElement("button"); //create button
questionBtnOne.className = "answer-one btn text-white col-5 m-1";
questionBtnOne.id = "start-quiz";
questionBtnOne.type = "button";
var questionBtnTwo = document.createElement("button"); //create button
questionBtnTwo.className = "answer-two btn text-white col-5 m-1";
questionBtnTwo.id = "start-quiz";
questionBtnTwo.type = "button";
var questionBtnThree = document.createElement("button"); //create button
questionBtnThree.className = "answer-three btn text-white col-5 m-1";
questionBtnThree.id = "start-quiz";
questionBtnThree.type = "button";
var questionBtnFour = document.createElement("button"); //create button
questionBtnFour.className = "answer-four btn text-white col-5 m-1";
questionBtnFour.id = "start-quiz";
questionBtnFour.type = "button";

//create highscore input element
var scoreForm = document.createElement("form");

//create highscore initial input
var userScore = document.createElement("input");
userScore.className = "user-score";
userScore.type = "text";
userScore.placeholder = "Enter initials";
scoreForm.appendChild(userScore);

//create highscore submit button
var scoreBtn = document.createElement("button");
scoreBtn.className = "submit-btn";
scoreBtn.type = "submit";
scoreBtn.textContent = "Submit Highscore";
scoreForm.appendChild(scoreBtn);

//create go back/restart quiz button
var goBackBtn = document.createElement("button"); //create Go Back button
goBackBtn.className = "go-back";
goBackBtn.textContent = "Go Back";

//create clear highscores button
var clearScoreBtn = document.createElement("button"); //create clear highscore button
clearScoreBtn.className = "clear-score";
clearScoreBtn.textContent = "Clear Highscores";

//--------------------------Starts the Quiz------------------------------
var startQuiz = function () {
  timeLeft = 75; // sets timer to 75

  // removes all the start quiz info from screen
  mainHead.remove();
  mainP.remove();
  startBtnEl.remove();

  //starts the timer and countdown
  timeStart = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = "Time: " + timeLeft;
      timeLeft--; // lowers the time by the amount set below
    } else {
      timerEl.textContent = ""; // removes timer
      clearInterval(timeStart); // clears timer
      stopQuiz(); // runs stop Quiz
    }
  }, 1000); // sets countdown by 1 sec

  createQuestion(); // runs questions
};

//--------------------------Creates question html/adds answer btn listeners------------------------------
var createQuestion = function () {
  //gets a question from the list
  questionHead.textContent = questionList[questionCount].question;
  pageContentEl.appendChild(questionHead); // adds question to page as h1

  questionDiv.textContent = "";
  pageContentEl.appendChild(questionDiv); //add ol to page

  questionBtnOne.textContent = questionList[questionCount].answerOne;
  questionDiv.appendChild(questionBtnOne); //add button for answer 1

  questionBtnTwo.textContent = questionList[questionCount].answerTwo;
  questionDiv.appendChild(questionBtnTwo); //add button for answer 2

  questionBtnThree.textContent = questionList[questionCount].answerThree;
  questionDiv.appendChild(questionBtnThree); //add button for answer 3

  questionBtnFour.textContent = questionList[questionCount].answerFour;
  questionDiv.appendChild(questionBtnFour); //add button for answer 4

  //add click listeners for each answer button
  var questionOneBtnEl = document.querySelector(".answer-one");
  questionOneBtnEl.addEventListener("click", nextQuestion);
  var questionTwoBtnEl = document.querySelector(".answer-two");
  questionTwoBtnEl.addEventListener("click", nextQuestion);
  var questionThreeBtnEl = document.querySelector(".answer-three");
  questionThreeBtnEl.addEventListener("click", nextQuestion);
  var questionFourBtnEl = document.querySelector(".answer-four");
  questionFourBtnEl.addEventListener("click", nextQuestion);
};

//--------------------------moves to the next question------------------------------
var nextQuestion = function (event) {
  correctAnswer.remove();
  incorrectAnswer.remove();

  var btnClicked = event.target; //define btnClicked as whichever button was clicked
  if (
    btnClicked.className === questionList[questionCount].correct &&
    questionCount < questionList.length - 1
  ) {
    //check if the button is the same as the solution
    questionCount++;
    createQuestion();
    pageContentEl.appendChild(correctAnswer);
  } else if (
    btnClicked.className != questionList[questionCount].correct &&
    questionCount < questionList.length - 1
  ) {
    timeLeft -= 10;
    questionCount++;
    createQuestion();
    pageContentEl.appendChild(incorrectAnswer);
  } else if (btnClicked.className === questionList[questionCount].correct) {
    //check if it is the last question
    stopQuiz();
    pageContentEl.appendChild(correctAnswer);
    return;
  } else {
    timeLeft -= 10;
    stopQuiz();
    pageContentEl.appendChild(incorrectAnswer);
    return;
  }
};

//--------------------------Stop Quiz------------------------------
function stopQuiz() {
  //once the timer hits zero or all questions have been answered, run this function
  clearInterval(timeStart); //stop time
  if (timeLeft >= 0) {
    //make sure time does not go negative
    timerEl.textContent = "Time: " + timeLeft;
  } else {
    timeLeft = 0;
    timerEl.textContent = "Time: " + timeLeft;
  }
  questionHead.textContent = "All Done!";
  questionDiv.textContent = "Your final score is " + timeLeft;
  questionDiv.appendChild(scoreForm);
  document.addEventListener("submit", function (event) {
    event.preventDefault();
    localStorage.setItem(userScore.value, timeLeft);
    highScore();
  });
}

var highScore = function () {
  try {
    clearInterval(timeStart);
  } catch {}
  headerEl.remove(); //removes top header
  mainHead.remove(); //removes initial main heading
  mainP.remove(); //removes initial main paragraph
  startBtnEl.remove(); //removes start button
  correctAnswer.remove();
  incorrectAnswer.remove();

  pageContentEl.appendChild(questionHead);
  pageContentEl.appendChild(questionDiv);

  questionHead.textContent = "High Scores";
  questionDiv.textContent = "";
  var highScoreList = [];
  for (let i = 0; i < localStorage.length; i++) {
    //loop through high scores
    highScoreList.push(
      localStorage.getItem(localStorage.key(i)) + " - " + localStorage.key(i)
    ); //get highscore key and value
    highScoreList.sort().reverse(); //sort highscores with highest on top
  }
  for (let i = 0; i < highScoreList.length; i++) {
    //loop to add highscores to screen
    var highScoreListItem = document.createElement("li"); //turn highscore into list item
    highScoreListItem.className = "score-list";
    highScoreListItem.textContent = highScoreList[i]; //add content to list item
    questionDiv.append(highScoreListItem); //add list items to ol
  }

  pageContentEl.appendChild(goBackBtn);
  pageContentEl.appendChild(clearScoreBtn);

  goBackBtn.addEventListener("click", goBack);
  clearScoreBtn.addEventListener("click", clearScore);
};

var goBack = function () {
  window.location.reload();
};

var clearScore = function () {
  localStorage.clear();
  alert("The high scores have been cleared");
  window.location.reload();
};

startBtnEl.addEventListener("click", startQuiz); //listens for click on start button, then calls function
highscoreBtnEl.addEventListener("click", highScore);
