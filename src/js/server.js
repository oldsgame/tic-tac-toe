var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var playerIds = 0;
var currentPlayer = 0;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    playerIds += 1;
    socket.emit('new player', playerIds);

    if (2 == playerIds)
    {
        currentPlayer = 1;
        io.emit('game can start', currentPlayer);
    }

    socket.on('new play', function(cellId, player) {
        if (1 == player) {
            currentPlayer = 2;
        } else {
            currentPlayer = 1;
        }
        io.emit('new play', cellId, currentPlayer);
    });
});

http.listen(3000, function() {
    console.log('listening on *: 3000');
});