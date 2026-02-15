const smartlink = "https://www.effectivegatecpm.com/h7m7c9ns?key=ab79633823d61c812aa6a556451fe8b6";

let score = 0;
let spiderVisible = false;
let currentInstruction = null;
let timerTimeout = null;
let roundTime = 3000;

const instructions = [
    { text: "Press", action: "PRESS" },
    { text: "Don't Press", action: "NO_PRESS" },
    { text: "Press when spider appears", action: "SPIDER_PRESS" },
    { text: "Don't press when spider appears", action: "SPIDER_NO_PRESS" }
];

// Entry pe ek baar ad
window.addEventListener("load", function () {

    if (!sessionStorage.getItem("adShown")) {
        window.open(smartlink, "_blank");
        sessionStorage.setItem("adShown", "yes");
    }

    startGame();
});

function startGame() {
    const btn = document.getElementById("mainBtn");
    if (btn) btn.onclick = handlePress;
    newRound();
}

function newRound() {

    clearTimeout(timerTimeout);
    spiderVisible = false;

    document.getElementById("spider").innerHTML = "";

    currentInstruction = instructions[Math.floor(Math.random() * instructions.length)];
    document.getElementById("instruction").innerText = currentInstruction.text;

    if (currentInstruction.action.includes("SPIDER")) {
        setTimeout(() => {
            spiderVisible = true;
            document.getElementById("spider").innerHTML = "🕷";
        }, 1000);
    }

    timerTimeout = setTimeout(() => {
        checkResult(false);
    }, roundTime);
}

function handlePress() {
    clearTimeout(timerTimeout);
    checkResult(true);
}

function checkResult(pressed) {

    let winCondition = false;

    switch (currentInstruction.action) {
        case "PRESS":
            winCondition = pressed;
            break;

        case "NO_PRESS":
            winCondition = !pressed;
            break;

        case "SPIDER_PRESS":
            winCondition = pressed && spiderVisible;
            break;

        case "SPIDER_NO_PRESS":
            winCondition = !pressed && spiderVisible;
            break;
    }

    if (winCondition) {
        score += 10;
        document.getElementById("score").innerText = "Score: " + score;
        newRound();
    } else {
        alert("Game Over! Score: " + score);
        score = 0;
        document.getElementById("score").innerText = "Score: 0";
        newRound();
    }
}
