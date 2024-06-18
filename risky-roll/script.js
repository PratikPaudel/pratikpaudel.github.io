'script'
const btnHold = document.querySelector('.hold'); 
const newGame = document.querySelector('.reset-game'); 
const rollDiceEl = document.querySelector(".roll-dice");
let diceImage = document.querySelector('.diceImage');
const slider = document.getElementById("scoreSlider");
const scoreValue = document.getElementById("scoreValue");
let diceValue;
let currentScore;
const playerScoreArray = [];
let activePlayer;
let targetValue;
let playerWin = false;

slider.oninput = function() {
  scoreValue.textContent = this.value;
  targetValue = this.value;
  localStorage.setItem("savedValue", targetValue);
};

const updateScores = function () {
    document.getElementById(`score--${activePlayer}`).textContent= playerScoreArray[activePlayer];
    const percentage = ((playerScoreArray[activePlayer] / targetValue) * 100).toFixed(2);
    const totalScore = document.getElementById(`score--${activePlayer}`);
    const scoreClass = (playerScoreArray[activePlayer]/targetValue) < 0.4 ? "bad" : (playerScoreArray[activePlayer]/targetValue) < 0.6 ? "meh" : "good";
    totalScore.classList.remove("bad", "meh", "good");
    totalScore.classList.add(scoreClass);

    const gradient = scoreClass === "bad" ?
                             `background: conic-gradient(var(--rating-color-bad) ${percentage}%, transparent ${percentage}% 100%)` :
                             scoreClass === "meh" ?
                             `background: conic-gradient(var(--rating-color-meh) ${percentage}%, transparent ${percentage}% 100%)` :
                             `background: conic-gradient(var(--rating-color-good) ${percentage}%, transparent ${percentage}% 100%)`;

    // const ratingColor = window.getComputedStyle(totalScoreBackground).backgroundColor;
    // const gradient = `background: conic-gradient(${ratingColor} ${percentage}%, transparent ${percentage}% 100%)`;
    totalScore.setAttribute("style", gradient);
    totalScore.innerHTML = `<span>${playerScoreArray[activePlayer]}</span>`; 
}

const resetGame = function () {
    currentScore = 0;
    activePlayer = 0;
    playerScoreArray[0] = 0;
    playerScoreArray[1] = 0;
    diceImage.classList.add('hidden');
    document.getElementById('score--0').textContent= 0;
    document.getElementById('score--1').textContent= 0;
    document.getElementById('current--0').textContent = 0; 
    document.getElementById('current--1').textContent = 0; 
    document.querySelector(`.player--0--winner`).textContent = "";
    document.querySelector(`.player--1--winner`).textContent = "";
    const totalScoreElements = document.querySelectorAll('.total-score');
    playerWin = false;
    totalScoreElements.forEach(element => {
        element.classList.remove('bad', 'meh', 'good');
        element.removeAttribute('style');
    });
}

resetGame();
if (localStorage.getItem("savedValue") == null || localStorage.getItem("savedValue") === 0) {
    targetValue = 50;
    slider.value = targetValue;
    scoreValue.textContent = targetValue;
}

else {
    targetValue = localStorage.getItem("savedValue");
    slider.value = targetValue;
    scoreValue.textContent = targetValue;
}

rollDiceEl.addEventListener('click', function () {
    if (!playerWin) {
    diceImage.classList.remove('hidden');
    diceImage.classList.add('shaking');
    setTimeout(() => {
        document.querySelector('.shaking')?.classList.remove('shaking');
      }, 500);
    const diceValue= Math.floor(Math.random()*6)+1;
    diceImage.src = `asset/dice-${diceValue}.svg`;
    diceValue !== 1 
    ? (currentScore += diceValue, document.getElementById(`current--${activePlayer}`).textContent = currentScore)
    : switchPlayer();
    }});

const switchPlayer = function() {
    updateScores(activePlayer);
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0; 
    activePlayer = 1 - activePlayer;
}

const handleHoldButton = function () {
    if (!playerWin) {
    playerScoreArray[activePlayer] += currentScore;
    updateScores(activePlayer);
    if (playerScoreArray[activePlayer] >= targetValue) {
        playerWon(activePlayer);
    }
    else {
    switchPlayer();
    }
}
}

const playerWon = function (activePlayer) {
    playerWin = true;
    diceImage.classList.add('hidden');
    confetti({
        particleCount: 150,
        spread: 120
      });
    document.querySelector(`.player--${activePlayer}--winner`).textContent = "Winner!!";
}

btnHold.addEventListener('click', handleHoldButton);
newGame.addEventListener('click', resetGame);




    
