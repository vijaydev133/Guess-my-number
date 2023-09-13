'use strict';

//document selectors
const message = document.querySelector('.message');
const guess = document.querySelector('.guess');
const check = document.querySelector('.check');
const score = document.querySelector('.score');
const body = document.querySelector('body');
const number = document.querySelector('.number');
const highScore = document.querySelector('.highscore');
const again = document.querySelector('.again');

//game values
let currScore = 20;
let currHighScore = 0;
let RANDOMNUMBER = randomNumGenerator();
console.log(RANDOMNUMBER);

//random number genrator function
function randomNumGenerator() {
  const num = Math.ceil(Math.random() * 19);
  return num;
}

//lost game
function lostGame(num) {
  // document.
  body.style.backgroundColor = 'red';
  number.textContent = num;
}

//won game
function wonGame(num, score) {
  if (score > currHighScore) {
    highScore.textContent = score;
    body.style.backgroundColor = 'green';
    check.setAttribute('disabled', 'true');
    number.textContent = num;
  }
}

function reset() {
  score.textContent = 20;
  guess.value = '';
  body.style.backgroundColor = 'black';
  message.textContent = 'Start Guessing...';
  currScore = 20;
  check.removeAttribute('disabled', 'true');
  RANDOMNUMBER = randomNumGenerator();
  number.textContent = '?';
}

//value checker
function valueChecker(userVal, RANDOMNUMBER) {
  let gameMessage = '';
  if (userVal === RANDOMNUMBER) {
    gameMessage = 'Correct Number';
    wonGame(RANDOMNUMBER, currScore);
    return gameMessage;
  } else if (userVal > RANDOMNUMBER) {
    gameMessage = 'Too High';
    currScore -= 1;
  } else {
    gameMessage = 'Too Low';
    currScore -= 1;
  }
  score.textContent = currScore;
  if (currScore === 0) {
    // check.
    check.setAttribute('disabled', 'true');
    console.log('came here');
    lostGame(RANDOMNUMBER);
    return "You've Lost";
  }
  return gameMessage;
}

//listener for check button
check.addEventListener('click', function () {
  const userVal = Number(guess.value);
  console.log(userVal, RANDOMNUMBER);

  if (!userVal) return;

  message.textContent = valueChecker(userVal, RANDOMNUMBER);
});

//listener for again
again.addEventListener('click', function () {
  reset();
});
