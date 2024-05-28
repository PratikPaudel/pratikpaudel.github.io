let score = 20;
let highscore = 0;
let message;
let secretNumber = Math.floor(Math.random()*20)+1;

const displayMessage = function (message) {
    document.querySelector(".message").textContent = message;
}
const changeBodyColor = function (colorCode){
    document.querySelector("body").style.backgroundColor = colorCode;
}

document.querySelector(".check").addEventListener("click", function() {
let guess = Number(document.querySelector(".guess").value);

if (guess > 0) {
    if (guess === secretNumber) {
    displayMessage("You guessed it right");
    document.querySelector(".number").textContent = secretNumber;
    changeBodyColor("green");
    if(score > highscore) {
        highscore = score;
        document.querySelector(".highscore").textContent = highscore;
        }
    resetScores();
} 
    else {
        handleIncorrectGuess(guess);
    }

} else {
    displayMessage("Please enter a valid number.");
}
});

function handleIncorrectGuess(guess) {
    if (score > 1) {
        displayMessage(guess > secretNumber ? "The number is too high" : "The number is too low");
        score--;
        document.querySelector(".score").textContent = score;
    } else {
        displayMessage("You lost the game");
        changeBodyColor("#a80000");
    }
}

function resetScores () {
    secretNumber = Math.floor(Math.random()*20)+1;
    score = 20;
    document.querySelector(".score").textContent = score;
}

document.querySelector(".again").addEventListener("click", function() {
    document.querySelector(".guess").value = "";
    displayMessage("Start guessing");
    changeBodyColor("white");
    score=20;
    secretNumber = Math.floor(Math.random()*20)+1;
});
