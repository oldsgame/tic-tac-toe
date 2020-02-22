
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
	let scores = {
		MAX: 100,
		MIN: -100,
		TIE: 0
	};

	let player = {
		MAX: '☕',
		MIN: '☘️'
	}

	const DRAW_VALUE = 511

	let player1 = 'MAX';
	let player2 = 'MIN';
	let currentPlayer = player1;
	let maxTurn = true;
	let minTurn = false;

	let stop = false;
	const victoryNumbers = [448, 56, 7, 292, 146, 73, 273, 84];
	let board1 = 0;
	let board2 = 0;

	const winnerMessage = document.getElementById('winnerMessage');
	const currentPlayerHTML = document.getElementById('currentPlayer');
	const buttonNewGame = document.getElementById('buttonNewGame');
	botJoga();

	function trocaTurno() {
		currentPlayer = (currentPlayer == player1 ? player2 : player1);
		currentPlayerHTML.innerHTML = "Proximo a jogar: " + player[currentPlayer];
	}

	function updateView() {
		for(let i = 8; i >= 0; --i) {
			let pos = (1 << i);
			if((board1 & pos)) {
				document.getElementById((8-i).toString(10)).innerHTML = '☕';
			}
			if((board2 & pos)) {
				document.getElementById((8-i).toString(10)).innerHTML = '☘️';
			}
		}
	}

	function handleClick() {
		if (stop) {
			return;
		}

		let board = board1 | board2;
		const position = (256 >> parseInt(this.id));
		if((board & position) ^ position) {
			if(currentPlayer == player1) {
				board1 |= position;
			} else {
				board2 |= position; 
			}
			updateView();
			trocaTurno();			
			botJoga();
			let result = checkResult(board1, board2); 
			if (result !== null) {
				if(result !== 'TIE') {
					winnerMessage.innerHTML = player[result] + ' Venceu!';
					stop = true;
				} else {
					winnerMessage.innerHTML = 'Empate!';
				}
				buttonNewGame.style.display = 'block';
				updateView();
				return;
			}
		}
	}

	function checkResult(board1, board2) {
		let winner = null;

		const player1Win = victoryNumbers.some((value) => (value & board1) === value);
		const player2Win = victoryNumbers.some((value) => (value & board2) === value);

		if (player1Win || player2Win) { //alguem venceu
			winner = (player1Win ? player1 : player2);
		} else {
			if ((board1 | board2) === DRAW_VALUE)
			{
				return 'TIE';
			}
		}
		return winner;
	}

	buttonNewGame.onclick = () => {
		stop = false;
		player = true;
		board1 = 0;
		board2 = 0;
		winnerMessage.innerHTML = '';
		buttonNewGame.style.display = 'none';

		document.querySelectorAll('td').forEach(celula => {
			celula.innerHTML = '';
		});
	};

	function bindEvents(cell) {
		cell.onclick = handleClick;
	}

	function botJoga() {
		// O primeiro que joga é o MAX 
		let bestScore = -Infinity;
		let move;
		let board = board1 | board2;
		for(let i = 8; i >= 0; --i) {
			let pos = (1 << i);
			if((board & pos) ^ pos) {
				board1 |= pos; // Marca a posição livre
				let score = minimax(board1, board2, minTurn); // Prox turno é MIN
				board1 &= ~pos; // Desmarca a posição
				if (score > bestScore) {
					bestScore = score;
					move = pos;
				}
			}
		}
		board1 |= move; // Marca a posição de melhor score
		trocaTurno();
		updateView();
	}

	function minimax(board1, board2, isMax) {
		let result = checkResult(board1, board2);
		if (result !== null) {
			return scores[result];
		}

		if (isMax) {
			let bestScore = -Infinity;
			let board = board1 | board2;
			for(let i = 8; i >= 0; --i) {
				let pos = (1 << i);
				if((board & pos) ^ pos) {
					board1 |= pos; // Marca a posição livre
					let score = minimax(board1, board2, minTurn);
					board1 &= ~pos; // Desmarca a posição
					bestScore = Math.max(score, bestScore);
				}

			}
			return bestScore;
		} else {
			let bestScore = Infinity;
			let board = board1 | board2;
			for(let i = 8; i >= 0; --i) {
				let pos = (1 << i);
				if((board & pos) ^ pos) {
					board2 |= pos; // Marca a posição livre
					let score = minimax(board1, board2, maxTurn);
					board2 &= ~pos; // Desmarca a posição
					bestScore = Math.min(score, bestScore);
				}

			}
			return bestScore;
		}
	}

	document.querySelectorAll('td').forEach(bindEvents);
})();
