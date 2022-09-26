'use strict';

// HTML Elements
const player0El = document.querySelector(".player--0")
const player1El = document.querySelector(".player--1")
const score0El = document.querySelector("#score--0")
const score1El = document.getElementById("score--1")
const current0El = document.getElementById("current--0")
const current1El = document.getElementById("current--1")

const diceEl = document.querySelector(".dice")
const btnNew = document.querySelector(".btn--new")
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")


// Starting Conditions
let scores, currentScore, activePlayer, playing

function init() {
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = true
    activePlayer = 0
    
    // Setting the GUI
    current0El.textContent = 0
    current1El.textContent = 0
    score0El.textContent = 0
    score1El.textContent = 0
    diceEl.classList.add("hidden")
    player0El.classList.remove("player--winner")
    player1El.classList.remove("player--winner")
    player0El.classList.add("player--active")
    player1El.classList.remove("player--active")
}
init()


function switchPlayer () {
    currentScore = 0
    document.getElementById(`current--${activePlayer}`).textContent = 0
    if (activePlayer === 0) activePlayer = 1
    else activePlayer = 0
    
    player0El.classList.toggle("player--active")
    player1El.classList.toggle("player--active")
}

// Rolling Dice Functionality
btnRoll.addEventListener("click", function() {

    if (!playing) return;

    // 1) Generating Random Dice Roll
    const dice = Math.floor(Math.random() * 6) + 1

    // 2) Display the Dice
    diceEl.classList.remove("hidden")
    diceEl.src = `dice/${dice}.png`


    // 3) Check for rolled 1
    if (dice !== 1) {
        // Add Dice to Current Score
        currentScore = currentScore + dice
        document.getElementById(`current--${activePlayer}`).textContent = currentScore
    } else {
        // Switch to next Player
        switchPlayer()
    }

})


btnHold.addEventListener("click", function() {
    if (!playing) return;

    // 1) Add Current Score to active player's score
    scores[activePlayer] = scores[activePlayer] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
    
    // 2) Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
        // finish the game
        playing = false
        diceEl.classList.add("hidden")
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
        document.querySelector(`.player--${activePlayer}`).classList.remvoe("player--active")
    } else {
        // switch to the next player
        switchPlayer()
    }

})


btnNew.addEventListener("click", init)