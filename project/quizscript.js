const questions = [
    { question: "What is Python?", options: ["A snake", "A language", "A game", "A movie"], correct: 1 },
    { question: "Python supports:", options: ["OOP", "Functional Programming", "Both", "None"], correct: 2 },
    { question: "Who developed Python?", options: ["Guido van Rossum", "Dennis Ritchie", "James Gosling", "Bjarne Stroustrup"], correct: 0 },
    { question: "What is PEP 8?", options: ["Python Style Guide", "A Python Package", "A version of Python", "None"], correct: 0 },
    { question: "Which is not a Python framework?", options: ["Flask", "Django", "Spring", "Pyramid"], correct: 2 }
];

let currentQuestion = 0;
let answers = Array(questions.length).fill(null);
let timer = 300; // 5 minutes in seconds

// Load Question
function loadQuestion() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `
        <h2>${questions[currentQuestion].question}</h2>
        <ul>
            ${questions[currentQuestion].options.map((opt, i) => `
                <li>
                    <input type="radio" name="option" id="option${i}" value="${i}" ${answers[currentQuestion] === i ? "checked" : ""}>
                    <label for="option${i}">${opt}</label>
                </li>
            `).join("")}
        </ul>
    `;
}

// Timer
function startTimer() {
    const timerDiv = document.getElementById("timer");
    const interval = setInterval(() => {
        if (timer <= 0) {
            clearInterval(interval);
            alert("Time's up!");
            calculateResult();
        }
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        timerDiv.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timer--;
    }, 1000);
}

// Navigation Buttons
document.getElementById("prev").addEventListener("click", () => {
    if (currentQuestion > 0) currentQuestion--;
    loadQuestion();
});
document.getElementById("next").addEventListener("click", () => {
    saveAnswer();
    if (currentQuestion < questions.length - 1) currentQuestion++;
    loadQuestion();
});
document.getElementById("save").addEventListener("click", saveAnswer);
document.getElementById("submit").addEventListener("click", calculateResult);

function saveAnswer() {
    const selected = document.querySelector("input[name='option']:checked");
    if (selected) answers[currentQuestion] = parseInt(selected.value);
}

// Calculate Result
function calculateResult() {
    saveAnswer();
    const correct = answers.filter((ans, i) => ans === questions[i].correct).length;
    localStorage.setItem("score", correct);
    window.location.href = "results.html";
}

// Initialize Quiz
loadQuestion();
startTimer();
