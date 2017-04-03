const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');
const nameGen = require('./nameGen.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const index = fs.readFileSync(`${__dirname}/../hosted/index.html`);
const cssFile = fs.readFileSync(`${__dirname}/../hosted/clientStyle.css`);
const scriptFile = fs.readFileSync(`${__dirname}/../hosted/clientScript.js`);

const onRequest = (request, response) => {
  switch (request.url) {
	case "/clientStyle.css":
	  response.writeHead(200, { 'Content-Type': 'text/css' });
      response.write(cssFile);
	  break;
	  
	case "/clientScript.js":
	  response.writeHead(200, { 'Content-Type': 'text/babel' });
      response.write(scriptFile);
	  break;
	  
	default:
	  response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(index);
  }
  
  response.end();
};

const app = http.createServer(onRequest).listen(port);

nameGen.initialize();

const io = socketio(app);

const onJoined = (sock) => {
  const socket = sock;
  socket.on('join', () => {
    socket.join('room1');
  });
  
  socket.on('requestNames', () => {
	let names = nameGen.randomName();
    socket.emit('response', { names });
  });
};

io.sockets.on('connection', (socket) => {
  onJoined(socket);
});
