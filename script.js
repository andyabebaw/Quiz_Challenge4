// Assignment Code
var startBtn = document.querySelector("#startButton");
var startBtnDiv = document.querySelector("#startButtonDiv");
var submitBtn = document.getElementById("submit");
var goBackBtn = document.getElementById("goBack");
var highScoresBtn = document.getElementById("highscores");
var clearHighScoresBtn = document.getElementById("clearHighscores");

var time = document.querySelector("#time");

var answersDiv = document.getElementById("answers");

var initialInput = document.getElementById("initial");

var scoreList = document.getElementById("highScoreList");

var gamePage = document.getElementById("gamePage");
var initialsPage = document.getElementById("initialsPage");
var highScoresPage = document.getElementById("highScoresPage");

var highScores = JSON.parse(localStorage.getItem("highscores"))
var questions = []

var secondsStart = 2;
var secondsLeft = 2;
var score = 0
time.textContent = "Time: " + secondsLeft;

function startGame() {
  secondsLeft = secondsStart;
  score = 0;
  time.textContent = "Time: " + secondsLeft;
  answersDiv.style.display = "block";
  startBtnDiv.style.display = "none";
  
    var timerInterval = setInterval(function() {
      secondsLeft--;
      time.textContent ="Time: " +  secondsLeft;
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        viewInitials()
        return;
      }
  
    }, 1000);
}

function submitScore(){
  if(initialInput &&initialInput.value){
  let person = new Person(initialInput.value, Math.floor(Math.random()*10))
  highScores = highScores || [];
  highScores.push(person);
  localStorage.setItem("highscores",JSON.stringify(highScores))
  viewHighScores();
  }
}

function viewStart(){
  gamePage.style.display = "block";
  initialsPage.style.display = "none";
  highScoresPage.style.display = "none"
  startBtnDiv.style.display = "block";
  answersDiv.style.display = "none";
}

function viewInitials(){
  gamePage.style.display = "none";
  initialsPage.style.display = "block";
  highScoresPage.style.display = "none";
}

function viewHighScores(){
  makeList()
  gamePage.style.display = "none";
  initialsPage.style.display = "none";
  highScoresPage.style.display = "block"
}

function makeList(){
  console.log("here")
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

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function compare( firstPerson, otherPerson) {
  if ( firstPerson.score < otherPerson.score){
    return 1;
  }
  if ( firstPerson.score > otherPerson.score){
    return -1;
  }
  return 0;

}

// Add event listener to start button
startBtn.addEventListener("click", startGame);
highScoresBtn.addEventListener("click", viewHighScores);
submitBtn.addEventListener("click", submitScore);
goBackBtn.addEventListener("click", viewStart);

clearHighScoresBtn.addEventListener("click", function() {
localStorage.removeItem("highscores")
highScores = []
viewHighScores()
});

class Person {
  constructor(initials, score) {
    this.initials = initials;
    this.score = score;
  }

  
}

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

var question1 = Question("What do you need at the end of every line of code?", "!","$", ":", ";", ";");
var question2 = Question("What git command makes a new directory", "touch", "mkdir", "pull", "push", "mkdir");
var question3 = Question("How do you check the current status of the repo","git status","mkdir", "pull", "push", "git status")