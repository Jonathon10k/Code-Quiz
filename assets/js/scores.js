// Scores list handling for Code Quiz game

let scoresOl = document.querySelector("#scores-ol");


// Render existing scores to document
renderScores();

// Render scores from local storage
function renderScores() {
    if (localStorage.getItem("scoresList") !== null) {
        scoresOl.innerHTML = "";
        let storedScores = localStorage.getItem("scoresList");
        let scoresList = JSON.parse(storedScores);
        console.log(scoresList)

        scoresList.forEach((item, index, arr) => {
            console.log(item.name)
            let scoreEntry = document.createElement("li");
            if (index < arr.length - 1 && item.score > arr[index + 1].score) {
                scoreEntry.classList.add("top-score");
            }
            scoreEntry.textContent = `"Initials: ${item.name} - Score: ${item.score}"`;
            scoresOl.appendChild(scoreEntry);
        })
    } else {
        // Blank the scores list if user cleared or storage retrieval bug
        scoresOl.innerHTML = "No scores to display!";
    }
}

// Clear saved score values and render
function clearScores() {
    localStorage.removeItem("scoresList");
    console.log("Scores cleared");
    renderScores();
}