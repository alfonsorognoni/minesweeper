class Minesweeper {
    constructor() {
        this.board = [
            {"mine":false},{"mine":true},{"mine":true},{"mine":false},
            {"mine":false},{"mine":true},{"mine":false},{"mine":false},
            {"mine":false},{"mine":false},{"mine":false},{"mine":false}
        ]
        this.container = document.getElementById('board');
        this.drawBoard = this.drawBoard.bind(this);
    }

    start() {
        this.shuffleBoard();
        this.drawBoard()
    }

    shuffleBoard() {
        const newBoard = [...this.board].sort(() => Math.random() - 0.5);
        this.board = newBoard;
    }

    drawBoard() {
        this.board.forEach(element => {
            const cell = document.createElement('div');
            cell.classList.add('cell')
            if (element.mine) {
                cell.innerHTML = '*'
            }
            this.container.appendChild(cell);
        });
    }
}
export default Minesweeper;