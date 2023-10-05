let startButton = document.querySelector(".startButton")
let gameGrid = document.querySelector(".game-board")
let firstCard, secondCard;
const card = document.querySelectorAll(".card")
let score = 0
document.querySelector(".score").textContent = score
let flippedCard = false
let turns = 25
document.querySelector(".turns").textContent = turns

lockBoard = false


//function to start the game on start button click

function startGame() {
    document.querySelector(".start").style.display= 'none'
    gameGrid.style.display = 'grid'

}

//function to end game after x number of turns

function endGame() {


    if (turns === 0) {
        document.querySelector(".restart").style.display= 'flex'
    gameGrid.style.display = 'none';
    }

}

    function winner() {
        if (score === 8) {
            document.querySelector(".winner").style.display= 'flex'
            gameGrid.style.display = 'none'
        }
        resetGameBoard()
    }

//function to restart game

function restartGame() {

let flip = document.querySelectorAll('.card.flip');
for (let i = 0; i < flip.length; i++) {
    card.forEach(card => card.addEventListener('click', cardFlip))
    flip[i].classList.remove('flip')
}

    shuffle();
    score = 0;
    document.querySelector(".score").textContent = score;
    turns = 25;
    document.querySelector(".turns").textContent = turns;
    document.querySelector(".restart").style.display= 'none';
    document.querySelector(".winner").style.display= 'none';
    gameGrid.style.display = 'grid';   
}



// function to flip cards

card.forEach(card => card.addEventListener('click', cardFlip));
function cardFlip() {
    if (lockBoard) return;
    if (this === firstCard) return;


    this.classList.add("flip")

    if (!flippedCard) {
        flippedCard = true
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    if (flippedCard === true) {
        turns--;
        document.querySelector(".turns").textContent = turns;
    }

    checkForMatch()
}



function resetGameBoard() {
    flippedCard = false
    lockBoard = false
    firstCard = null
    secondCard = null

}

//function to check for match, flip if no match, and disable flip if match

function checkForMatch(){
    let match = firstCard.dataset.type === secondCard.dataset.type

    if (match === true) {
      disable()

    } else {
        resetCard()
    };

    if (match === true) {
        score++;
        document.querySelector(".score").textContent = score;


    }

    if (score === 8){
        setTimeout(() => { 
            winner()}, 1000)
    } else {
    setTimeout(() => { 
        endGame()}, 1000)
    }

}


//function to reset cards if no match

function resetCard() {
    setTimeout(() => {
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")
        resetGameBoard()
    }, 1000);
}


//function to disable matching cards


function disable(){
    firstCard.removeEventListener('click', cardFlip)
    secondCard.removeEventListener('click', cardFlip)
    resetGameBoard()
   }

//function to shuffle cards

function shuffle(){
    card.forEach(card => {
        let random = Math.floor(Math.random() * 16);
        card.style.order = random;
    })
}

shuffle()

console.log(document.querySelectorAll('.card'))

