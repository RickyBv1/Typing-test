//HTML elements
const beginButton = document.getElementById("begin");
const progressBar = document.querySelector("#progressBar div");
const correctElement = document.querySelector("#correctElement span");
const input = document.querySelector("input");
const incorrectElement = document.querySelector("#incorrectElement span");
const ppmElement = document.querySelector("#ppmElement span");
const end = document.querySelector("#end");
const restartButton = document.querySelector("#end button");
const wordContainer = document.getElementById("currentWord");

//Variables
const gameTime = 5; // in seconds
let correctLetters;
let incorrectLetters;
let finnishedWords;
let lettersList = [];
let currentIndex;

//functions
function startGame() {
    let correctLetters = 0;
    let incorrectLetters = 0;
    let finnishedWords = 0;
    end.classList.toggle("hidden", true);
    progressBar.classList.toggle("completeTime", true);
    beginButton.classList.toggle("hidden", true);
}

function newWord() {
    if(lettersList.length > 0) lettersList.forEach(letter => wordContainer.removeChild(letter));
    const chosenWordNumber = Math.floor(Math.random() * wordsArray.length);
    const chosenWord = wordsArray[chosenWordNumber];
    lettersList = []
    currentIndex = 0;
    for (let i = 0; i < chosenWord.length; i++) {
        const letterElement = document.createElement("span");
        letterElement.textContent = chosenWord[i];
        wordContainer.appendChild(letterElement);
        lettersList.push(letterElement);
    }
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
input.focus();
document.documentElement.style.setProperty("--gameTime", gameTime + "s");
newWord();
input.addEventListener("input", (event) => {
    if(event.data === lettersList[currentIndex].textContent) {
        console.log("correct")
        currentIndex++;
        correctLetters++;
        if(currentIndex === lettersList.length) {
            newWord();
        }
    } else {
        incorrectElement++;
    }
    
});
input.addEventListener("blur", () => input.focus());