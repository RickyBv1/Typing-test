//HTML elements
const beginButton = document.getElementById("begin");
const progressBar = document.querySelector("#progressBar div");

//Variables
const gameTime = 60; // in seconds


beginButton.addEventListener("click", () => {
    progressBar.classList.toggle("completeTime", true);
    beginButton.classList.toggle("hidden", true);
})

progressBar.addEventListener("animationend", () => {
    progressBar.classList.toggle("completeTime", false);
})

//Execution
document.documentElement.style.setProperty("--gameTime", gameTime + "s");