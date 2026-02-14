window.onload = function() {

    setTimeout(function() {

        document.getElementById("sponsorScreen").style.display = "none";
        document.getElementById("gameScreen").style.display = "block";

        startGame();

    }, 3000);

};

let score = 0;
let spiderVisible = false;
let currentInstruction = null;
let clickCount = 0;

const instructions = [
    { text: "Press", type: "PRESS" },
    { text: "Don't Press", type: "NO_PRESS" },
    { text: "Double Click", type: "DOUBLE" },
    { text: "Press when spider appears", type: "SPIDER_PRESS" },
    { text: "Don't press when spider appears", type: "SPIDER_NO_PRESS" }
];

function startGame() {
    const button = document.getElementById("mainBtn");
    button.addEventListener("click", handlePress);
    newRound();
}

function newRound() {
    spiderVisible = false;
    clickCount = 0;

    document.getElementById("spider").innerHTML = "";

    currentInstruction = instructions[Math.floor(Math.random() * instructions.length)];
    document.getElementById("instruction").innerText = currentInstruction.text;

    if (currentInstruction.type.includes("SPIDER")) {
        setTimeout(function() {
            spiderVisible = true;
            document.getElementById("spider").innerHTML = "🕷";
        }, 1500);
    }
}

function handlePress() {
    clickCount++;

    switch (currentInstruction.type) {

        case "PRESS":
            win();
            break;

        case "NO_PRESS":
            gameOver();
            break;

        case "DOUBLE":
            if (clickCount === 2) win();
            break;

        case "SPIDER_PRESS":
            spiderVisible ? win() : gameOver();
            break;

        case "SPIDER_NO_PRESS":
            spiderVisible ? gameOver() : win();
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
