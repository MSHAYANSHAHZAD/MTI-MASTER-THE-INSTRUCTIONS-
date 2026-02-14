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

button.addEventListener("click", () => {
    playerPressed = true;
});

const instructions = [
    { text: "Press", type: "PRESS" },
    { text: "Don't Press", type: "NO_PRESS" },
    { text: "Do Nothing", type: "NO_PRESS" },
    { text: "Ignore This", type: "NO_PRESS" },
    { text: "Press when spider appears", type: "SPIDER_PRESS" },
    { text: "Don't press when spider appears", type: "SPIDER_NO_PRESS" }
];

function newRound() {

    playerPressed = false;
    spiderVisible = false;
    spiderEl.innerHTML = "";

    const random = instructions[Math.floor(Math.random() * instructions.length)];
    currentInstruction = random;

    instructionEl.innerText = currentInstruction.text;

    if (currentInstruction.type.includes("SPIDER")) {
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

function evaluateRound() {

    let correct = false;

    switch (currentInstruction.type) {

        case "PRESS":
            correct = playerPressed;
            break;

        case "NO_PRESS":
            correct = !playerPressed;
            break;

        case "SPIDER_PRESS":
            correct = spiderVisible && playerPressed;
            break;

        case "SPIDER_NO_PRESS":
            correct = spiderVisible && !playerPressed;
            break;
    }

    if (correct) {
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
