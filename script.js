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

window.onload = function() {

    const sponsor = document.getElementById("sponsorScreen");
    const logo = document.getElementById("logoScreen");
    const game = document.getElementById("gameScreen");

    sponsor.classList.add("fade-in");

    setTimeout(function() {
        sponsor.classList.add("fade-out");

        setTimeout(function() {
            sponsor.classList.add("hidden");
            logo.classList.remove("hidden");
            logo.classList.add("logo-pop");

            setTimeout(function() {
                logo.classList.add("hidden");
                game.classList.remove("hidden");
                startGame();
            }, 1000);

        }, 1000);

    }, 1500);
};

function startGame() {
    document.getElementById("mainBtn").addEventListener("click", handlePress);
    newRound();
}

function newRound() {

    spiderVisible = false;
    clearTimeout(timerTimeout);
    document.getElementById("spider").innerHTML = "";

    if (score > 0 && score % 50 === 0) {
        roundTime -= 200;
        if (roundTime < 1200) roundTime = 1200;
    }

    const ring = document.querySelector(".timer-ring");
    ring.style.animation = "none";
    void ring.offsetWidth;
    ring.style.animation = "spin " + roundTime + "ms linear forwards";

    currentInstruction = instructions[Math.floor(Math.random() * instructions.length)];
    document.getElementById("instruction").innerText = currentInstruction.text;

    if (currentInstruction.action.includes("SPIDER")) {
        setTimeout(function() {
            spiderVisible = true;
            document.getElementById("spider").innerHTML = "🕷";
        }, 1000);
    }

    timerTimeout = setTimeout(evaluateRound, roundTime);
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
    roundTime = 2500;
    document.getElementById("score").innerText = "Score: 0";
    newRound();
}
