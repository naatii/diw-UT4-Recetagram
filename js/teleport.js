// js/teleport.js

export function teleportEye(eye, clickX, clickY, gameArea) {
    let newLeft, newTop;
    do {
        newLeft = Math.random() * (gameArea.clientWidth - eye.clientWidth);
        newTop = Math.random() * (gameArea.clientHeight - eye.clientHeight);
    } while (Math.hypot(newLeft + eye.clientWidth / 2 - clickX, newTop + eye.clientHeight / 2 - clickY) < 100);

    eye.style.left = `${newLeft}px`;
    eye.style.top = `${newTop}px`;
}
