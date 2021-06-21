// Nested array that holds my questions, choices, and answers 
var questions = [
    {
        question: "What is the name of Omen's blind ability?",
        choices: ["Paranoia", "Dark Cover", "From The Shadows", "Curse of Blindness"],
        answer: "Paranoia",
    },
    {
        question: "Which of these IS a weapon in the Rifle Category?",
        choices: ["Ghost", "Spectre", "Phantom", "Ghoul"],
        answer: "Phantom",
    },
    {
        question: "Which of these weapons is the MOST expensive?",
        choices: ["Classic", "Judge", "Vandal", "Operator"],
        answer: "Operator",
    },
    {
        question: "Which of the following is NOT an Agent's Name",
        choices: ["Viper", "Breach", "Killjoy", "Arrow"],
        answer: "Arrow"
    },
    {
        question: "Which of the following is NOT the name of a map?",
        choices: ["Ascent", "Overgrown", "Bind", "Split"],
        answer: "Overgrown",
    },
    {
        question: "Which skin line was the first to be introduced when Valorant released",
        choices: ["Elderflame", "Prism", "Prime", "Oni"],
        answer: "Prime",
    },
    {
        question: "Which skin line got a second release with new weapon skins?",
        choices: ["Glitchpop", "Sovereign", "Prototype", "Infantry"],
        answer: "Glitchpop",
    },
];

// variables used to target specific elements
var startButton = document.getElementById("start");

var retryButton = document.getElementById("retry");

var homeButton = document.getElementById("home");

var homeScreen = document.getElementById("init-div");

var gameScreen = document.getElementById("game-div");

var retryScreen = document.getElementById("retry-div");

var timerEl = document.getElementById("timer"); 

var displayQuestion = document.getElementById("game-question");

var displayChoices = document.getElementById("game-choices");

var statScreen = document.getElementById("stats");

var scoreDiv =document.getElementById("showScore");

var numOfQuestions = questions.length;

var totalQs;

var currentQuestion = questions[totalQs];

var correctAnswers;


// functions that are being called by the event listeners set on the buttons

// Will be called to initiate the game and holds all of the logic necessary to display the questions 
// as well as keeping count of the users score 
function startQuiz() {
    quizCountdown();
    retryScreen.style.display= "none";
    homeScreen.style.display = "none";
    gameScreen.style.display = "block";
    totalQs = 0;
    correctAnswers= 0;
    showQuestions();
};

function emptyQuestions() {
    gameScreen.innerHTML = "";
};


// Contains all of the logic for the game to display the questions in the gameScreen div
function showQuestions() {
    emptyQuestions();
    currentQuestion = questions[totalQs];
    var pos = totalQs + 1;
    displayQuestion.textContent = "Question " + pos + " out of " + numOfQuestions;
    var genQuestion = document.createElement("h2");
    genQuestion.textContent = currentQuestion.question;
    gameScreen.appendChild(genQuestion);
    showQuestionChoices();
};

// contains all of the logic for the game to display the choices on the gameScreen div
function showQuestionChoices() {
    for (let i = 0; i < currentQuestion.choices.length; i++) {
        var genChoice = document.createElement("button");
        genChoice.setAttribute("class", "choiceStyle");
        genChoice.setAttribute("data-value", currentQuestion.choices[i]);
        genChoice.textContent = currentQuestion.choices[i];
        gameScreen.appendChild(genChoice);
    }
};

function compareAnswers(chosenAnswer) {
    if (chosenAnswer === currentQuestion.answer) {
        correctAnswers++;
        totalQs++;
        playOrEnd();
    }
    else {
        totalQs++;
        playOrEnd();
    }
};

function playOrEnd() {
    if (totalQs === numOfQuestions) {
        endGame();
    }
    else { 
        showQuestions();
    }
};


// Will be called at the end of the game once the timer hits 0 or if all question are answered to create 
// save the users score as well as show them a list of high scores
// and to ask them if they would like to play again

function endGame() {
    gameScreen.style.display="none";
    statScreen.style.display="flex";
    timerEl.textContent = "90";
    scoreDiv.textContent= "You scored " + correctAnswers + " out of " + numOfQuestions;
};

// This function will initiate the countdown. If a user clicks a question that has the id of wrong then the timer will
// lose 10 seconds

function quizCountdown() {
    
    var timeLeft = 90;

    var timeDown = setInterval(function() {

        if (timeLeft > 1|| timeLeft === 1) {

            timerEl.textContent = timeLeft;

            timeLeft--
        }
        else {
            timerEl.textContent = "";

            clearInterval(timeDown);

            endGame();
        }
        
    }, 1000);
};


// event listeners put on the buttons that will allow the game to reset or the user to return to the home screen
startButton.addEventListener('click', function() {
    console.log("BOOM HEADSHOT!");
    startQuiz();
});

gameScreen.addEventListener("click", function(e) {
    e.preventDefault();
    console.log("IT WORKS!!!");
    if(e.target.matches("button")) {
        var chosenAnswer = e.target.getAttribute("data-value");
        compareAnswers(chosenAnswer);
    }
});
