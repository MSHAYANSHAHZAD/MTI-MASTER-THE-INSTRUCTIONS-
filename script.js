// 🔥 Tumhari Smartlink
const smartlink = "https://www.effectivegatecpm.com/h7m7c9ns?key=ab79633823d61c812aa6a556451fe8b6";

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

// 🔥 Entry pe ek baar ad
window.addEventListener("load", function () {

    if (!sessionStorage.getItem("adShown")) {
        window.open(smartlink, "_blank");
        sessionStorage.setItem("adShown", "yes");
    }

    startIntroFlow();
});

function startIntroFlow() {

    const sponsor = document.getElementById("sponsorScreen");
    const logo = document.getElementById("logoScreen");
    const game = document.getElementById("gameScreen");

    if (sponsor && logo && game) {

        setTimeout(() => {
            sponsor.classList.add("hidden");
            logo.classList.remove("hidden");

            setTimeout(() => {
                logo.classList.add("hidden");
                game.classList.remove("hidden");
                startGame();
            }, 1500);

        }, 2000);

    } else {
        // Agar sponsor/logo nahi ho to direct game
        startGame();
    }
}

function startGame() {
    const btn = document.getElementById("mainBtn");
    if (btn) btn.addEventListener("click", handlePress);
    newRound();
}

function newRound() {

    spiderVisible = false;
    clearTimeout(timerTimeout);

    const spiderEl = document.getElementById("spider");
    if (spiderEl) spiderEl.innerHTML = "";

    const ring = document.querySelector(".timer-ring");
    if (ring) {
        ring.style.animation = "none";
        void ring.offsetWidth;
        ring.style.animation = "spin " + roundTime + "ms linear forwards";
    }

    currentInstruction = instructions[Math.floor(Math.random() * instructions.length)];
    document.getElementById("instruction").innerText = currentInstruction.text;

    if (currentInstruction.action.includes("SPIDER")) {
        setTimeout(() => {
            spiderVisible = true;
            if (spiderEl) spiderEl.innerHTML = "🕷";
        }, 1000);
    }

    timerTimeout = setTimeout(evaluateRound, roundTime);
}

function handlePress() {
    clearTimeout(timerTimeout);

    if (
        currentInstruction.action === "PRESS" ||
        (currentInstruction.action === "SPIDER_PRESS" && spiderVisible)
    ) {
        win();
    } else {
        gameOver();
    }
}

function evaluateRound() {

    if (
        currentInstruction.action === "NO_PRESS" ||
        currentInstruction.action === "SPIDER_NO_PRESS"
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
