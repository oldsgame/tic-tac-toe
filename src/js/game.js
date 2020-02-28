import render from './render-game.js';

export default function createGame() {
    const state = {
        mode: 'H2H',
        board1: 0,
        board2: 0,
        isPlayer1: true,
        isEndgame: false,
        isStartBot: false,
        winner: null
    };

    function setMode(mode) {
        resetBoard();

        state.mode = mode;
        state.isStartBot = false;

        render(state);
    }

    function restart() {
        resetBoard();

        if (state.mode === 'H2B') {
            state.isStartBot = !state.isStartBot;

            if (state.isStartBot) {
                playBot();
            }
        }

        render(state);
    }

    function resetBoard() {
        state.board1 = 0;
        state.board2 = 0;
        state.isPlayer1 = true;
        state.isEndgame = false;
        state.winner = null;
    }

    function play(id, isBot = false) {
        if (state.isEndgame) {
            return false;
        }

        const board = state.board1 | state.board2;
        const position = 256 >> id;

        // if is a legal move
        if ((board & position) ^ position) {
            state[state.isPlayer1 ? 'board1' : 'board2'] |= position;
            state.isPlayer1 = !state.isPlayer1;

            state.winner = checkResult(state.board1, state.board2);
            state.isEndgame = state.winner !== null;

            if (state.mode === 'H2B' && !isBot) {
                playBot();
            }
        } else {
            return false;
        }

        render(state);

        return true;
    }

    function playBot() {
        if (state.isEndgame) {
            return;
        }

        let move = null;
        let { board1, board2 } = state;
        let board = board1 | board2;
        let bestScore = state.isPlayer1 ? -Infinity : Infinity;

        for (let i = 8; i >= 0; --i) {
            let position = 1 << i;

            if ((board & position) ^ position) {
                if (state.isPlayer1) {
                    board1 |= position;
                    const score = minimax(board1, board2, false);
                    board1 &= ~position;

                    if (score > bestScore) {
                        bestScore = score;
                        move = 8 - i;
                    }
                } else {
                    board2 |= position;
                    const score = minimax(board1, board2, true);
                    board2 &= ~position;

                    if (score < bestScore) {
                        bestScore = score;
                        move = 8 - i;
                    }
                }
            }
        }

        play(move, true);
    }

    function checkResult(board1, board2) {
        /*
        # Game positions
        0 1 2
        3 4 5
        6 7 8

        0 1 2 = 111000000 = 448
        3 4 5 = 000111000 = 56
        6 7 8 = 000000111 = 7
        0 3 6 = 100100100 = 292
        1 4 7 = 010010010 = 146
        2 5 8 = 001001001 = 73
        0 4 8 = 100010001 = 273
        2 4 6 = 001010100 = 84
        TIE   = 111111111 = 511
        */
        const VICTORY_NUMBERS = [448, 56, 7, 292, 146, 73, 273, 84];
        const TIE_VALUE = 511;

        const player1Win = VICTORY_NUMBERS.some(value => (value & board1) === value);
        const player2Win = VICTORY_NUMBERS.some(value => (value & board2) === value);
        let result = null;

        if (player1Win || player2Win) {
            result = player1Win ? '1' : '2';
        } else if ((board1 | board2) === TIE_VALUE) {
            result = 'TIE';
        }

        return result;
    }

    function minimax(board1, board2, isMax) {
        const result = checkResult(board1, board2);
        if (result !== null) {
            if (result === '1') {
                return 100;
            } else if (result === '2') {
                return -100;
            } else {
                return 0;
            }
        }

        if (isMax) {
            let bestScore = -Infinity;
            let board = board1 | board2;

            for (let i = 8; i >= 0; --i) {
                let position = 1 << i;

                if ((board & position) ^ position) {
                    board1 |= position;
                    let score = minimax(board1, board2, false);
                    board1 &= ~position;
                    bestScore = Math.max(score, bestScore);
                }
            }

            return bestScore;
        } else {
            let bestScore = Infinity;
            let board = board1 | board2;

            for (let i = 8; i >= 0; --i) {
                let position = 1 << i;

                if ((board & position) ^ position) {
                    board2 |= position;
                    let score = minimax(board1, board2, true);
                    board2 &= ~position;
                    bestScore = Math.min(score, bestScore);
                }
            }

            return bestScore;
        }
    }

    return {
        state,
        setMode,
        restart,
        play,
        render
    };
}
