//HTML elements
const beginButton = document.getElementById("begin");
const progressBar = document.querySelector("#progressBar div");
const correctElement = document.querySelector("#correctElement span");
const incorrectElement = document.querySelector("#incorrectElement span");
const ppmElement = document.querySelector("#ppmElement span");
const end = document.querySelector("#end");
const restartButton = document.querySelector("#end button");

//Variables
const gameTime = 5; // in seconds

//functions
function startGame() {
    end.classList.toggle("hidden", true);
    progressBar.classList.toggle("completeTime", true);
    beginButton.classList.toggle("hidden", true);
}

//Events
beginButton.addEventListener("click", () => startGame());
restartButton.addEventListener("click", () => startGame());

progressBar.addEventListener("animationend", () => {
    end.classList.toggle("hidden", false);
    progressBar.classList.toggle("completeTime", false);
    correctElement.textContent = "Change";
    incorrectElement.textContent = "Change";
    ppmElement.textContent = "Change";
})


//Execution
document.documentElement.style.setProperty("--gameTime", gameTime + "s");