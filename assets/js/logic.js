
// ** Module 6 Code Quiz by Jonathon Edward (12/2023)

let questionTitle = document.querySelector("#question-title");
let questionsDiv = document.querySelector("#questions");
let endScreenDiv = document.querySelector("#end-screen");
let choicesDiv = document.querySelector("#choices");
let startBtn = document.querySelector("#start")
let startScreenDiv = document.querySelector("#start-screen")
let questionNum = 0;
let score = 0;

// Test object for presenting a single question
let questionsArray = [

    {
        name: "question1",
        question: "In JavaScript, which datatype is commonly used to store a selection of related properties?",
        answerChoices: ["String", "Array", "Object", "Number"],
        answer: "Object",
        answerIndex: 2,
    },

    {
        name: "question2",
        question: "In JavaScript, which datatype is commonly used to store a selection of related properties?",
        answerChoices: ["String", "Array", "Object", "Number"],
        answer: "Object",
        answerIndex: 2,
    },

    {
        name: "question3",
        question: "In JavaScript, which datatype is commonly used to store a selection of related properties?",
        answerChoices: ["String", "Array", "Object", "Number"],
        answer: "Object",
        answerIndex: 2,
    },

    {
        name: "question4",
        question: "In JavaScript, which datatype is commonly used to store a selection of related properties?",
        answerChoices: ["String", "Array", "Object", "Number"],
        answer: "Object",
        answerIndex: 2,
    },

    {
        name: "question5",
        question: "In JavaScript, which datatype is commonly used to store a selection of related properties?",
        answerChoices: ["String", "Array", "Object", "Number"],
        answer: "Object",
        answerIndex: 2,
    },

];

console.log(questionsArray.length)
function start() {
    questionsDiv.classList.remove("hide");
    startScreenDiv.classList.add("hide")
    renderQuestion(questionsArray[0]);

}

// Render the current question/answer set to screen
function renderQuestion(question) {
    questionTitle.textContent = question.question;
    console.log(question.name)

    question.answerChoices.forEach((choice, index) => {
        let questionBtn = document.createElement("button");
        questionBtn.className = "choices button";
        questionBtn.dataset.answer = index === question.answerIndex ? "correct" : "wrong";
        questionBtn.dataset.id = index;
        questionBtn.textContent = `${questionBtn.dataset.id}. ${choice}`;
        questionBtn.addEventListener("click", checkAnswer)
        choicesDiv.appendChild(questionBtn);
        // For debug
        console.log(`Btn "${choice}": "From: ${question.name} Answer status: ${questionBtn.dataset.answer}`)
    });
}

// Check if clicked answer is correct
function checkAnswer(event) {
    event.stopPropagation();
    let clickedAnswer = event.target.dataset.answer;

    if (clickedAnswer === "correct") {
        console.log("Correct answer!");
        
        if (questionNum === questionsArray.length-1) {
            console.log("YOU WON THE GAME!");
            questionsDiv.style.display = "none";
            endScreenDiv.classList.add("show");

        } else {
            choicesDiv.innerHTML = "";
            questionNum++;
            score++; console.log("Score: " + score);
            renderQuestion(questionsArray[questionNum]);
        }


    } else {
        console.log("Wrong answer!");
        // TODO Add time to clock
        // TODO Move to next question
    }
    console.log(clickedAnswer);
}
