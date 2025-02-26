//Elements
const words = wordsArray;
const wordContainer = document.getElementById("currentWord");
const previousWordContainer = document.getElementById("previousWord");
const input = document.querySelector("input");
const correctElement = document.querySelector("#correctElement span");
const incorrectElement = document.querySelector("#incorrectElement span");
const wpmElement = document.querySelector("#wpmElement span");
const startButton = document.getElementById("start");
const progressBar = document.querySelector("#progressBar div");
const endContainer = document.getElementById("end");

//Variables
let lettersList;
let currentIndex = 0;
let correctLetters;
let incorrectLetters;
let wordsFinished;
let wpm;
let playing = false;
const gameTime = 60; //in seconds
document.documentElement.style.setProperty("--gameTime", gameTime + "s");

//Functions
function newWord() {
	currentIndex = 0;
	const chosenWordNumber = Math.floor(Math.random() * (words.length - 1));
	const chosenWord = words[chosenWordNumber];
	deleteChildren(wordContainer);
	lettersList = [];
	for (let i = 0; i < chosenWord.length; i++) {
		const letterElement = document.createElement("span");
		letterElement.textContent = chosenWord[i];
		letterElement.classList.add("show");
		wordContainer.appendChild(letterElement);
		lettersList.push(letterElement);
		letterElement.addEventListener("animationend", ()=>{
			letterElement.classList.toggle("show",false);
		})
	}
}

function startGame(){
	playing = true;
	startButton.classList.toggle("hidden",true);
	wordContainer.classList.toggle("hidden",false);
	resetGame();
	newWord();
	progressBar.classList.toggle("completeTime",true);
	endContainer.classList.toggle("hidden",true);
	lettersList[0].classList.add("currentLetter")
}

function finishGame(){
	playing = false;
	wordContainer.classList.toggle("hidden",true);
	endContainer.classList.toggle("hidden",false);
	progressBar.classList.toggle("completeTime",false);
	wpm = wordsFinished * (60 / gameTime);
	wpmElement.textContent = wpm;
}

function resetGame(){
	correctLetters = 0;
	incorrectLetters = 0;
	wpm = 0;
	wordsFinished = 0;
	correctElement.textContent = correctLetters;
	incorrectElement.textContent = incorrectLetters;
}

function deleteChildren(element){
	Array.from(element.children).forEach(child => element.removeChild(child))
}

function createLetterEffect(element){
	const letter = element.textContent;
	const letterPosition = element.getBoundingClientRect();
	element.classList.add("invisible");
	const newLetter = document.createElement("span");
	newLetter.textContent=letter;
	newLetter.style = `
		--top: ${letterPosition.top}px;
		--left: ${letterPosition.left}px;
	`
	newLetter.classList.add("disappear");
	document.body.appendChild(newLetter);
	newLetter.addEventListener("animationend", ()=>{
		document.body.removeChild(newLetter);
	})
}

// Events
progressBar.addEventListener("animationend", ()=>{
	finishGame();
})
document.getElementById("start").addEventListener("click", ()=> startGame());
input.addEventListener("input",(event)=>{
	if(!playing) {
		if(event.data === " ") startGame();
		return;
	} 
	if(lettersList[currentIndex].textContent === event.data){
		createLetterEffect(lettersList[currentIndex])
		currentIndex++;
		correctLetters++
		correctElement.textContent = correctLetters;
		if(currentIndex === lettersList.length) {
			newWord()
			wordsFinished++;
		};
		lettersList[currentIndex].classList.add("currentLetter")
	}
	else {
		incorrectLetters++
		incorrectElement.textContent = incorrectLetters;
	}
});
input.addEventListener("blur",()=> input.focus())

//Execute
input.focus();