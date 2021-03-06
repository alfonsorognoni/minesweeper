class Minesweeper {
    constructor() {
        this.board = [
            {"mine":false},{"mine":true},{"mine":true},{"mine":false},
            {"mine":false},{"mine":true},{"mine":false},{"mine":false},
            {"mine":false},{"mine":false},{"mine":false},{"mine":false}
        ]
        this.container = document.getElementById('board');
        this.drawBoard = this.drawBoard.bind(this);
        this.time = 0;
        this.timer;
    }

    start() {
        // CLEAR BOARD
        document.getElementById('board').innerHTML = '';
        document.getElementById('time').innerHTML = `Time: 0`;
        this.time = 0;

        // START
        this.shuffleBoard();
        this.drawBoard();
        this.listenCells();
        this.timer = setInterval(() => {
            this.time += 1;
            document.getElementById('time').innerHTML = `Time: ${this.time}`;
        }, 1000);
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
            cell.firstElementChild.dataset.mine = false;

            if (element.mine) {
                cell.innerHTML = '<div>💣</div>';
                cell.firstElementChild.dataset.mine = true;
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
                    this.checkWin();
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
            if (cell.dataset.mine === 'true') {
                cell.classList.add('clicked');
                this.showModal(false);
                return false;
            }
        } else if(cell.firstElementChild.dataset.mine !== 'true' && !clicked && !stop && !cell.firstElementChild.classList.contains('flag')) {
            cell.firstElementChild.classList.add('clicked');
        }  else if(cell.firstElementChild.dataset.mine && !clicked) {
            stop = true;
        }

        const previous = Array.from(cells).slice(index-4, index);
        const next = Array.from(cells).slice(index+1, cells.length)

        for (let index = 0; index < next.length; index++) {
            const element = next[index];
            if (element.firstElementChild.dataset.mine !== 'true' && !element.firstElementChild.classList.contains('flag')) {
                element.firstElementChild.classList.add('clicked');
            } else {
                index = next.length
            }
        }

        previous.reverse();
        for (let index = 0; index < previous.length; index++) {
            const element = previous[index];
            if (element.firstElementChild.dataset.mine !== 'true' && !element.firstElementChild.classList.contains('flag')) {
                element.firstElementChild.classList.add('clicked');
            } else {
                index = previous.length
            }
        }
    }

    checkWin() {
        const cells = this.container.querySelectorAll('.cell');
        const cellClickeds = this.container.querySelectorAll('.cell .clicked');        
        if (cellClickeds.length === cells.length-3) {
            this.showModal(true);
        }
    }

    showModal(win) {
        const modal = document.getElementById('modal');
        if (win) {
            const html = `<p>You win</p>`;
            document.getElementById('modal-body').innerHTML = html;
        } else {
            const html = `<p>BOOM!!</p>`;
            document.getElementById('modal-body').innerHTML = html;
        }
        modal.style.display = 'block';
        clearInterval(this.timer);

    }
}
export default Minesweeper;