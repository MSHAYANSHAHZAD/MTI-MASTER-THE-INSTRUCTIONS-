let score = 0;
let spiderVisible = false;
let currentInstruction = "";
let timer;
let playerPressed = false;

const instructionEl = document.getElementById("instruction");
const scoreEl = document.getElementById("score");
const spiderEl = document.getElementById("spider");
const button = document.getElementById("mainBtn");
const timerRing = document.getElementById("timer-ring");

button.addEventListener("click", handlePress);

const instructions = [
    "Press",
    "Don't Press",
    "Do Nothing",
    "Ignore This",
    "Press when spider appears",
    "Don't press when spider appears"
];

function newRound() {
    playerPressed = false;
    spiderVisible = false;
    spiderEl.innerHTML = "";

    currentInstruction = instructions[Math.floor(Math.random() * instructions.length)];
    instructionEl.innerText = currentInstruction;

    // Spider appears only if needed
    if (currentInstruction.includes("spider")) {
        setTimeout(() => {
            spiderVisible = true;
            spiderEl.innerHTML = "🕷";
        }, 1500);
    }

    resetTimer();
}

function resetTimer() {
    timerRing.style.animation = "none";
    void timerRing.offsetWidth;
    timerRing.style.animation = "rotate 5s linear forwards";

    clearTimeout(timer);
    timer = setTimeout(evaluateRound, 5000);
}

function handlePress() {
    playerPressed = true;
}

function evaluateRound() {

    let shouldPress = false;

    // Decide logically if player SHOULD have pressed
    if (currentInstruction === "Press") {
        shouldPress = true;
    }

    if (currentInstruction === "Press when spider appears" && spiderVisible) {
        shouldPress = true;
    }

    if (currentInstruction === "Don't press when spider appears" && !spiderVisible) {
        shouldPress = true;
    }

    // For Do Nothing, Ignore, Don't Press → shouldPress stays false

    if (playerPressed === shouldPress) {
        score += 10;
        scoreEl.innerText = "Score: " + score;
        newRound();
    } else {
        gameOver();
    }
}

function gameOver() {
    alert("Game Over! Score: " + score);
    score = 0;
    scoreEl.innerText = "Score: 0";
    newRound();
}

newRound();
