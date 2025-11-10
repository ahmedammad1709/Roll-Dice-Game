var playerTurn = true; // true = player 1, false = player 2
var player1CurrentScore = 0;
var player2CurrentScore = 0;
var player1TotalScore = 0;
var player2TotalScore = 0;
// Global match point target
var MatchPoint = 10;

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

// Ensure Player 1 starts active visually
player1.classList.add("active");
player2.classList.remove("active");

var player1Name = "";
var player2Name = "";

// Modal elements
var nameModal = document.getElementById('nameModal');
var winModal = document.getElementById('winModal');
var nameInput1 = document.getElementById('nameInput1');
var nameInput2 = document.getElementById('nameInput2');
var startGameBtn = document.getElementById('startGameBtn');
var winText = document.getElementById('winText');
var winNewGameBtn = document.getElementById('winNewGameBtn');

// Settings drawer elements
var openSettingsBtn = document.getElementById('openSettings');
var settingsOverlay = document.getElementById('settingsOverlay');
var closeSettingsBtn = document.getElementById('closeSettings');
var tabButtons = document.querySelectorAll('.side-tab-btn');
var tabSettings = document.getElementById('tab-settings');
var tabHow = document.getElementById('tab-how');
var matchPointInput = document.getElementById('matchPointInput');
var saveMatchPointBtn = document.getElementById('saveMatchPointBtn');

function openNameModal() {
    try {
        nameInput1.value = player1Name || '';
        nameInput2.value = player2Name || '';
        nameModal.classList.add('show');
    } catch(e){}
}

function closeNameModal() { try { nameModal.classList.remove('show'); } catch(e){} }

function inputName() {
    // Use themed modal instead of prompt
    openNameModal();
}

// Start Game handler
try {
    startGameBtn.onclick = function(){
        var name1 = (nameInput1.value || '').trim();
        var name2 = (nameInput2.value || '').trim();
        player1Name = name1 || 'Player 1';
        player2Name = name2 || 'Player 2';
        player1NameUI.textContent = player1Name;
        player2NameUI.textContent = player2Name;
        playerTurnText.textContent = `${player1Name} Turn`;
        closeNameModal();
    }
} catch(e){}

// Settings drawer behavior
function openSettings() { try { settingsOverlay.classList.add('show'); } catch(e){} }
function closeSettings() { try { settingsOverlay.classList.remove('show'); } catch(e){} }

try { openSettingsBtn.onclick = openSettings; } catch(e){}
try { closeSettingsBtn.onclick = closeSettings; } catch(e){}

// Tab navigation
function activateTab(tab) {
    try {
        tabButtons.forEach(function(btn){ btn.classList.toggle('active', btn.getAttribute('data-tab') === tab); });
        tabSettings.classList.toggle('hidden', tab !== 'settings');
        tabHow.classList.toggle('hidden', tab !== 'how');
    } catch(e){}
}
try {
    tabButtons.forEach(function(btn){
        btn.addEventListener('click', function(){ activateTab(btn.getAttribute('data-tab')); });
    });
} catch(e){}

// Persist and load MatchPoint
function loadMatchPoint() {
    try {
        var saved = parseInt(localStorage.getItem('matchPoint'), 10);
        if (!isNaN(saved) && saved > 0) {
            MatchPoint = saved;
        }
        if (matchPointInput) matchPointInput.value = MatchPoint;
    } catch(e){}
}

function saveMatchPoint() {
    try {
        var val = parseInt(matchPointInput.value, 10);
        if (isNaN(val) || val <= 0) {
            // simple visual feedback by shaking the input
            matchPointInput.classList.add('shake');
            setTimeout(function(){ matchPointInput.classList.remove('shake'); }, 500);
            return;
        }
        MatchPoint = val;
        localStorage.setItem('matchPoint', MatchPoint);
        // brief feedback on button
        var original = saveMatchPointBtn.textContent;
        saveMatchPointBtn.textContent = 'Saved';
        setTimeout(function(){ saveMatchPointBtn.textContent = original; }, 1000);
    } catch(e){}
}

try { saveMatchPointBtn.onclick = saveMatchPoint; } catch(e){}

function generateNumber() {
    var diceNUmber = Math.floor(Math.random() * 6) + 1;
    console.log(diceNUmber);
    diceImg.src = "./assets/" + diceNUmber + ".png";
    // dice roll animation
    diceImg.classList.add("dice-rolling");
    setTimeout(function () { diceImg.classList.remove("dice-rolling"); }, 600);

    if (diceNUmber == 1) {
        if (playerTurn) {
            player1CurrentScore = 0;
            player1CurrentScoreUI.textContent = player1CurrentScore;
            // bust shake animation on current container
            try { player1CurrentScoreUI.parentElement.classList.add("shake"); setTimeout(function(){ player1CurrentScoreUI.parentElement.classList.remove("shake"); }, 500); } catch(e){}
            playerTurn = false;
            playerTurnText.textContent = `${player2Name} Turn`;
            player1.classList.toggle("active");
            player2.classList.toggle("active");
            return
        }
        else {
            player2CurrentScore = 0;
            player2CurrentScoreUI.textContent = player2CurrentScore;
            try { player2CurrentScoreUI.parentElement.classList.add("shake"); setTimeout(function(){ player2CurrentScoreUI.parentElement.classList.remove("shake"); }, 500); } catch(e){}
            playerTurn = true;
            playerTurnText.textContent = `${player1Name} Turn`;
            player1.classList.toggle("active");
            player2.classList.toggle("active");
            return;
        }
    }

    if (playerTurn) {
        // animate number pop then add to current
        animatePopOnCurrent(diceNUmber, player1CurrentScoreUI.parentElement, function(){
            player1CurrentScore += diceNUmber;
            player1CurrentScoreUI.textContent = player1CurrentScore;
        });
    }
    else {
        animatePopOnCurrent(diceNUmber, player2CurrentScoreUI.parentElement, function(){
            player2CurrentScore += diceNUmber;
            player2CurrentScoreUI.textContent = player2CurrentScore;
        });

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
    // Set active state deterministically
    player1.classList.add("active");
    player2.classList.remove("active");
}

function AddPlayerScore() {

    if (playerTurn) {
        var addAmount = player1CurrentScore;
        if (addAmount > 0) {
            animateTransfer(addAmount, player1CurrentScoreUI, player1TotalScoreUI, function(){
                player1TotalScore += addAmount;
                player1TotalScoreUI.textContent = player1TotalScore;
                player1CurrentScore = 0;
                player1CurrentScoreUI.textContent = player1CurrentScore;
                flashTotal(player1TotalScoreUI);
                // Instant win check after score updates
                if (player1TotalScore >= MatchPoint) {
                    showWinModal(player1Name);
                }
            });
        } else {
            player1CurrentScore = 0;
            player1CurrentScoreUI.textContent = player1CurrentScore;
        }
        playerTurn = false;
        playerTurnText.textContent = `${player2Name} Turn`;
        player1.classList.toggle("active");
        player2.classList.toggle("active");
    }
    else {
        var addAmount2 = player2CurrentScore;
        if (addAmount2 > 0) {
            animateTransfer(addAmount2, player2CurrentScoreUI, player2TotalScoreUI, function(){
                player2TotalScore += addAmount2;
                player2TotalScoreUI.textContent = player2TotalScore;
                player2CurrentScore = 0;
                player2CurrentScoreUI.textContent = player2CurrentScore;
                flashTotal(player2TotalScoreUI);
                // Instant win check after score updates
                if (player2TotalScore >= MatchPoint) {
                    showWinModal(player2Name);
                }
            });
        } else {
            player2CurrentScore = 0;
            player2CurrentScoreUI.textContent = player2CurrentScore;
        }
        playerTurn = true;
        playerTurnText.textContent = `${player1Name} Turn`;
        player1.classList.toggle("active");
        player2.classList.toggle("active");
    }

    // Victory checks are handled inside the transfer animation callback
}

// Themed win modal
function showWinModal(winnerName) {
    try {
        winText.textContent = `${winnerName} Wins!`;
        winModal.classList.add('show');
    } catch(e){}
}

try {
    winNewGameBtn.onclick = function(){
        try { winModal.classList.remove('show'); } catch(e){}
        resetGame();
    }
} catch(e){}

// On page load, reset the game and open the name modal
try {
    window.addEventListener('load', function(){
        loadMatchPoint();
        resetGame();
        // Default to settings tab
        activateTab('settings');
    });
} catch(e){}

// --- Animation helpers ---
function animatePopOnCurrent(value, containerEl, afterCallback) {
    try {
        var pop = document.createElement('div');
        pop.className = 'score-pop';
        pop.textContent = '+' + value;
        containerEl.appendChild(pop);
        setTimeout(function(){
            try { containerEl.removeChild(pop); } catch(e){}
            if (typeof afterCallback === 'function') afterCallback();
        }, 700);
    } catch (e) { if (typeof afterCallback === 'function') afterCallback(); }
}

function animateTransfer(amount, fromScoreEl, toScoreEl, afterCallback) {
    try {
        var fromRect = fromScoreEl.getBoundingClientRect();
        var toRect = toScoreEl.getBoundingClientRect();
        var fly = document.createElement('div');
        fly.className = 'score-transfer';
        fly.textContent = '+' + amount;
        fly.style.left = (fromRect.left + fromRect.width/2 - 24) + 'px';
        fly.style.top = (fromRect.top + fromRect.height/2 - 12) + 'px';
        fly.style.opacity = '1';
        document.body.appendChild(fly);
        var dx = (toRect.left + toRect.width/2) - (fromRect.left + fromRect.width/2);
        var dy = (toRect.top + toRect.height/2) - (fromRect.top + fromRect.height/2);
        // animate next frame
        setTimeout(function(){
            fly.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(0.9)';
            fly.style.opacity = '0';
        }, 20);
        setTimeout(function(){
            try { document.body.removeChild(fly); } catch(e){}
            if (typeof afterCallback === 'function') afterCallback();
        }, 740);
    } catch (e) {
        if (typeof afterCallback === 'function') afterCallback();
    }
}

function flashTotal(totalEl) {
    try {
        totalEl.classList.add('flash');
        setTimeout(function(){ totalEl.classList.remove('flash'); }, 800);
    } catch(e){}
}