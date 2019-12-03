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
        cells.forEach((element, index) => {
            element.addEventListener('click', event => {
                event.preventDefault();
                if (!event.target.classList.contains('flag')) {
                    event.target.classList.add('clicked');
                    this.checkMine(event.target, index, true);
                }
            });

            element.addEventListener('contextmenu', event => {
                event.preventDefault();
                event.target.classList.add('flag')
            });
        });
    }

    checkMine(cell, index, clicked, stop=false) {
        const cells = this.container.querySelectorAll('.cell');
        if (clicked) {
            if (cell.innerHTML === '*') {
                alert('BOOOM!');
                return false;
            }

        } else if(cell.firstElementChild.innerHTML !== '*' && !clicked && !stop) {
            cell.firstElementChild.classList.add('clicked');
        }  else if(cell.firstElementChild.innerHTML === '*' && !clicked) {
            stop = true;
        }

        const previous = Array.from(cells).slice(index-4, index);
        const next = Array.from(cells).slice(index+1, cells.length)

        for (let index = 0; index < next.length; index++) {
            const element = next[index];
            if (element.firstElementChild.innerHTML !== '*') {
                element.firstElementChild.classList.add('clicked');
            }
        }

        previous.reverse();
        for (let index = 0; index < previous.length; index++) {
            const element = previous[index];
            if (element.firstElementChild.innerHTML !== '*') {
                element.firstElementChild.classList.add('clicked');
            }
        }
    }
}
export default Minesweeper;