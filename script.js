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

const normalInstructions = [
    "Press",
    "Don't Press"
];

const spiderInstructions = [
    "Press when you see spider",
    "Don't press when spider appears"
];

function newRound() {

    playerPressed = false;
    spiderVisible = false;
    spiderEl.innerHTML = "";

    let randomType = Math.random();

    if (randomType < 0.4) {
        currentInstruction = spiderInstructions[Math.floor(Math.random() * spiderInstructions.length)];
    } else {
        currentInstruction = normalInstructions[Math.floor(Math.random() * normalInstructions.length)];
    }

    instructionEl.innerText = currentInstruction;

    if (currentInstruction.includes("spider")) {
        setTimeout(() => {
            if (Math.random() < 0.7) {
                spiderVisible = true;
                spiderEl.innerHTML = "🕷";
            }
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
        score += 10;
        nextRound();
    }
    else if (currentInstruction === "Don't Press") {
        gameOver();
    }
    else if (currentInstruction === "Press when you see spider") {
        if (spiderVisible) {
            score += 20;
            nextRound();
        } else {
            gameOver();
        }
    }
    else if (currentInstruction === "Don't press when spider appears") {
        if (spiderVisible) {
            gameOver();
        } else {
            score += 10;
            nextRound();
        }
    }
}

function checkResult() {

    if (currentInstruction === "Don't Press" && !playerPressed) {
        score += 10;
        nextRound();
    }
    else if (currentInstruction === "Don't press when spider appears" && !playerPressed) {
        score += 10;
        nextRound();
    }
    else if (currentInstruction === "Press" && !playerPressed) {
        gameOver();
    }
    else if (currentInstruction === "Press when you see spider" && !playerPressed) {
        gameOver();
    }
}

function nextRound() {
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
