let sequence = [];
let playerSequence = [];
let level = 0;
let isPlayerTurn = false;

const colors = ['red', 'green', 'blue', 'yellow'];

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    document.getElementById("startButton").disabled = true;
    nextRound();
}

function nextRound() {
    playerSequence = [];
    level++;
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(nextColor);
    playSequence();
}

function playSequence() {
    isPlayerTurn = false;
    let delay = 1000;
    sequence.forEach((color, index) => {
        setTimeout(() => {
            flashColor(color);
        }, delay * (index + 1));
    });

    setTimeout(() => {
        isPlayerTurn = true;
    }, delay * (sequence.length + 1));
}

function flashColor(color) {
    const button = document.getElementById(color);
    if (button) {
        button.style.opacity = '1';
        setTimeout(() => {
            button.style.opacity = '0.8';
        }, 500);
    }
}

function playerChoice(color) {
    if (!isPlayerTurn) return;

    playerSequence.push(color);
    flashColor(color);

    if (!checkSequence()) {
        endGame();
        return;
    }

    if (playerSequence.length === sequence.length) {
        setTimeout(nextRound, 1000);
    }
}

function checkSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            return false;
        }
    }
    return true;
}

function endGame() {
    alert("Game Over! Você errou a sequência.");
    document.getElementById("startButton").disabled = false;
    isPlayerTurn = false;
}