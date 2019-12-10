document.addEventListener("DOMContentLoaded", (event) => {
    game.init(document.querySelector('#game'));

    document.querySelector('#restart').addEventListener("click", (e) => {
        game.init(document.querySelector('#game'))
    })
});

const game = {
    board: ['', '', '', '', '', '', '', '', ''],
    gameContainer: null,
    winSequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    turn: {
        turnIndex: 1,
        change() { this.turnIndex = this.turnIndex === 0 ? 1 : 0 }
    },
    scoreboard: {
        player1: 0,
        player2: 0,
        registerWin(player) {
            if (player === 1) {
                this.player1 += 1
            } else if (player === 0) {
                this.player2 += 1
            }
        },
        fill(){
            containerScoreboard = document.querySelector('#scoreboard > div');
            let html = '<div>Player 1</div>' +
                        '<div>Player 2</div>' +
                        '<div>' + game.scoreboard.player1 + '</div>' +
                        '<div>' + game.scoreboard.player2 + '</div>';
            containerScoreboard.innerHTML = html;
        }
    },
    init(container) {
        this.gameContainer = container;
        this.scoreboard.player1 = 0;
        this.scoreboard.player2 = 0;
        this.start();
    },
    start() {
        this.board.fill('');
        this.turnIndex = 1;
        game.write();
    },
    write() {
        let html = '';
        this.board.forEach((x, i) => {
            html += '<div onclick="game.play(' + i + ')">' + x + '</div>';
        });
        this.gameContainer.innerHTML = html;

        this.scoreboard.fill();
    },
    play(pos) {
        if (this.board[pos] === '') {
            const turn = this.turn.turnIndex;
            this.board[pos] = turn === 1 ? 'X' : 'O';
            game.write();
            if (!this.checkDraw()) {
                if (!this.checkWin()) {
                    game.turn.change();
                } else {
                    this.scoreboard.registerWin(this.turn.turnIndex);
                    game.gameover();
                }
            } else {
                game.gameover();
            }
        }
    },
    checkWin() {
        gameover = false;
        this.winSequences.forEach(sequence => {
            const turnSymbol = game.turn.turnIndex === 1 ? 'X' : 'O';
            if (
                this.board[sequence[0]] === turnSymbol &&
                this.board[sequence[1]] === turnSymbol &&
                this.board[sequence[2]] === turnSymbol
            )
                gameover = true;
        });
        return gameover;
    },
    checkDraw() {
        let draw = true;
        this.board.forEach(pos => {
            if (pos === '')
                draw = false
        });
        return draw;
    },
    gameover() {
        setTimeout(() => {
            this.start();
        }, 1000);
    }
}