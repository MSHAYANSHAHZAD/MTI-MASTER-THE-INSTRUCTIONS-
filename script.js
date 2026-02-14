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

    // Spider appear only if instruction needs it
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
    timer = setTimeout(checkResult, 5000);
}

function handlePress() {
    playerPressed = true;

    if (currentInstruction === "Press") {
        nextRound(10);
    }
    else if (currentInstruction === "Don't Press") {
        gameOver();
    }
    else if (currentInstruction === "Press when spider appears") {
        if (spiderVisible) {
            nextRound(20);
        } else {
            gameOver();
        }
    }
    else if (currentInstruction === "Don't press when spider appears") {
        if (spiderVisible) {
            gameOver();
        } else {
            nextRound(10);
        }
    }
    else if (currentInstruction === "Do Nothing" || currentInstruction === "Ignore This") {
        gameOver();
    }
}

function checkResult() {

    if (currentInstruction === "Don't Press" && !playerPressed) {
        nextRound(10);
    }
    else if ((currentInstruction === "Do Nothing" || currentInstruction === "Ignore This") && !playerPressed) {
        nextRound(10);
    }
    else if (currentInstruction === "Don't press when spider appears" && !playerPressed) {
        nextRound(10);
    }
    else {
        gameOver();
    }
}

function nextRound(points) {
    score += points;
    scoreEl.innerText = "Score: " + score;
    newRound();
}

function gameOver() {
    alert("Game Over! Score: " + score);
    score = 0;
    scoreEl.innerText = "Score: 0";
    newRound();
}

newRound();
