let score = 0;
let spiderVisible = false;
let waitingForSpider = false;
let currentInstruction = "";
let timer;

const instructionEl = document.getElementById("instruction");
const scoreEl = document.getElementById("score");
const spiderEl = document.getElementById("spider");
const button = document.getElementById("mainBtn");
const timerRing = document.getElementById("timer-ring");

button.addEventListener("click", handlePress);

const normalInstructions = [
    "Press",
    "Don't Press",
    "Tap Twice",
    "Do Nothing",
    "Press Quickly",
    "Ignore This"
];

const spiderInstructions = [
    "Press when you see spider",
    "Don't press when spider appears"
];

function newRound() {

    spiderVisible = false;
    spiderEl.innerHTML = "";

    let randomType = Math.random();

    if (randomType < 0.3) {
        currentInstruction = spiderInstructions[Math.floor(Math.random() * spiderInstructions.length)];
        waitingForSpider = true;
    } else {
        currentInstruction = normalInstructions[Math.floor(Math.random() * normalInstructions.length)];
        waitingForSpider = false;
    }

    instructionEl.innerText = currentInstruction;

    if (waitingForSpider) {
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
    timer = setTimeout(gameOver, 5000);
}

function handlePress() {

    if (currentInstruction === "Press") {
        score += 10;
    }
    else if (currentInstruction === "Don't Press") {
        gameOver();
        return;
    }
    else if (currentInstruction === "Press when you see spider") {
        if (spiderVisible) {
            score += 20;
        } else {
            gameOver();
            return;
        }
    }
    else if (currentInstruction === "Don't press when spider appears") {
        if (spiderVisible) {
            gameOver();
            return;
        } else {
            score += 10;
        }
    }
    else {
        score += 5;
    }

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
