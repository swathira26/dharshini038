const choiceButtons = document.querySelectorAll('.choice-btn');
const playerScoreElement = document.getElementById('player-score');
const aiScoreElement = document.getElementById('ai-score');
const resultElement = document.getElementById('result');
const historyElement = document.getElementById('history');
const resetButton = document.getElementById('reset-btn');

let playerScore = 0;
let aiScore = 0;
let gameHistory = [];

// AI makes random choice
function aiChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Determine winner
function determineWinner(player, ai) {
    if (player === ai) return 'draw';
    
    if (
        (player === 'rock' && ai === 'scissors') ||
        (player === 'paper' && ai === 'rock') ||
        (player === 'scissors' && ai === 'paper')
    ) {
        return 'player';
    } else {
        return 'ai';
    }
}

// Update game state
function updateGame(playerChoice) {
    const aiSelection = aiChoice();
    const winner = determineWinner(playerChoice, aiSelection);
    
    // Update scores
    if (winner === 'player') {
        playerScore++;
        resultElement.textContent = `You win! AI chose ${aiSelection}`;
        resultElement.style.color = '#4a6bff';
    } else if (winner === 'ai') {
        aiScore++;
        resultElement.textContent = `AI wins! It chose ${aiSelection}`;
        resultElement.style.color = '#ff4757';
    } else {
        resultElement.textContent = `Draw! Both chose ${playerChoice}`;
        resultElement.style.color = '#6c757d';
    }
    
    // Update score display
    playerScoreElement.textContent = playerScore;
    aiScoreElement.textContent = aiScore;
    
    // Add to history
    gameHistory.unshift({
        player: playerChoice,
        ai: aiSelection,
        result: winner
    });
    
    updateHistory();
    
    // Add winner animation
    if (winner !== 'draw') {
        const winnerElement = winner === 'player' ? playerScoreElement : aiScoreElement;
        winnerElement.classList.add('winner');
        setTimeout(() => winnerElement.classList.remove('winner'), 1500);
    }
}

// Update history display
function updateHistory() {
    historyElement.innerHTML = gameHistory.slice(0, 5).map(round => {
        const emojis = {
            rock: '✊',
            paper: '✋',
            scissors: '✌️'
        };
        const resultText = round.result === 'player' ? 'You won' : 
                         round.result === 'ai' ? 'AI won' : 'Draw';
        return `<div>You: ${emojis[round.player]} vs AI: ${emojis[round.ai]} - ${resultText}</div>`;
    }).join('');
}

// Reset game
function resetGame() {
    playerScore = 0;
    aiScore = 0;
    gameHistory = [];
    playerScoreElement.textContent = '0';
    aiScoreElement.textContent = '0';
    resultElement.textContent = 'Choose your move!';
    resultElement.style.color = '#333';
    historyElement.innerHTML = '';
}

// Event listeners
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        updateGame(button.dataset.choice);
    });
});

resetButton.addEventListener('click', resetGame);
