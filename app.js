var playerTurn = true; // true = player 1, false = player 2
var player1CurrentScore = 0;
var player2CurrentScore = 0;
var player1TotalScore = 0;
var player2TotalScore = 0;

var player1CurrentScoreUI = document.getElementById("player1-current-score");
var player2CurrentScoreUI = document.getElementById("player2-current-score");
var player1TotalScoreUI = document.getElementById("player1-total-score");
var player2TotalScoreUI = document.getElementById("player2-total-score");
var playerTurnText = document.getElementById("playerTurnText");
var player1NameUI = document.getElementById("player1Name");
var player2NameUI = document.getElementById("player2Name");

var diceImg = document.querySelector("img");

var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");

player1.classList.toggle("active");

var player1Name = "";
var player2Name = "";
inputName();

function inputName() {
    name1 = prompt("Enter Player 1 Name : ");
    name2 = prompt("Enter Player 2 Name : ");
    player1Name = name1;
    player2Name = name2;
    player1NameUI.textContent = player1Name;
    player2NameUI.textContent = player2Name;
}

function generateNumber() {
    var diceNUmber = Math.floor(Math.random() * 6) + 1;
    console.log(diceNUmber);
    diceImg.src = "./assets/" + diceNUmber + ".png";

    if (diceNUmber == 1) {
        if (playerTurn) {
            player1CurrentScore = 0;
            player1CurrentScoreUI.textContent = player1CurrentScore;
            playerTurn = false;
            playerTurnText.textContent = `${player2Name} Turn`;
            player1.classList.toggle("active");
            player2.classList.toggle("active");
            return
        }
        else {
            player2CurrentScore = 0;
            player2CurrentScoreUI.textContent = player2CurrentScore;
            playerTurn = true;
            playerTurnText.textContent = `${player1Name} Turn`;
            player1.classList.toggle("active");
            player2.classList.toggle("active");
            return;
        }
    }

    if (playerTurn) {
        player1CurrentScore += diceNUmber;
        player1CurrentScoreUI.textContent = player1CurrentScore;
    }
    else {
        player2CurrentScore += diceNUmber;
        player2CurrentScoreUI.innerText = player2CurrentScore;

    }



}


function resetGame() {
    inputName();
    playerTurn = true;
    player1CurrentScore = 0;
    player2CurrentScore = 0;
    player1TotalScore = 0;
    player2TotalScore = 0;
    player1CurrentScoreUI.textContent = player1CurrentScore;
    player2CurrentScoreUI.textContent = player2CurrentScore;
    player1TotalScoreUI.textContent = player1TotalScore;
    player2TotalScoreUI.textContent = player2TotalScore;
    playerTurnText.textContent = `${player1Name} Turn`;
    player1.classList.toggle("active");
    player2.classList.toggle("active");
}

function AddPlayerScore() {

    if (playerTurn) {
        player1TotalScore += player1CurrentScore;
        player1CurrentScore = 0;
        player1TotalScoreUI.textContent = player1TotalScore;
        player1CurrentScoreUI.textContent = player1CurrentScore;
        playerTurn = false;
        playerTurnText.textContent = `${player2Name} Turn`;
        console.log(player2Name);
        player1.classList.toggle("active");
        player2.classList.toggle("active");
    }
    else {
        player2TotalScore += player2CurrentScore;
        player2CurrentScore = 0;
        player2TotalScoreUI.textContent = player2TotalScore;
        player2CurrentScoreUI.textContent = player2CurrentScore;
        playerTurn = true;
        playerTurnText.textContent = `${player1Name} Turn`;
        player1.classList.toggle("active");
        player2.classList.toggle("active");
    }

    if (player1TotalScore >= 10) {
        alert(`${player1Name} Wins!`);
        resetGame();
    }
    else if (player2TotalScore >= 10) {
        alert(`${player2Name} Wins!`);
        resetGame();
    }
}