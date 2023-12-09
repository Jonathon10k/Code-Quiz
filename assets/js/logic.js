
// ** Module 6 Code Quiz by Jonathon Edward (12/2023)

let questionTitle = document.querySelector("#question-title");
let questionsDiv = document.querySelector("#questions");
let choicesDiv = document.querySelector("#choices");
let startBtn = document.querySelector("#start")
let startScreenDiv = document.querySelector("#start-screen")

// Test object for presenting a single question
let question1 = {
    question: "In JavaScript, which datatype is commonly used to store a selection of related properties?",
    answerChoices: ["String", "Array", "Object", "Number"],
    answer: "Object",
    answerIndex: 2,
}

function start() {
    questionsDiv.classList.remove("hide");
    startScreenDiv.classList.add("hide")
    renderQuestion(question1);

}

// Render the current question/answer set to screen
function renderQuestion(question) {
    questionTitle.textContent = question.question;

    question.answerChoices.forEach((choice, index) => {
        let questionBtn = document.createElement("button");
        questionBtn.className = "choices button"
        questionBtn.dataset.answer = index === question.answerIndex ? "correct" : "wrong";
        questionBtn.dataset.id = index;
        questionBtn.textContent = `${questionBtn.dataset.id}. ${choice}`;
        questionBtn.addEventListener("click", checkAnswer)
        choicesDiv.appendChild(questionBtn);
        // For debug
        console.log(`Btn text: "${questionBtn.textContent}" Answer status: ${questionBtn.dataset.correct}`)
    });
}

// Check if clicked option is correct answer
function checkAnswer(event) {
    event.stopPropagation();
    let clickedAnswer = event.target.dataset.answer;

    if (clickedAnswer === "correct") {
        console.log("Correct answer!");

    } else {
        console.log("Wrong answer!");
    }
console.log(clickedAnswer);
}