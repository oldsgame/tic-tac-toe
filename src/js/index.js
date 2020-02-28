import createEventListener from './event-listener.js';
import createGame from './game.js';
import createNavigation from './navigation.js';

const navigation = createNavigation();
const game = createGame();

createEventListener(navigation, game);

navigation.to('home-page');


// client
var playerId = 1;
var currentPlayer = 0;

window.onload = function() {
    var socket = io('http://10.101.42.45:3000');
    var state;

    document.querySelectorAll('td').forEach(cell => {
        cell.addEventListener('click', () => {
            if (currentPlayer == playerId) {
                if (game.play(parseInt(cell.id))) {
                    socket.emit('new play', cell.id, playerId);
                }
            }
        });
    });

    socket.on('new player', player => {
        console.log('player id: ' + player);
        playerId = player;
    });

    socket.on('game can start', player => {
        currentPlayer = player;
    });

    socket.on('new play', (cellId, player) => {
        game.play(cellId);
        currentPlayer = player;
    });
};