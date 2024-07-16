const choices = ['pierre', 'feuille', 'ciseau'];
    const playerImages = document.querySelectorAll('#contenair-jeu div:nth-child(1) img');
    const computerImage = document.querySelector('#contenair-jeu div:nth-child(3) img');
    const playerScoreElem = document.getElementById('votre-score');
    const computerScoreElem = document.getElementById('ordinateur-score');
    const playerMatchWinElem = document.getElementById('votre-manche-win');
    const computerMatchWinElem = document.getElementById('ordi-manche-win');
    const messageElem = document.getElementById('message');
    const resetButton = document.querySelector('#contenair-score div:nth-child(2)');
    const clearButton = document.querySelector('#contenair-score div:nth-child(3)');
    
    let playerScore = 0;
    let computerScore = 0;
    let playerMatchWins = 0;
    let computerMatchWins = 0;

    playerImages.forEach(img => {
        img.addEventListener('click', (event) => {
            const playerChoice = event.target.alt.toLowerCase();
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            
            computerImage.src = `./img/${computerChoice}.png`;
            computerImage.alt = computerChoice;

            const result = determineWinner(playerChoice, computerChoice);
            updateScores(result);
            displayMessage(result);
        });
    });

    resetButton.addEventListener('click', resetGame);
    clearButton.addEventListener('click', clearScores);

    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            return 'Égalité';
        }

        if (
            (playerChoice === 'pierre' && computerChoice === 'ciseau') ||
            (playerChoice === 'feuille' && computerChoice === 'pierre') ||
            (playerChoice === 'ciseau' && computerChoice === 'feuille')
        ) {
            return 'player';
        } else {
            return 'computer';
        }
    }

    function updateScores(result) {
        if (result === 'player') {
            playerScore++;
            playerScoreElem.textContent = playerScore;
        } else if (result === 'computer') {
            computerScore++;
            computerScoreElem.textContent = computerScore;
        }

        if (playerScore === 3) {
            playerMatchWins++;
            playerMatchWinElem.textContent = playerMatchWins;
            resetGame();
        } else if (computerScore === 3) {
            computerMatchWins++;
            computerMatchWinElem.textContent = computerMatchWins;
            resetGame();
        }
    }

    function displayMessage(result) {
        if (result === 'player') {
            messageElem.textContent = "Vous avez gagné cette manche!";
        } else if (result === 'computer') {
            messageElem.textContent = "Vous avez perdu cette manche!";
        } else {
            messageElem.textContent = "Égalité!";
        }
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        playerScoreElem.textContent = playerScore;
        computerScoreElem.textContent = computerScore;
        computerImage.src = './img/question.png';
        computerImage.alt = 'question';
        messageElem.textContent = "Cliquez sur une image pour jouer";
    }

    function clearScores() {
        resetGame();
        playerMatchWins = 0;
        computerMatchWins = 0;
        playerMatchWinElem.textContent = playerMatchWins;
        computerMatchWinElem.textContent = computerMatchWins;
    }