'use strict';
// ===================================== VARIABLES =====================================
const dice = document.querySelector('.dice');
const diceNumber = document.querySelector('.bx');
const btnRollDice = document.querySelector('.roll-dice');
const btnHold = document.querySelector('.hold');
const btnNewGame = document.querySelector('.new-game');
const winScore = 100;
let scores, accumulateScore, activePlayer;

// ===================================== FUNCTIONS =====================================
const disabledBtn = function () {
  btnRollDice.disabled = true;
  btnHold.disabled = true;
};
const enabledBtn = function () {
  btnRollDice.disabled = false;
  btnHold.disabled = false;
};
const switchPlayer = function () {
  document
    .querySelector(`.box-player${activePlayer}`)
    .classList.toggle('active');
  accumulateScore = 0;
  document.querySelector(
    `.accumulate-score-player${activePlayer}`
  ).textContent = accumulateScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.box-player${activePlayer}`)
    .classList.toggle('active');
};
const addCurrentScore = function (number) {
  accumulateScore += number;
  document.querySelector(
    `.accumulate-score-player${activePlayer}`
  ).textContent = accumulateScore;
};
const addTotalScore = function () {
  document.querySelector(`.score-player${activePlayer}`).textContent = scores[
    activePlayer
  ] += accumulateScore;
  switchPlayer();
};
const winTheGame = function () {
  for (const i in scores) {
    if (scores[i] >= winScore) {
      document.querySelector(`.box-player${i}`).classList.add('won');
      document.querySelector(`.box-player${i}`).classList.add('active');
      document
        .querySelector(`.box-player${activePlayer === 0 ? 0 : 1}`)
        .classList.remove('active');
      dice.classList.add('hidden');
      disabledBtn();
    }
  }
};
const startNewGame = function () {
  enabledBtn();
  scores = [0, 0];
  accumulateScore = 0;
  activePlayer = 0;
  for (const i in scores) {
    document.querySelector(`.accumulate-score-player${i}`).textContent =
      accumulateScore;
    document.querySelector(`.score-player${i}`).textContent = scores[i];
    document.querySelector(`.box-player${i}`).classList.remove('won', 'active');
    document
      .querySelector(`.box-player${activePlayer}`)
      .classList.add('active');
  }
};
startNewGame();

// ===================================== EVENTS =====================================
btnRollDice.addEventListener('click', function () {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  diceNumber.setAttribute('class', `bx bx-dice-${randomNumber}`);
  if (randomNumber !== 1) {
    addCurrentScore(randomNumber);
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (activePlayer === 1) {
    addTotalScore();
    winTheGame();
  } else {
    addTotalScore();
    winTheGame();
  }
});

btnNewGame.addEventListener('click', startNewGame);
