// Assignment Code
var startBtn = document.querySelector("#startButton");
var startBtnDiv = document.querySelector("#startButtonDiv");
var submitBtn = document.getElementById("submit");
var goBackBtn = document.getElementById("goBack");
var highScoresBtn = document.getElementById("highscores");
var clearHighScoresBtn = document.getElementById("clearHighscores");
var buttonA = document.getElementById("btnA");
var buttonB = document.getElementById("btnB");
var buttonC = document.getElementById("btnC");
var buttonD = document.getElementById("btnD");
var question = document.getElementById("question");
var correctness = document.getElementById("correctness");
var finalScore = document.getElementById("finalScore");
var time = document.querySelector("#time");
var answersDiv = document.getElementById("answers");
var initialInput = document.getElementById("initial");
var scoreList = document.getElementById("highScoreList");
var gamePage = document.getElementById("gamePage");
var initialsPage = document.getElementById("initialsPage");
var highScoresPage = document.getElementById("highScoresPage");

var highScores = JSON.parse(localStorage.getItem("highscores"))
var questions = []
var currQuestion;
var currQuestionCount = 0;

var secondsStart = 40;
var secondsLeft = secondsStart;
var timePenalty = 15;
var score = 0;
time.textContent = "Time: " + secondsLeft;

function init(){
  secondsLeft = secondsStart;
  score = 0;
  currQuestionCount = 0;
  time.textContent = "Time: " + secondsLeft;
  answersDiv.style.display = "block";
  startBtnDiv.style.display = "none";
}

function startGame() {
  init()
  setQuestion(questions[currQuestionCount]);
  var timerInterval = setInterval(function() {
    secondsLeft--;
    time.textContent ="Time: " +  secondsLeft;
    if(secondsLeft < 1) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      viewInitials()
      return;
    }
  }, 1000);
}

//when an answer button is pressed, update text, apply penalty if necessary, and moves to next question page
const answerButtonPressed = e => {
  if(e.target.textContent === currQuestion.correctAnswer){
    correctness.textContent = "Correct";
    score+=1;
  } else {
    correctness.textContent = "Incorrect";
    secondsLeft-=timePenalty;
  }
  currQuestionCount++;
  if(currQuestionCount<questions.length){
    setQuestion(questions[currQuestionCount]);
  } else {
    secondsLeft = 0;
  }
  
}

//adds event listeners to all answer buttons
var answerButtons = document.getElementsByClassName("answerBtn");
for (let button of answerButtons) {
  button.addEventListener("click", answerButtonPressed);
}

function setQuestion(quest){
  currQuestion = quest;
  question.textContent = quest.question;
  buttonA.textContent = quest.answerA;
  buttonB.textContent = quest.answerB;
  buttonC.textContent = quest.answerC;
  buttonD.textContent = quest.answerD;
}

// submits a users initials and final score to the list
function submitScore(){
  if(initialInput &&initialInput.value){
  let person = new Person(initialInput.value, score);
  highScores = highScores || [];
  highScores.push(person);
  localStorage.setItem("highscores",JSON.stringify(highScores))
  viewHighScores();
  }
}

// opens game start page
function viewStart(){
  gamePage.style.display = "block";
  initialsPage.style.display = "none";
  highScoresPage.style.display = "none"
  startBtnDiv.style.display = "block";
  answersDiv.style.display = "none";
  correctness.textContent = "";
  question.textContent="Click the start button below to start the game.";
}

// opens high score submission page
function viewInitials(){
  gamePage.style.display = "none";
  initialsPage.style.display = "block";
  highScoresPage.style.display = "none";
  finalScore.textContent = "Your Final Score is " + score + "!"
}

//opens high score page
function viewHighScores(){
  makeList()
  gamePage.style.display = "none";
  initialsPage.style.display = "none";
  highScoresPage.style.display = "block"
  time.textContent ="Time: 0";
}

//makes a ranked high score list
function makeList(){
  removeAllChildNodes(scoreList);
  highScores.sort( compare );
  highScores.forEach((item)=>{
    let li = document.createElement("li");
    var person = JSON.parse(JSON.stringify(item));
    console.log(person)
    li.innerText = person.initials + " - " + person.score;
    scoreList.appendChild(li);
  })
}

// removes all high score list items
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

// used to sort scores from greatest to least
function compare( firstPerson, otherPerson) {
  if ( firstPerson.score < otherPerson.score){
    return 1;
  }
  if ( firstPerson.score > otherPerson.score){
    return -1;
  }
  return 0;

}

// Add event listener to buttons that casuse a page change
startBtn.addEventListener("click", startGame);
highScoresBtn.addEventListener("click", viewHighScores);
submitBtn.addEventListener("click", submitScore);
goBackBtn.addEventListener("click", viewStart);

clearHighScoresBtn.addEventListener("click", function() {
  //clears high score from local storage
localStorage.removeItem("highscores")
highScores = []
viewHighScores()
});

// Class that defines a person by their initials and their final score
class Person {
  constructor(initials, score) {
    this.initials = initials;
    this.score = score;
  }
}

//Class that defines a question, its answer choices, and the correct answer
class Question {
  constructor(question, answerA, answerB, answerC, answerD, correctAnswer) {
    this.question = question;
    this.answerA = answerA;
    this.answerB = answerB;
    this.answerC = answerC;
    this.answerD = answerD;
    this.correctAnswer = correctAnswer;
  }
  isCorrect(answer){
    return answer === correctAnswer;
  }
}

//Question Bank
var question1 = new Question("What do you need at the end of every line of code?", "!","$", ":", ";", ";");
var question2 = new Question("What git command makes a new directory?", "touch", "mkdir", "pull", "push", "mkdir");
var question3 = new Question("How do you check the current status of the repo?","git status","mkdir", "pull", "push", "git status")

var questions = [question1,question2,question3];
var questions = shuffle(questions);

//stolen from online, didnt feel like writing a new one
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}