// ** Module 6 Code Quiz Challenge by Jonathon Edward (12/2023)

let questionTitle = document.querySelector("#question-title");
let questionsDiv = document.querySelector("#questions");
let endScreenDiv = document.querySelector("#end-screen");
let choicesDiv = document.querySelector("#choices");
let startBtn = document.querySelector("#start")
let startScreenDiv = document.querySelector("#start-screen")
let questionNum = 0;
let score = 0;

// Game timer object
let gameTimer = {
    time: 60000, // Default 60 seconds

    start() {
        console.log(`Started ${this.time/1000} sec timer`);
    },
    getTime() {
        console.log(this.timeLeft);
    },
    take10() {
        console.log(this.timer - 10000);
    }
}

function start() {
    questionsDiv.classList.remove("hide");
    startScreenDiv.classList.add("hide")
    renderQuestion(questionsArray[0]);

    gameTimer.start();

}

// Render the current question/answer set to screen
function renderQuestion(question) {
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
        choicesDiv.innerHTML = "";
        questionNum++;
        score++; console.log("Score: " + score);
        renderQuestion(questionsArray[questionNum]);
        // Answer correct and no questions remain
    } else if (clickedAnswer === "correct" && questionNum === questionsArray.length - 1) {
        console.log("YOU WON THE GAME!");
        questionsDiv.style.display = "none";
        endScreenDiv.classList.add("show");
        // Answer incorrect and questions remain
    } else if (clickedAnswer !== "correct" && questionNum !== questionsArray.length - 1) {
        console.log("Wrong answer!");
        gameClock.take10();
        choicesDiv.innerHTML = "";
        questionNum++;
        renderQuestion(questionsArray[questionNum]);
        // Answer is correct and no questions remain
    } else if (clickedAnswer === "correct" && questionNum === questionsArray.length - 1) {
        console.log("Correct answer! All questions answered");
    }

    console.log(clickedAnswer);
}

// TODO - add timer
// TODO - add score system
// TODO - add sounds on click
// TODO - add README
// TODO add questions to questions.js
// TODO View High Score styling
// TODO status under questions