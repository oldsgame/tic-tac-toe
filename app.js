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

# lógica para testar os valores que vencem
const ref = '';
const victory = [448, 56, 7, 292, 146, 73, 273, 84];

victory.some((value) => (value & ref === value));

# lógica para preencher as posições de cada jogador
const ref = '000000000';
ref[position] = '1';

*/

(function() {
    let player1 = true;
    let stop = false;
    const victoryNumbers = [448, 56, 7, 292, 146, 73, 273, 84];
    let positions1 = '000000000'.split(''); // 9 positions. From 0 to 8.
    let positions2 = '000000000'.split('');
    const winnerMessage = document.getElementById('winnerMessage');

    function handleClick(celula) {
        if (stop) {
            return;
        }

        const position = parseInt(celula.id);

        let currentPositions = player1 ? positions1 : positions2;
        currentPositions[position] = '1';

        celula.innerHTML = player1 ? "☕" : "☘️";

        checkWinner(currentPositions, celula.innerHTML);

        player1 = !player1;
    }

    function checkWinner(playerPositions, currentPlayer) {
        const refValue = parseInt(playerPositions.join(''), 2);
        const hasWinner = victoryNumbers.some((value) => (value & refValue) === value);

        if (hasWinner) {
            winnerMessage.innerHTML = currentPlayer + ' venceu!';
            stop = true;
        }
    }

  function bindEvents(cell) {
    cell.onclick = handleClick;
  }

  document.querySelectorAll('td').forEach(bindEvents);
})();
