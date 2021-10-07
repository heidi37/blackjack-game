// 1. Create two variables, firstCard and secondCard. 
let newCard;
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let cards = [];
let dealerHand;

const buttonStart = document.querySelector("#start-button");
const newCardButton = document.querySelector("#new-card-button");

let messageBlock = document.querySelector("#message-el");
let cardsBlock = document.querySelector("#cards-el");
let sumBlock = document.querySelector("#sum-el");
let dealerBlock = document.querySelector("#dealer");
let newSpan = document.querySelector("#new");
let holdButton = document.querySelector("#hold-button");

function startGame() {
    let isAlive = false;
    renderGame();
}

function getRandomCard() {
    let randomNumber = (Math.floor(Math.random() * (13)) + 1)
    if (randomNumber === 1) {
        return 11;
    } else if (randomNumber >= 11 && randomNumber <= 13) {
        return 10;
    } else {
        return randomNumber;
    }
}

function getDealerHand() {
    dealerHand = getRandomCard() + getRandomCard();
};

function getNewCard() {
    newCard = getRandomCard();
    cards.push(newCard);
    sum += newCard;
    cardsBlock.textContent = ` Cards: ${cards.join(", ")}`;
    sumBlock.textContent = `Sum: ${sum}`;
}

function showStartButton() {
    buttonStart.style.display = "block";
    newCardButton.style.display = "none";
    newSpan.style.display = "inline";
    holdButton.style.display = "none";
    cards = [];
    sum = 0;
    messageBlock.textContent = message;
    dealerBlock.textContent = `Dealer's Sum: ${dealerHand}`;
}

function renderGame() {
    if (sum <= 20) {
        message = "Do you want to draw a NEW CARD or HOLD? 🙂";
        newCardButton.style.display = "block";
        holdButton.style.display = "block";
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

buttonStart.addEventListener("click", () => {
    buttonStart.style.display = "none";
    getNewCard();
    getNewCard();
    getDealerHand()
    startGame();
    dealerBlock.textContent = `Dealer's Sum: ?`;
});

newCardButton.addEventListener("click", () => {
    getNewCard();
    renderGame();
});

holdButton.addEventListener("click", () => {
    if ((sum > dealerHand && sum <= 21) || (sum < dealerHand && dealerHand > 21)) {
        message = "You Beat the House! 🥳";
    } else if (sum === dealerHand) {
        message = "You Tied the House! 😐";
    }
    else {
        message = "The House Beat You! 😞";
    }
    showStartButton()

});




