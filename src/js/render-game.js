const currentPlayerMessageEl = document.getElementById('currentPlayerMessage');
const winnerMessageEl = document.getElementById('winnerMessage');
const buttonNewGameEl = document.getElementById('buttonNewGame');

function getIcon(isPlayer1, mode, isStartBot) {
    if (mode === 'H2B') {
        if (isPlayer1) {
            return isStartBot ? '🤖' : '👦';
        } else {
            return isStartBot ? '👦' : '🤖';
        }
    } else {
        return isPlayer1 ? '☕' : '☘️';
    }
}

export default function render({ isPlayer1, isEndgame, isStartBot, board1, board2, winner, mode }) {
    // Current player message
    currentPlayerMessageEl.innerHTML = 'Proximo a jogar: ' + getIcon(isPlayer1, mode, isStartBot);

    // Board
    for (let i = 8; i >= 0; --i) {
        let pos = 1 << i;
        let text = '';

        if (board1 & pos) {
            text = getIcon(true, mode, isStartBot);
        } else if (board2 & pos) {
            text = getIcon(false, mode, isStartBot);
        }

        document.getElementById((8 - i).toString()).innerHTML = text;
    }

    // Winner message
    let winnerMessage = '';
    if (winner == '1') {
        winnerMessage = getIcon(true, mode, isStartBot) + ' Venceu!';
    } else if (winner == '2') {
        winnerMessage = getIcon(false, mode, isStartBot) + ' Venceu!';
    } else if (winner == 'TIE') {
        winnerMessage = 'Empate!';
    }
    winnerMessageEl.innerHTML = winnerMessage;

    // Button new game
    buttonNewGameEl.style.display = isEndgame ? 'block' : 'none';
}
