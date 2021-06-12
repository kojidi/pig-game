'use strict';

// Selecting Elements :
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions :
let score, currentScore, activePlayer, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  document.querySelector('.won--0').classList.add('hidden');
  document.querySelector('.won--1').classList.add('hidden');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice :
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);

    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // current0El.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      document
        .querySelector(`.won--${activePlayer}`)
        .classList.remove('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

// Optional :

// btnNew.addEventListener('click', function () {
//   playing = true;
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   document.querySelector(`.won--${activePlayer}`).classList.add('hidden');
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--active');
//   player0El.classList.add('player--active');
//   score[0] = 0;
//   score[1] = 0;
//   activePlayer = 0;
// });

// Jonas Way :

btnNew.addEventListener('click', init);
