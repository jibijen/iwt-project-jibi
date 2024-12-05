const questions = [
    {
        question: "What is the output of print(2 ** 3)?",
        options: ["6", "8", "9", "4"],
        answer: 1
    },
    {
        question: "Which keyword is used for a function in Python?",
        options: ["func", "function", "def", "define"],
        answer: 2
    },
    {
        question: "What is the correct way to create a dictionary?",
        options: [
            "{'key': 'value'}",
            "[key: value]",
            "dictionary('key', 'value')",
            "{key = value}"
        ],
        answer: 0
    },
    {
        question: "What does 'len()' do in Python?",
        options: [
            "Finds the length of a string",
            "Finds the length of a list",
            "Both A and B",
            "None of the above"
        ],
        answer: 2
    },
    {
        question: "How do you insert comments in Python?",
        options: ["// comment", "# comment", "/* comment */", "<!-- comment -->"],
        answer: 1
    }
];

let currentQuestion = 0;
let timeLeft = 300; // 5 minutes
let score = 0;
const userAnswers = new Array(questions.length).fill(null);

// Timer
const timerElement = document.getElementById("timer");
const interval = setInterval(() => {
    if (timeLeft <= 0) {
        clearInterval(interval);
        alert("Time's up!");
        submitQuiz();
    } else {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `Time Left: ${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
}, 1000);

// Load question
function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const question = questions[currentQuestion];

    questionElement.textContent = question.question;
    optionsElement.innerHTML = "";
    question.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<label><input type="radio" name="option" value="${index}" ${userAnswers[currentQuestion] === index ? 'checked' : ''}> ${option}</label>`;
        optionsElement.appendChild(li);
    });
}

loadQuestion();

// Navigation
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        saveAnswer();
        currentQuestion++;
        loadQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        saveAnswer();
        currentQuestion--;
        loadQuestion();
    }
}

// Save answer
function saveAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestion] = parseInt(selectedOption.value);
    }
}

function saveQuestion() {
    saveAnswer();
    alert("Answer saved!");
}

// Submit quiz
function submitQuiz() {
    saveAnswer();
    score = userAnswers.reduce((acc, answer, index) => acc + (answer === questions[index].answer ? 1 : 0), 0);

    // Save results to localStorage for the results and tracking pages
    localStorage.setItem("score", score);
    const scoreTracker = JSON.parse(localStorage.getItem("scoreTracker")) || [];
    scoreTracker.push({
        testName: "Python Quiz",
        marks: score,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem("scoreTracker", JSON.stringify(scoreTracker));

    window.location.href = "results.html";
}

function saveQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert("Please select an option before saving!");
        return;
    }

    const savedQuestions = JSON.parse(localStorage.getItem("savedQuestions")) || [];
    const currentQuestionData = questions[currentQuestion];
    const alreadySaved = savedQuestions.find(q => q.question === currentQuestionData.question);

    // Update if already saved, else add new
    if (alreadySaved) {
        alreadySaved.selected = currentQuestionData.options[selectedOption.value];
    } else {
        savedQuestions.push({
            question: currentQuestionData.question,
            selected: currentQuestionData.options[selectedOption.value]
        });
    }

    localStorage.setItem("savedQuestions", JSON.stringify(savedQuestions));
    alert("Question saved successfully!");
}

