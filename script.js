window.onload = function() {

    setTimeout(function() {
        document.getElementById("sponsorScreen").classList.add("hidden");
        document.getElementById("logoScreen").classList.add("hidden");
        document.getElementById("gameScreen").classList.remove("hidden");
        startGame();
    }, 3000);
};

let score = 0;
let spiderVisible = false;
let currentInstruction = null;
let timerTimeout = null;

const instructions = [
    { text: "Press", action: "PRESS" },
    { text: "Don't Press", action: "NO_PRESS" },
    { text: "Press when spider appears", action: "SPIDER_PRESS" },
    { text: "Don't press when spider appears", action: "SPIDER_NO_PRESS" }
];

function startGame() {
    document.getElementById("mainBtn").addEventListener("click", handlePress);
    newRound();
}

function newRound() {

    spiderVisible = false;
    clearTimeout(timerTimeout);
    document.getElementById("spider").innerHTML = "";

    // Reset timer animation
    const ring = document.querySelector(".timer-ring");
    ring.style.animation = "none";
    void ring.offsetWidth;
    ring.style.animation = "spin 4s linear forwards";

    currentInstruction = instructions[Math.floor(Math.random() * instructions.length)];
    document.getElementById("instruction").innerText = currentInstruction.text;

    if (currentInstruction.action.includes("SPIDER")) {
        setTimeout(function() {
            spiderVisible = true;
            document.getElementById("spider").innerHTML = "🕷";
        }, 1500);
    }

    timerTimeout = setTimeout(evaluateRound, 4000);
}

function handlePress() {

    clearTimeout(timerTimeout);

    switch (currentInstruction.action) {

        case "PRESS":
            win();
            break;

        case "NO_PRESS":
            gameOver();
            break;

        case "SPIDER_PRESS":
            spiderVisible ? win() : gameOver();
            break;

        case "SPIDER_NO_PRESS":
            gameOver();
            break;
    }
}

function evaluateRound() {

    switch (currentInstruction.action) {

        case "PRESS":
            gameOver();
            break;

        case "NO_PRESS":
            win();
            break;

        case "SPIDER_PRESS":
            gameOver();
            break;

        case "SPIDER_NO_PRESS":
            win();
            break;
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
