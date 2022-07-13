// Calls all HTML elements needed for the quiz to run
var quizTitle = document.getElementById("quizTitle");
var quizOptions = document.getElementById("quizOptions");
var time = document.getElementById("time");
var startBtn = document.getElementById("start");
var initials = document.getElementById("initials");
var scoreName = document.getElementById("scoreName");
var submit = document.getElementById("submit");
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");

var userScore = 0;
var players = [];

// Hides the quiz answers buttons and score section
quizOptions.setAttribute("class", "displayNone");
scoreName.setAttribute("class", "displayNone");

// Creates logic of the quiz game
function quizGame() {

    // Hides start button and clears out score section
    startBtn.setAttribute("class", "displayNone");
    scoreName.setAttribute("class", "displayNone");

    // Shows the answer buttons when game starts
    quizOptions.removeAttribute("class", "displayNone");

    var timeLeft = 30;
    var arrayNum = 0;

    // Shows time left
    time.textContent = timeLeft + " second(s)";

    // If there is more than 1 second left countdown otherwise end the game and score the user
    gameInterval = setInterval(function () {
        if (timeLeft > 1) {
            timeLeft--;
            time.textContent = timeLeft + " second(s)";
        } else {
            timeLeft = 0;
            time.textContent = timeLeft + " second(s)";
            quizTitle.textContent = "Game Over! You Ran Out of Time!";
            score();
        };
    }, 1000);

    // Changes the question to the next one in the array and the answer buttons
    function nextQuestion() {
        if (arrayNum >= questions.length) {
            score()
        } else {
            quizTitle.textContent = questions[arrayNum].question;
            choice1.textContent = questions[arrayNum].choices[0];
            choice2.textContent = questions[arrayNum].choices[1];
            choice3.textContent = questions[arrayNum].choices[2];
            choice4.textContent = questions[arrayNum].choices[3];
        };
    };

    // When the user clicks a button target the one they clicked
    quizOptions.addEventListener("click", function (event) {
        event.preventDefault()
        var chosen = event.target;

        // If the answr is correct add 5 score and go to next question
        if (chosen.matches("button")) {
            var answer = questions[arrayNum].answer;
            if (chosen.textContent === answer && timeLeft > 0) {
                arrayNum++;
                userScore += 5;
                nextQuestion();
                // If the answer is wrong remove 5 seconds from clock and go to next question
            } else {
                timeLeft -= 5;
                arrayNum++;
                nextQuestion();
            };
        };
    });

    // Gives final score
    function score() {
        // Stops the clock
        clearInterval(gameInterval);
        // Remove answer buttons from screen and show the input for initials
        quizOptions.setAttribute("class", "displayNone");
        scoreName.removeAttribute("class", "displayNone");
        // If the player had more time left than zero add time left * two points for every second left to user score
        if (timeLeft > 0) {
            userScore += timeLeft * 2;
            quizTitle.textContent = "Game Complete! You Answered Every Question!";
        };

    };
    // Calls the first question
    nextQuestion();
};
// When user is done entering initials and clicks the submit button save their score to local storage and take them to the score page
submit.addEventListener("click", function (event) {
    event.preventDefault();
    let userName = initials.value.trim().toUpperCase();

    var players = {};

    players = {
        player: userName,
        score: userScore
    };

    localStorage.setItem("players", JSON.stringify(players));

    submit.textContent = "Saved!";
    location.href = ("./scores.html");
});
// Starts game when user clicks by calling the quizGame function
startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    quizGame();
});