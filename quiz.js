const questions = [
    {
        q: "Where was Rin and Rean's first Meeting?",
        choices: ["Comic Fiesta", "Animefest+", "Nijigen", "AnimeSyok"],
        correct: 3
    },
    {
        q: "Which character is Rean's Favourite?",
        choices: ["Kazuha", "Scaramouche", "Xiao", "Flins"],
        correct: 1
    },
    {
        q: "What is Rean's favourite subject?",
        choices: ["Mathematics", "Sejarah", "Perniagaan", "Bahasa Melayu"],
        correct: 0
    },
    {
        q: "What is Rean's favourite food?",
        choices: ["Spicy Ramen", "Fries", "Chocolates", "Sushi"],
        correct: 2
    },
    {
        q: "urmms what is Rean's height",
        choices: ["157cm", "150cm", "155cm", "6'7"],
        correct: 2
    }
];

let index = 0;
let score = 0;
let answersLog = [];

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const progressEl = document.getElementById("progress");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const reviewBox = document.getElementById("review");

function loadQuestion() {
    const current = questions[index];
    progressEl.textContent = `${index + 1} / ${questions.length}`;
    questionEl.textContent = current.q;
    choicesEl.innerHTML = "";

    current.choices.forEach((choice, i) => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.onclick = () => selectAnswer(i, btn);
        choicesEl.appendChild(btn);
    });
}

function selectAnswer(choiceIndex, button) {
    const current = questions[index];
    const isCorrect = choiceIndex === current.correct;

    button.classList.add(isCorrect ? "correct" : "wrong");

    answersLog.push({
        question: current.q,
        correct: current.choices[current.correct],
        chosen: current.choices[choiceIndex],
        isCorrect
    });

    if (isCorrect) score++;

    setTimeout(() => {
        index++;
        if (index < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 700);
}

function showResults() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreText.textContent = `${score} / ${questions.length}`;

    reviewBox.classList.remove("hidden");
    answersLog.forEach(a => {
        const p = document.createElement("p");
        p.innerHTML = a.isCorrect
            ? `✅ ${a.question}`
            : `❌ ${a.question}<br><small>Correct: ${a.correct}</small>`;
        reviewBox.appendChild(p);
    });
}

loadQuestion();