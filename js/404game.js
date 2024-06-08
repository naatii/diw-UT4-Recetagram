// js/404game.js

import { initializeEyes, moveEye, preventOverlap, isHit } from './eyeMovement.js';
import { initializeScore, updateScore } from './score.js';
import { teleportEye } from './teleport.js';

document.addEventListener('DOMContentLoaded', () => {
    const eye1 = document.getElementById('eye1');
    const eye2 = document.getElementById('eye2');
    const pupil1 = eye1.querySelector('.pupil');
    const pupil2 = eye2.querySelector('.pupil');
    const target = document.getElementById('target');
    const gameArea = document.getElementById('gameArea');

    let mouseX = 0;
    let mouseY = 0;
    let score = 0;

    initializeScore(gameArea, score);

    gameArea.addEventListener('mousemove', (e) => {
        mouseX = e.clientX - gameArea.offsetLeft;
        mouseY = e.clientY - gameArea.offsetTop;

        // Move eyes
        moveEye(eye1, pupil1, mouseX, mouseY, gameArea);
        moveEye(eye2, pupil2, mouseX, mouseY, gameArea);

        // Prevent overlap
        preventOverlap(eye1, eye2, gameArea);

        // Check for eye collision
        if (isHit(mouseX, mouseY, eye1, gameArea) || isHit(mouseX, mouseY, eye2, gameArea)) {
            score -= 0.5;
            updateScore(score);
        }
    });

    gameArea.addEventListener('click', (e) => {
        const clickX = e.clientX - gameArea.offsetLeft;
        const clickY = e.clientY - gameArea.offsetTop;

        target.style.left = `${clickX - 5}px`;
        target.style.top = `${clickY - 5}px`;
        target.style.display = 'block';

        setTimeout(() => {
            target.style.display = 'none';
        }, 200);

        if (isHit(clickX, clickY, eye1, gameArea)) {
            score += 10;
            updateScore(score);
            teleportEye(eye1, clickX, clickY, gameArea);
        }

        if (isHit(clickX, clickY, eye2, gameArea)) {
            score += 10;
            updateScore(score);
            teleportEye(eye2, clickX, clickY, gameArea);
        }
    });
});
