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
let decisionTimer = null;

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
    clearTimeout(decisionTimer);
    document.getElementById("spider").innerHTML = "";

    currentInstruction = instructions[Math.floor(Math.random() * instructions.length)];
    document.getElementById("instruction").innerText = currentInstruction.text;

    // Spider logic
    if (currentInstruction.action.includes("SPIDER")) {

        setTimeout(function() {
            spiderVisible = true;
            document.getElementById("spider").innerHTML = "🕷";

            decisionTimer = setTimeout(function() {
                if (currentInstruction.action === "SPIDER_NO_PRESS") {
                    win();
                } else {
                    gameOver();
                }
            }, 2000);

        }, 1500);

    } else {

        decisionTimer = setTimeout(function() {
            if (currentInstruction.action === "NO_PRESS") {
                win();
            } else {
                gameOver();
            }
        }, 2000);
    }
}

function handlePress() {

    clearTimeout(decisionTimer);

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
