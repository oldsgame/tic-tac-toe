/*
# posições no jogo
0 1 2
3 4 5
6 7 8

# posições que vencem e seus números correspondentes em binário e decimal, respectivamente.
0 1 2 = 111000000 = 448
3 4 5 = 000111000 = 56
6 7 8 = 000000111 = 7
0 3 6 = 100100100 = 292
1 4 7 = 010010010 = 146
2 5 8 = 001001001 = 73
0 4 8 = 100010001 = 273
2 4 6 = 001010100 = 84
empate = 111111111 = 511

# lógica para testar os valores que vencem
const ref = '';
const victory = [448, 56, 7, 292, 146, 73, 273, 84];

victory.some((value) => (value & ref === value));

# lógica para preencher as posições de cada jogador
const ref = '000000000';
ref[position] = '1';

*/

(function() {
    const DRAW_VALUE = 511

    let player1 = true;
    let stop = false;
    const victoryNumbers = [448, 56, 7, 292, 146, 73, 273, 84];
    let positions1 = '000000000'.split(''); // 9 positions. From 0 to 8.
    let positions2 = '000000000'.split('');
    const winnerMessage = document.getElementById('winnerMessage');
    const currentPlayer = document.getElementById('currentPlayer');
    const buttonNewGame = document.getElementById('buttonNewGame');

    currentPlayer.innerHTML = 'Jogador atual: '  + (player1 ? '☕' : '☘️');

    function handleClick() {
        if (stop || !!this.innerHTML) {
            return;
        }

        const position = parseInt(this.id);

        let currentPositions = player1 ? positions1 : positions2;
        currentPositions[position] = '1';

        this.innerHTML = player1 ? '☕' : '☘️';

        checkResult(positions1, positions2, this.innerHTML);

        player1 = !player1;

        currentPlayer.innerHTML = 'Jogador atual: ' + (player1 ? '☕' : '☘️');

        if(stop) {
            buttonNewGame.style.display = 'block';
        }
    }

    function checkResult(positions1, positions2, currentPlayer) {
        let playerPositions = player1 ? positions1 : positions2;
        const refValue = parseInt(playerPositions.join(''), 2);

        const hasWinner = victoryNumbers.some((value) => (value & refValue) === value);

        if (hasWinner) {
            winnerMessage.innerHTML = currentPlayer + ' venceu!';
            stop = true;
        }
        else
        {
            const binPositions1 = parseInt(positions1.join(''), 2);
            const binPositions2 = parseInt(positions2.join(''), 2);

            const isDraw = ((binPositions1 | binPositions2) === DRAW_VALUE);

            if (isDraw)
            {
                winnerMessage.innerHTML = ' Empate!';
                stop = true;
            }
        }
    }

    buttonNewGame.onclick = () => {
        stop = false;
        player1 = true;
        positions1 = '000000000'.split('');
        positions2 = '000000000'.split('');
        currentPlayer.innerHTML = 'Jogador atual: ' + (player1 ? '☕' : '☘️');
        winnerMessage.innerHTML = '';
        buttonNewGame.style.display = 'none';

        document.querySelectorAll('td').forEach(celula => {
            celula.innerHTML = '';
        });
    };

  function bindEvents(cell) {
    cell.onclick = handleClick;
  }

  document.querySelectorAll('td').forEach(bindEvents);
})();
