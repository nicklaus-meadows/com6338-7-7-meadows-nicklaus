var questionsArr = [
    {
        question: "Who created JavaScript?",
        answer: "Brendan Eich",
        options: ["Linus Torvalds", "Brendan Eich", "Dan Abramov", "Douglas Crockford"]
    },
    {
        question: "In what year was JavaScript created?",
        answer: "1995",
        options: ["1999", "1975", "1995", "2005"]
    },
    {
        question: "What flower was Monet most famous for painting?",
        answer: "Water Lilies",
        options: ["Roses", "Water Lilies", "Daisies", "Dahlias"]
    },
    {
        question: "Which Italian town is the setting for Shakespeare's Romeo and Juliet?",
        answer: "Verona",
        options: ["Naples", "Sorrento", "Verona", "Sicily"]
    },
    {
        question: "What nationality was Pablo Picasso?",
        answer: "Spanish",
        options: ["American", "Italian", "French", "Spanish"]
    }
];

document.addEventListener("DOMContentLoaded", function () {
    const quizContainer = document.getElementById("quiz");
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;

    function startQuiz(e) {
        if (e) e.preventDefault();
        score = 0;
        currentQuestionIndex = 0;
        quizContainer.innerHTML = "";
        loadQuestion();
    }

    function loadQuestion() {
        if (currentQuestionIndex >= questionsArr.length) {
            return endQuiz();
        }
        const questionData = questionsArr[currentQuestionIndex];
        quizContainer.innerHTML = `<p>${questionData.question}</p>`;

        const optionsDiv = document.createElement("div");
        questionData.options.forEach(function (option) {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", function () {
                checkAnswer(option);
            });
            optionsDiv.appendChild(button);
        });
        quizContainer.appendChild(optionsDiv);

        const timerElement = document.createElement("p");
        timerElement.id = "timer";
        quizContainer.appendChild(timerElement);

        startTimer(timerElement);
    }

    function checkAnswer(selectedAnswer) {
        if (selectedAnswer === questionsArr[currentQuestionIndex].answer) {
            score++;
        }
        currentQuestionIndex++;
        loadQuestion();
    }

    function startTimer(timerElement) {
        let timeLeft = 30; // have an odd failure here, but it displays correctly. nah im an idiot it was really a scope problem. 
        timerElement.textContent = `Time Left: ${timeLeft}`;

        clearInterval(timer);
        timer = setInterval(function () {
            timeLeft--;
            timerElement.textContent = `Time Left: ${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                currentQuestionIndex++;
                loadQuestion();
            }
        }, 1000);
    }

    function endQuiz() {
        clearInterval(timer);
        const finalScore = Math.round((score / questionsArr.length) * 100);
        localStorage.setItem("previous-score", finalScore);
        quizContainer.innerHTML = `<p>Previous Score: ${finalScore}%</p>`;
        const startButton = document.createElement("button");
        startButton.id = "start-quiz";
        startButton.textContent = "Start Quiz!";
        startButton.addEventListener("click", startQuiz);
        quizContainer.appendChild(startButton);
    }

    function loadStartScreen() {
        quizContainer.innerHTML = "";
        const previousScore = localStorage.getItem("previous-score");
        if (previousScore !== null) {
            const scoreElement = document.createElement("p");
            scoreElement.textContent = `Previous Score: ${previousScore}%`;
            quizContainer.appendChild(scoreElement);
        }
        const startButton = document.createElement("button");
        startButton.id = "start-quiz";
        startButton.textContent = "Start Quiz!";
        startButton.addEventListener("click", startQuiz);
        quizContainer.appendChild(startButton);
    }

    loadStartScreen();
});