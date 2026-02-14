// Splash Screens Logic

setTimeout(() => {
    document.getElementById("sponsorScreen").classList.add("hidden");
    document.getElementById("gameLogoScreen").classList.remove("hidden");

    setTimeout(() => {
        document.getElementById("gameLogoScreen").classList.add("hidden");
        document.getElementById("gameScreen").classList.remove("hidden");
        startGame();
    }, 2000);

}, 3000);


// Game Logic

let score = 0;
let spiderVisible = false;
let currentInstruction = null;

const instructionEl = document.getElementById("instruction");
const scoreEl = document.getElementById("score");
const spiderEl = document.getElementById("spider");
const button = document.getElementById("mainBtn");

const instructions = [
    { text: "Press", type: "PRESS" },
    { text: "Don't Press", type: "NO_PRESS" },
    { text: "Double Click", type: "DOUBLE" },
    { text: "Press when spider appears", type: "SPIDER_PRESS" },
    { text: "Don't press when spider appears", type: "SPIDER_NO_PRESS" }
];

let clickCount = 0;

function startGame() {
    button.addEventListener("click", handlePress);
    newRound();
}

function newRound() {
    spiderVisible = false;
    spiderEl.innerHTML = "";
    clickCount = 0;

    currentInstruction = instructions[Math.floor(Math.random() * instructions.length)];
    instructionEl.innerText = currentInstruction.text;

    if (currentInstruction.type.includes("SPIDER")) {
        setTimeout(() => {
            spiderVisible = true;
            spiderEl.innerHTML = "🕷";
        }, 1500);
    }
}

function handlePress() {
    clickCount++;

    switch (currentInstruction.type) {

        case "PRESS":
            win();
            break;

        case "NO_PRESS":
            gameOver();
            break;

        case "DOUBLE":
            if (clickCount === 2) win();
            break;

        case "SPIDER_PRESS":
            spiderVisible ? win() : gameOver();
            break;

        case "SPIDER_NO_PRESS":
            spiderVisible ? gameOver() : win();
            break;
    }
}

function win() {
    score += 10;
    scoreEl.innerText = "Score: " + score;
    newRound();
}

function gameOver() {
    alert("Game Over! Score: " + score);
    score = 0;
    scoreEl.innerText = "Score: 0";
    newRound();
}
