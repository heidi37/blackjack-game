// 1. Create two variables, firstCard and secondCard. 
let newCard;
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let cards = [];
let dealerHandSum;
let player = {
    name: '',
    chips: 100
}

let deck = [
    { card: 'one', suits: ["♠️ ace", "♦️ ace", "♥️ ace", "♣️ ace"] },
    { card: 'two', suits: ["♠️", "♦️", "♥️", "♣️"] },
    { card: 'three', suits: ["♠️", "♦️", "♥️", "♣️"] },
    { card: 'four', suits: ["♠️", "♦️", "♥️", "♣️"] },
    { card: 'five', suits: ["♠️", "♦️", "♥️", "♣️"] },
    { card: 'six', suits: ["♠️", "♦️", "♥️", "♣️"] },
    { card: 'seven', suits: ["♠️", "♦️", "♥️", "♣️"] },
    { card: 'eight', suits: ["♠️", "♦️", "♥️", "♣️"] },
    { card: 'nine', suits: ["♠️", "♦️", "♥️", "♣️"] },
    { card: 'ten and royalty', suits: ["♠️", "♦️", "♥️", "♣️", "♠️ jack", "♦️ jack", "♥️ jack", "♣️ jack", "♠️ queen", "♦️ queen", "♥️ queen", "♣️ queen", "♠️ king", "♦️ king", "♥️ king", "♣️ king"] },
    { card: 'ace', suits: ["♠️ ace", "♦️ ace", "♥️ ace", "♣️ ace"] },
]


let deckCopy = [];


const buttonStart = document.querySelector("#start-button");
const newCardButton = document.querySelector("#new-card-button");

let messageBlock = document.querySelector("#message-el");
let cardsBlock = document.querySelector("#cards-el");
let sumBlock = document.querySelector("#sum-el");
let dealerBlock = document.querySelector("#dealer");
let newSpan = document.querySelector("#new");
let holdButton = document.querySelector("#hold-button");
let playerBlock = document.querySelector("#player-name");
let welcomeName = document.querySelector("#welcome-name");

player.name = prompt('What is your name?');
welcomeName.textContent = player.name;

function startGame() {
    // deckCopy = deck[0];
    deckCopy = JSON.parse(JSON.stringify(deck));
    isAlive = true;
    dealerBlock.textContent = `Dealer's Sum: ?`;
    playerBlock.textContent = `${player["name"]}: $${player.chips}`;
    getNewCard();
    getNewCard();
    getDealerCard()
    renderGame();
}

function getNewCard() {
    newCard = getRandomCard();
    let cardSuit = deckCopy[newCard - 1].suits[Math.floor(Math.random() * (deckCopy[newCard - 1].suits.length))];
    let cardIndex = deckCopy[newCard - 1].suits.indexOf(cardSuit);
    // remove card from deck copy
    deckCopy[newCard - 1].suits.splice(cardIndex, 1);
    let displayCard = newCard + " " + cardSuit;
    cards.push(displayCard);
    sum += newCard;
    cardsBlock.textContent = ` Cards: ${cards.join(", ")}`;
    sumBlock.textContent = `Sum: ${sum}`;
}

function getRandomCard() {
    let randomNumber = (Math.floor(Math.random() * (13)) + 1)
    if (randomNumber === 1) {
        let howUseAce = parseInt(prompt("Do you want this Ace to count as 1 or 11?"));
        return howUseAce;
    } else if (randomNumber >= 11 && randomNumber <= 13) {
        return 10;
    } else {
        return randomNumber;
    }
}

function getDealerCard() {
    dealerCardOne = getRandomDealerCard();
    dealerCardTwo = getRandomDealerCard();
    dealerHandSum = dealerCardOne + dealerCardTwo;
};

function getRandomDealerCard() {
    let randomNumber = (Math.floor(Math.random() * (13)) + 1)
    if (randomNumber === 1) {
        return 11;
    } else if (randomNumber >= 11 && randomNumber <= 13) {
        return 10;
    } else {
        return randomNumber;
    }
}

function showStartButton() {
    buttonStart.style.display = "block";
    newCardButton.style.display = "none";
    newSpan.style.display = "inline";
    holdButton.style.display = "none";
    cards = [];
    sum = 0;
    messageBlock.textContent = message;
    dealerBlock.textContent = `Dealer's Sum: ${dealerHandSum}`;
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
        player.chips += 5;
    } else {
        message = "You're out of the game! 😭";
        isAlive = false;
        showStartButton();
        player.chips -= 5;
    }
    messageBlock.textContent = message;
    playerBlock.textContent = `${player["name"]}: $${player.chips}`;
}

buttonStart.addEventListener("click", () => {
    buttonStart.style.display = "none";
    startGame();
});

newCardButton.addEventListener("click", () => {
    getNewCard();
    renderGame();
});

holdButton.addEventListener("click", () => {
    if ((sum > dealerHandSum && sum <= 21) || (sum < dealerHandSum && dealerHandSum > 21)) {
        message = "You Beat the House! 🥳";
        player.chips += 5;
    } else if (sum === dealerHandSum) {
        message = "You Tied the House! 😐";
    }
    else {
        message = "The House Beat You! 😞";
        isAlive = false;
        player.chips -= 5;
    }

    playerBlock.textContent = `${player["name"]}: $${player.chips}`;
    showStartButton();

});
