let score = 0;
let spiderVisible = false;
let currentInstruction = null;
let timerTimeout = null;
let roundTime = 2500;

const instructions = [
    { text: "Press", action: "PRESS" },
    { text: "Don't Press", action: "NO_PRESS" },
    { text: "Press when spider appears", action: "SPIDER_PRESS" },
    { text: "Don't press when spider appears", action: "SPIDER_NO_PRESS" }
];

window.onload = function () {

    setTimeout(() => {
        document.getElementById("sponsorScreen").classList.add("hidden");
        document.getElementById("logoScreen").classList.remove("hidden");

        setTimeout(() => {
            document.getElementById("logoScreen").classList.add("hidden");
            document.getElementById("gameScreen").classList.remove("hidden");
            startGame();
        }, 1500);

    }, 2000);
};

function startGame() {
    document.getElementById("mainBtn").addEventListener("click", handlePress);
    newRound();
}

function newRound() {

    spiderVisible = false;
    clearTimeout(timerTimeout);
    document.getElementById("spider").innerHTML = "";

    const ring = document.querySelector(".timer-ring");
    ring.style.animation = "none";
    void ring.offsetWidth;
    ring.style.animation = "spin " + roundTime + "ms linear forwards";

    currentInstruction = instructions[Math.floor(Math.random() * instructions.length)];
    document.getElementById("instruction").innerText = currentInstruction.text;

    if (currentInstruction.action.includes("SPIDER")) {
        setTimeout(() => {
            spiderVisible = true;
            document.getElementById("spider").innerHTML = "🕷";
        }, 1000);
    }

    timerTimeout = setTimeout(evaluateRound, roundTime);
}

function handlePress() {
    clearTimeout(timerTimeout);

    if (
        (currentInstruction.action === "PRESS") ||
        (currentInstruction.action === "SPIDER_PRESS" && spiderVisible)
    ) {
        win();
    } else {
        gameOver();
    }
}

function evaluateRound() {

    if (
        (currentInstruction.action === "NO_PRESS") ||
        (currentInstruction.action === "SPIDER_NO_PRESS")
    ) {
        win();
    } else {
        gameOver();
    }
}

function win() {
    score += 10;
    document.getElementById("score").innerText = "Score: " + score;
    newRound();
}

function gameOver() {
    alert("Game Over! Score: " + score);
    score = 0;
    document.getElementById("score").innerText = "Score: 0";
    newRound();
}
