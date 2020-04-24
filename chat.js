const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http)

// include assets folder
// app.use(express.static(__dirname + '/assets'));

// route
app.get('/', (req, res) => {
	// res.send('<h1>Test</h1>');
	// res.sendFile(__dirname + '/index.html');
});

// trigger on first run
io.on('connection', (socket) => {
	console.log('a user connected');
	socket.username = '';
	socket.on('message', (msg) => { // listen from emit "message"
		io.emit('message', { 'user': socket.username, 'message': msg }); // 
	});

	socket.on('join', (username) => {
		if (username != null) {
			socket.username = username;
		}
		socket.broadcast.emit('message', { joined: true, message: socket.username + ' Someone has joined' });
	});
});

http.listen(3000, () => {
	console.log('Listening')
});