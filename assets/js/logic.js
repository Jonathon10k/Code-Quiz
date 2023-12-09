
// ** Module 6 Code Quiz by Jonathon Edward (12/2023)

let questionTitle = document.querySelector("#question-title");
let questionsDiv = document.querySelector("#questions");
let choicesDiv = document.querySelector("#choices");



// Test object for presenting a single question
let question1 = {
    question: "In JavaScript, which datatype is commonly used to store a selection of related properties?",
    answerChoices: ["String", "Array", "Object", "Number"],
    answer: "Object",
    answerIndex: 2,
}

function start() {
    questionsDiv.classList.remove("hide");

    renderQuestion();
}


renderQuestion();

// Render the current question/answer set to screen
function renderQuestion(question) {
    questionTitle.textContent = question1.question;

    question1.answerChoices.forEach((choice, index) => {
        let questionBtn = document.createElement("button");
        questionBtn.className = "choices button"
        questionBtn.textContent = choice;

        let answer = index === question1.answerIndex ? "true" : "false";
        questionBtn.dataset.correct = answer;

        console.log(questionBtn.dataset.correct, questionBtn.textContent)
        choicesDiv.appendChild(questionBtn);

    });
}
