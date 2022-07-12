var quizTitle = document.getElementById("quizTitle");
var quizOptions = document.getElementById("quizOptions");
var time = document.getElementById("time");
var startBtn = document.getElementById("start");
var playAgain = document.getElementById("playAgain");
var initials = document.getElementById("initials");
var scoreName = document.getElementById("scoreName");
var submit = document.getElementById("submit");
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");



var userScore = 0;


quizOptions.setAttribute("class", "display");
scoreName.setAttribute("class", "display");

function quizGame() {

    startBtn.setAttribute("class", "display");
    scoreName.setAttribute("class", "display");

    quizOptions.removeAttribute("class", "display");

    userScore = 0;

    var timeLeft = 30;
    var arrayNum = 0;

    time.textContent = timeLeft + " second(s)";

    gameInterval = setInterval(function () {
        if (timeLeft > 1) {
            timeLeft--;
            time.textContent = timeLeft + " second(s)";
        } else {
            timeLeft--;
            time.textContent = timeLeft + " second(s)";
            quizTitle.textContent = "Game Over! You Ran Out of Time!";
            score();
        };
    }, 1000);

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

    quizOptions.addEventListener("click", function (event) {
        event.preventDefault()
        var chosen = event.target;

        if (chosen.matches("button")) {
            var answer = questions[arrayNum].answer;
            if (chosen.textContent === answer && timeLeft > 0) {
                arrayNum++;
                userScore += 5;
                nextQuestion();
            } else {
                console.log("Inccorect");
                timeLeft -= 5;
            };
        };
    });

    function score() {
        clearInterval(gameInterval);
        quizOptions.setAttribute("class", "display");
        scoreName.removeAttribute("class", "display");
        if (timeLeft > 0) {
            userScore += timeLeft * 2;
            quizTitle.textContent = "Game Complete! You Answered Every Question!";
        };

    };

    nextQuestion();
};

playAgain.addEventListener("click", function (event) {
    event.preventDefault()
    quizGame();
});

submit.addEventListener("click", function (event) {
    event.preventDefault();
    var userName = initials.value;
    submit.textContent = "Saved!"
});
startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    quizGame();
});