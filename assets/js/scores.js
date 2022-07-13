// Calls required HTML elements and retrieves the lastest score from local storage
var scoreList = document.getElementById("scoreList");
var players = JSON.parse(localStorage.getItem("players"));
var clear = document.getElementById("clear")

// Adds latest score to the ordered list
var listItem;
listItem = document.createElement("li").textContent = "The latest score is: " + players.score + " by player " + players.player;
scoreList.setAttribute("class", "score-li")
scoreList.append(listItem);

// Clears the latest score from screen and local storage when clicked on
clear.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    scoreList.remove(listItem);
});