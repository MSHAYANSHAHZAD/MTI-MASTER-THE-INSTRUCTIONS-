window.onload = function() {

    // Sponsor → Logo → Game flow

    setTimeout(function() {
        document.getElementById("sponsorScreen").classList.add("hidden");
        document.getElementById("logoScreen").classList.remove("hidden");

        setTimeout(function() {
            document.getElementById("logoScreen").classList.add("hidden");
            document.getElementById("gameScreen").classList.remove("hidden");
            startGame();
        }, 2000);

    }, 3000);
};

let score = 0;
let spiderVisible = false;
let currentInstruction = null;
let clickCount = 0;
let autoCheckTimeout = null;

const instructions = [
    { text: "Press", type: "PRESS" },
    { text: "Don't Press", type: "NO_PRESS" },
    { text: "Press when spider appears", type: "SPIDER_PRESS" },
    { text: "Don't press when spider appears", type: "SPIDER_NO_PRESS" }
];

function startGame() {
    document.getElementById("mainBtn").addEventListener("click", handlePress);
    newRound();
}

function newRound() {
    spiderVisible = false;
    clickCount = 0;
    document.getElementById("spider").innerHTML = "";

    clearTimeout(autoCheckTimeout);

    currentInstruction = instructions[Math.floor(Math.random() * instructions.length)];
    document.getElementById("instruction").innerText = currentInstruction.text;

    if (currentInstruction.type.includes("SPIDER")) {

        setTimeout(function() {
            spiderVisible = true;
            document.getElementById("spider").innerHTML = "🕷";

            // Auto evaluate after spider appears (2 sec wait)
            autoCheckTimeout = setTimeout(function() {
                if (currentInstruction.type === "SPIDER_NO_PRESS") {
                    win();
                } else if (currentInstruction.type === "SPIDER_PRESS") {
                    gameOver();
                }
            }, 2000);

        }, 1500);

    } else {
        // Non-spider instructions auto evaluate after 2 sec
        autoCheckTimeout = setTimeout(function() {
            if (currentInstruction.type === "NO_PRESS") {
                win();
            } else if (currentInstruction.type === "PRESS") {
                gameOver();
            }
        }, 2000);
    }
}

function handlePress() {

    clearTimeout(autoCheckTimeout);

    switch (currentInstruction.type) {

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
