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

var displayChoices = document.getElementById("game-choices")

var numOfQuestions = questions.length;

var totalQs;

var currentQuestion;

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
    showQuestion();
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
    var question = document.createElement("h2");
    question.textContent = currentQuestion.question;
    gameScreen.appendChild(question);
    displayQuestionChoices();
};

// contains all of the logic for the game to display the choices on the gameScreen div
function showQuestionChoices() {
    for (let i = 0; i < currentQuestion.choices.length; i++) {
        var choice = document.createElement("h4");
        choice.setAttribute("class", "choiceStyle");
        choice.setAttribute("data-value", currentQuestion.choices[i]);
        choice.textContent = currentQuestion.choices[i];
        gameScreen.appendChild(choice);
    }
};

function compareAnswers(chosenAnswer) {
    if (chosenAnswer === currentQuestion.answer) {
        correctAnswers++;
        counter++;
        playOrEnd();
    }
    else {
        counter++;
        playOrEnd();
    }
};

function playOrEnd() {
    if (counter === numOfQuestions) {
        // showStats();
    }
    else { 
        displayQuestion();
    }
};

// function showStats() {
//     gameScreen.style.display 
// }

// Will be called at the end of the game once the timer hits 0 or if all question are answered to create 
// save the users score as well as show them a list of high scores
// and to ask them if they would like to play again
function endGame() {
    gameScreen.style.display="none";
    retryScreen.style.display="flex";

    timerEl.textContent = "10";
};


// Will be run when the user clicks the main screen button in the end game function
// It will return the user back to the main screen, resetting timer and questions as well as displaying the initial div
function returnHome() {
    retryScreen.style.display="none";
    
    homeScreen.style.display= "flex";
};

// This function will initiate the countdown. If a user clicks a question that has the id of wrong then the timer will
// lose 10 seconds

function quizCountdown() {
    
    var timeLeft = 10;

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

retryButton.addEventListener("click", function() {
    startQuiz();
});

homeButton.addEventListener("click", function () { 
    returnHome();
});

gameScreen.addEventListener("click", function(e) {
    if(e.target.matches("h4")) {
        var chosenAnswer = e.target.getAttribute("data-value");
        compareAnswers(chosenAnswer);
    }
});
