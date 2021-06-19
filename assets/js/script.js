var startButton = document.getElementById("start");

var retryButton = document.getElementById("retry");

var homeButton = document.getElementById("home");

var homeScreen = document.getElementById("init-div");

var gameScreen = document.getElementById("game-div");

var retryScreen = document.getElementById("retry-div");



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




// functions that are being called by the event listeners set on the buttons
function startQuiz() {
    homeScreen.style.display = "none";    

   endGame();
};

function endGame() {
    retryScreen.style.display="flex";
};

function returnHome() {
    retryScreen.style.display="none";
    
    homeScreen.style.display= "flex";
}