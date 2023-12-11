// ** Module 6 Code Quiz Challenge by Jonathon Edward (12/2023)

let questionTitle = document.querySelector("#question-title");
let questionsDiv = document.querySelector("#questions");
let endScreenDiv = document.querySelector("#end-screen");
let choicesDiv = document.querySelector("#choices");
let startBtn = document.querySelector("#start")
let startScreenDiv = document.querySelector("#start-screen")
let initialsInput = document.querySelector("#initials");
let submitBtn = document.querySelector("#submit");
let feedbackDiv = document.querySelector("#feedback");
let questionNum = 0;
let score = 0;

// Game timer object
let gameTimer = {
    time: 60000, // Default 60 seconds

    start() {
        console.log(`Started ${this.time / 1000} sec timer`);
    },
    getTime() {
        console.log(this.timeLeft);
    },
    minus10() { // Minus 10 seconds from timer
        console.log(this.timer - 10000);
    }
}

// Sound FX object
let playFX = {
    pathCorrect: "./assets/sfx/correct.wav",
    pathIncorrect: "./assets/sfx/incorrect.wav",

    correct() {
        let sound = new Audio(this.pathCorrect);
        sound.play();
    },

    incorrect() {
        let sound = new Audio(this.pathIncorrect);
        sound.play();
    },
}


function start() {
    questionsDiv.classList.remove("hide");
    startScreenDiv.classList.add("hide")
    renderQuestion(questionsArray[0]);
    gameTimer.start();
}

// Render the current question/answer set to screen
function renderQuestion(question) {
    choicesDiv.innerHTML = "";
    feedbackDiv.classList.remove(".hide");
    questionTitle.textContent = question.question;
    console.log(`---${question.name}---`);

    question.answerChoices.forEach((choice, index) => {
        let questionBtn = document.createElement("button");
        questionBtn.className = "choices button";
        questionBtn.dataset.answer = index === question.answerIndex ? "correct" : "wrong";
        questionBtn.dataset.id = index + 1;
        questionBtn.textContent = `${questionBtn.dataset.id}. ${choice}`;
        questionBtn.addEventListener("click", checkAnswer) // Add handler
        choicesDiv.appendChild(questionBtn);
        // For debug
        console.log(`${questionBtn.dataset.id}: "${choice}". Status: ${questionBtn.dataset.answer}`)
    });
}

// Check if clicked answer is correct
function checkAnswer(event) {
    event.stopPropagation();
    let clickedAnswer = event.target.dataset.answer;

    // Answer correct and questions remain
    if (clickedAnswer === "correct" && questionNum !== questionsArray.length - 1) {
        questionNum++;
        playFX.correct();
        score++;
        feedbackDiv.textContent = "Correct answer!";
        renderQuestion(questionsArray[questionNum]);
        // Answer correct and no questions remain
    } else if (clickedAnswer === "correct" && questionNum === questionsArray.length - 1) {
        feedbackDiv.textContent = "Correct answer!";
        playFX.correct();
        questionsDiv.style.display = "none";
        feedbackDiv.classList.add("hide");
        endScreenDiv.classList.add("show");
        score++;
        // Answer incorrect and questions remain
    } else if (clickedAnswer !== "correct" && questionNum !== questionsArray.length - 1) {
        gameTimer.minus10();
        feedbackDiv.textContent = "Incorrect answer!";
        playFX.incorrect();
        choicesDiv.innerHTML = "";
        questionNum++;
        renderQuestion(questionsArray[questionNum]);
        // Answer icorrect and no questions remain
    } else if (clickedAnswer !== "correct" && questionNum === questionsArray.length - 1) {
        feedbackDiv.textContent = "Incorrect answer!";
        playFX.incorrect();
        questionsDiv.style.display = "none";
        feedbackDiv.classList.add("hide");
        endScreenDiv.classList.add("show");
        gameTimer.minus10();
    }

    console.log(clickedAnswer);
}

// Handle submit button
submitBtn.addEventListener("click", () => {
    let initials = initialsInput.value;

    if (initials !== "") {

        if (localStorage.getItem("scoresList") !== null) {
            // If scoresList exists in localStorage, push new values to array
            let storedScores = JSON.parse(localStorage.getItem("scoresList"));
            let currentScore = { name: initials, score: score };
            storedScores.unshift(currentScore);
            localStorage.setItem("scoresList", JSON.stringify(storedScores));
        } else {
            let scoresList = [];
            let currentScore = { name: initials, score: score };
            scoresList.unshift(currentScore);
            localStorage.setItem("scoresList", JSON.stringify(scoresList));
        }

        initials.value = "";
        window.location.href = "highscores.html";

    } else {
        alert("Please enter your initials!");
    }
})


// TODO - add timer
// TODO - add sounds on click
// TODO - add README

