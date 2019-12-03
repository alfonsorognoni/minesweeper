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
        this.drawBoard();
        this.listenCells();
    }

    shuffleBoard() {
        const newBoard = [...this.board].sort(() => Math.random() - 0.5);
        this.board = newBoard;
    }

    drawBoard() {
        this.board.forEach(element => {
            const cell = document.createElement('div');
            cell.classList.add('cell')
            cell.innerHTML = '<div></div>'

            if (element.mine) {
                cell.innerHTML = '<div>*</div>'
            }
            this.container.appendChild(cell);
        });
    }

    listenCells() {
        const cells = this.container.querySelectorAll('.cell');
        cells.forEach(element => {
            element.addEventListener('click', event => {
                event.target.classList.add('clicked');
                this.checkMine(event.target);
            })
        });
    }

    checkMine(cell) {
        if (cell.innerHTML === '*') {
            alert('BOOOM!');
        }
    }
}
export default Minesweeper;