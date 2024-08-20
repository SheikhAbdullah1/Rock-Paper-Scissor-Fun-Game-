// Game variables to store user and computer scores, as well as the points needed to win
let userScore = 0;
let compScore = 0;
let pointsToWin = 3;

// Querying DOM elements for game logic
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const startPopup = document.querySelector("#start-popup");
const pointsButtons = document.querySelectorAll(".points-btn");
const resetBtn = document.querySelector("#reset-btn");

// Function to randomly generate the computer's choice
const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
};

// Function to handle a draw
const drawGame = () => {
    msg.innerText = "It's a Draw! Try Again!";
    msg.style.backgroundColor = "#081b31";
};

// Function to update the message and scores when a winner is determined
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lose! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }

    // Checking if the game has reached the win condition
    if (userScore === pointsToWin) {
        msg.innerText = "You Won the Game!";
        msg.style.backgroundColor = "blue";
        setTimeout(resetGame, 2000);
    } else if (compScore === pointsToWin) {
        msg.innerText = "Robot Wins the Game!";
        msg.style.backgroundColor = "orange";
        setTimeout(resetGame, 2000);
    }
};

// Function to play the game based on user selection
const playGame = (userChoice) => {
    const compChoice = genCompChoice();

    // Logic to handle a draw or determine a winner
    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin;
        if (userChoice === "rock") userWin = compChoice === "scissors";
        else if (userChoice === "paper") userWin = compChoice === "rock";
        else userWin = compChoice === "paper";
        showWinner(userWin, userChoice, compChoice);
    }
};

// Adding event listeners to user choice buttons
choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const userChoice = choice.id;
        playGame(userChoice);
    });
});

// Adding event listeners to points selection buttons
pointsButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        pointsToWin = parseInt(event.target.getAttribute("data-points"));
        startPopup.style.display = "none";
        msg.innerText = "Game Started!";
        msg.style.backgroundColor = "#081b31";
    });
});

// Function to reset the game
const resetGame = () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Game Reset. Start Again!";
    msg.style.backgroundColor = "#081b31";
    startPopup.style.display = "flex";
};

// Adding event listener to reset button
resetBtn.addEventListener("click", resetGame);
