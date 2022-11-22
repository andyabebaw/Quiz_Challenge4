// Assignment Code
var startBtn = document.querySelector("#startButton");
var time = document.querySelector("#time");
var answersDiv = document.getElementById("answers");
var secondsLeft = 5;
time.textContent = "Time: " + secondsLeft;

function startGame() {
  secondsLeft = 5;
  time.textContent = "Time: " + secondsLeft;
  answersDiv.style.display = "block";
  
    var timerInterval = setInterval(function() {
      secondsLeft--;
      time.textContent ="Time: " +  secondsLeft;
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        answersDiv.style.display = "none";
        return;
      }
  
    }, 1000);
}

// Add event listener to start button
startBtn.addEventListener("click", startGame);
