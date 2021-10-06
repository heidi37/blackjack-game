// 1. Create two variables, firstCard and secondCard. 
let newCard;
let sum = 0;
let hasBlackJack = false;
let isAlive = true;
let message = "";
let cards = [];

const buttonStart = document.querySelector("#start-button");
const newCardButton = document.querySelector("#new-card-button");
let messageBlock = document.querySelector("#message-el");
let cardsBlock = document.querySelector("#cards-el");
let sumBlock = document.querySelector("#sum-el");
let newSpan = document.querySelector("#new");

function startGame() {
    renderGame();
}

function getNewCard() {
    newCard = Math.floor(Math.random() * (10)) + 2;
    cards.push(newCard);
    sum += newCard;
    cardsBlock.textContent = ` Cards: ${cards.join(", ")}`;
    sumBlock.textContent = `Sum: ${sum}`;
}

function showStartButton() {
    buttonStart.style.display = "block";
    newCardButton.style.display = "none";
    newSpan.style.display = "inline";
    cards = [];
    sum = 0;
}

function renderGame() {
    if (sum <= 20) {
        message = "Do you want to draw a new card? 🙂";
        newCardButton.style.display = "block";
    } else if (sum === 21) {
        message = "Wohoo! You've got Blackjack! 🥳";
        hasBlackJack = true;
        showStartButton()
    } else {
        message = "You're out of the game! 😭";
        isAlive = false;
        showStartButton();
    }
    messageBlock.textContent = message;
}

buttonStart.addEventListener("click", function () {
    buttonStart.style.display = "none";
    getNewCard();
    getNewCard();
    startGame();
});

newCardButton.addEventListener("click", () => {
    getNewCard();
    renderGame();
});




