// ** Module 6 Code Quiz Challenge by Jonathon Edward (12/2023)

let timerSpan = document.querySelector("#time");
let questionTitle = document.querySelector("#question-title");
let questionsDiv = document.querySelector("#questions");
let finalScoreDisplay = document.querySelector("#final-score");
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
    time: 0,
    start() {
        this.time = 30000; // 30 secs time limit
        timerSpan.textContent = gameTimer.time / 1000;
        // Set 1-second interval to decrement time and trigger game end
        setInterval(() => {
            if (this.time > 0) {
                this.time -= 1000;
                console.log(this.time / 1000);
                timerSpan.textContent = this.time / 1000;
            } else {
                clearInterval(this);
                console.log(`Time stopped at: ${this.time / 1000}`);
                gameOver();
            }
        }, 1000);
    },
    minus10() {
        this.time -= 10000;
        console.log("10 secs deducted");
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
    gameTimer.start(); // Start the timer
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
        score++;
        playFX.correct();
        setTimeout(() => gameOver(), 2000);
        // Answer incorrect and questions remain
    } else if (clickedAnswer !== "correct" && questionNum !== questionsArray.length - 1) {
        gameTimer.minus10();
        feedbackDiv.textContent = "Incorrect answer!";
        playFX.incorrect();
        choicesDiv.innerHTML = "";
        questionNum++;
        renderQuestion(questionsArray[questionNum]);
        // Answer incorrect and no questions remain
    } else if (clickedAnswer !== "correct" && questionNum === questionsArray.length - 1) {
        feedbackDiv.textContent = "Incorrect answer!";
        playFX.incorrect();
        setTimeout(() => gameOver(), 2000);
        gameTimer.minus10();
        gameOver();
    }

    console.log(clickedAnswer);
}

// Function to handle gameOver scenario
function gameOver() {
    questionsDiv.style.display = "none";
    feedbackDiv.classList.add("hide");
    endScreenDiv.classList.add("show")
    finalScoreDisplay.textContent = score;
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
