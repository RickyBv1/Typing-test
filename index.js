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
const gameTime = 60; // in seconds
let correctLetters;
let incorrectLetters;
let finnishedWords;
let lettersList = [];
let currentIndex;
let playing = false;

//functions
function startGame() {
    playing = true;
    wordContainer.classList.toggle("hidden", false);
    newWord();
    let correctLetters = 0;
    let incorrectLetters = 0;
    let finnishedWords = 0;
    end.classList.toggle("hidden", true);
    lettersList[0].classList.toggle("currentLetter");
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

function createLetterEffect(element) {
    element.classList.toggle("dissapear", true);
    const letter = element.textContent
    const letterPosition = element.getBoundingClientRect();
    const newLetter = document.createElement("span");
    newLetter.style = `
    left: ${letterPosition.left}px;
    top: ${letterPosition.top}px;
    `
    newLetter.classList.add("dissapear");
    newLetter.textContent = letter;
    document.body.appendChild(newLetter);
}

//Events
beginButton.addEventListener("click", () => startGame());
restartButton.addEventListener("click", () => startGame());

progressBar.addEventListener("animationend", () => {
    playing = false;
    end.classList.toggle("hidden", false);
    progressBar.classList.toggle("completeTime", false);
    correctElement.textContent = correctLetters;
    incorrectElement.textContent = incorrectLetters;
    ppmElement.textContent = finnishedWords * (60 / gameTime);
    wordContainer.classList.toggle("hidden", true);
})


//Execution
input.focus();
document.documentElement.style.setProperty("--gameTime", gameTime + "s");
//newWord();
input.addEventListener("input", (event) => {
    if(!playing) {
        if(event.data === " ") startGame();
        return;
    }

    if(event.data === lettersList[currentIndex].textContent) {
        createLetterEffect(lettersList[currentIndex]);
        currentIndex++;
        correctLetters++;
        if(currentIndex === lettersList.length) {
            newWord();
            finnishedWords++;
        }
        lettersList[currentIndex].classList.toggle("currentLetter");
    } else {
        incorrectElement++;
    }
    
});
input.addEventListener("blur", () => input.focus());