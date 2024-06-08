// js/eyeMovement.js

export function initializeEyes() {
    // Inicialización de los ojos si es necesario
}

export function moveEye(eye, pupil, mouseX, mouseY, gameArea) {
    const rect = eye.getBoundingClientRect();
    const eyeX = rect.left + rect.width / 2 - gameArea.offsetLeft;
    const eyeY = rect.top + rect.height / 2 - gameArea.offsetTop;
    const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
    const distance = Math.min(10, Math.hypot(mouseX - eyeX, mouseY - eyeY));

    pupil.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;

    // Prevent eyes from leaving the game area
    let newLeft = eyeX - rect.width / 2 + Math.cos(angle) * distance;
    let newTop = eyeY - rect.height / 2 + Math.sin(angle) * distance;

    if (newLeft < 0) {
        newLeft = 0;
    } else if (newLeft + rect.width > gameArea.clientWidth) {
        newLeft = gameArea.clientWidth - rect.width;
    }

    if (newTop < 0) {
        newTop = 0;
    } else if (newTop + rect.height > gameArea.clientHeight) {
        newTop = gameArea.clientHeight - rect.height;
    }

    eye.style.left = `${newLeft}px`;
    eye.style.top = `${newTop}px`;
}

export function preventOverlap(eye1, eye2, gameArea) {
    const rect1 = eye1.getBoundingClientRect();
    const rect2 = eye2.getBoundingClientRect();

    const eye1CenterX = rect1.left + rect1.width / 2;
    const eye1CenterY = rect1.top + rect1.height / 2;
    const eye2CenterX = rect2.left + rect2.width / 2;
    const eye2CenterY = rect2.top + rect2.height / 2;

    const dx = eye2CenterX - eye1CenterX;
    const dy = eye2CenterY - eye1CenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < rect1.width) {
        const overlap = rect1.width - distance;
        const angle = Math.atan2(dy, dx);

        const offsetX = Math.cos(angle) * overlap / 2;
        const offsetY = Math.sin(angle) * overlap / 2;

        const eye1NewLeft = Math.max(0, Math.min(gameArea.clientWidth - rect1.width, parseFloat(eye1.style.left) - offsetX));
        const eye1NewTop = Math.max(0, Math.min(gameArea.clientHeight - rect1.height, parseFloat(eye1.style.top) - offsetY));
        const eye2NewLeft = Math.max(0, Math.min(gameArea.clientWidth - rect2.width, parseFloat(eye2.style.left) + offsetX));
        const eye2NewTop = Math.max(0, Math.min(gameArea.clientHeight - rect2.height, parseFloat(eye2.style.top) + offsetY));

        eye1.style.left = `${eye1NewLeft}px`;
        eye1.style.top = `${eye1NewTop}px`;
        eye2.style.left = `${eye2NewLeft}px`;
        eye2.style.top = `${eye2NewTop}px`;
    }
}

export function isHit(mouseX, mouseY, eye, gameArea) {
    const rect = eye.getBoundingClientRect();
    const eyeX = rect.left + rect.width / 2 - gameArea.offsetLeft;
    const eyeY = rect.top + rect.height / 2 - gameArea.offsetTop;
    const distance = Math.hypot(mouseX - eyeX, mouseY - eyeY);
    return distance < rect.width / 2;
}
