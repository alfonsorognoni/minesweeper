import Minesweeper from './minesweeper.js';
const game = new Minesweeper();
const modal = document.getElementById('modal');

const startButton = document.getElementById('btn-start');
const closeModal = document.getElementById('close');
startButton.addEventListener('click', event => {
    event.preventDefault();
    modal.style.display = 'none';
    game.start();
})
const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', event => {
    event.preventDefault();
    modal.style.display = 'none';
    game.start();
})
closeModal.addEventListener('click', event => {
    event.preventDefault();
    modal.style.display = 'none';
})