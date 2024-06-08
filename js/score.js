// js/score.js

let scoreDisplay;

export function initializeScore(gameArea, initialScore) {
    scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score';
    scoreDisplay.style.position = 'absolute';
    scoreDisplay.style.top = '10px';
    scoreDisplay.style.left = '10px';
    scoreDisplay.style.color = 'black';
    scoreDisplay.style.fontSize = '24px';
    scoreDisplay.textContent = `Score: ${initialScore}`;
    gameArea.appendChild(scoreDisplay);
}

export function updateScore(score) {
    scoreDisplay.textContent = `Score: ${score}`;
}
