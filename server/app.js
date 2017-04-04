const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');
const nameGen = require('./nameGen.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const index = fs.readFileSync(`${__dirname}/../hosted/index.html`);
const cssFile = fs.readFileSync(`${__dirname}/../hosted/clientStyle.css`);
const scriptFile = fs.readFileSync(`${__dirname}/../hosted/clientScript.js`);
const starImg = fs.readFileSync(`${__dirname}/../hosted/star.png`);
const yellStarImg = fs.readFileSync(`${__dirname}/../hosted/yellowStar.png`);

const onRequest = (request, response) => {
  switch (request.url) {
    case '/clientStyle.css':
      response.writeHead(200, { 'Content-Type': 'text/css' });
      response.write(cssFile);
      break;

    case '/clientScript.js':
      response.writeHead(200, { 'Content-Type': 'text/babel' });
      response.write(scriptFile);
      break;
	  
	case '/star.png':
      response.writeHead(200, { 'Content-Type': 'image/png' });
      response.write(starImg);
      break;
	  
	case '/yellowStar.png':
      response.writeHead(200, { 'Content-Type': 'image/png' });
      response.write(yellStarImg);
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

var popular = [];

const onJoined = (sock) => {
  const socket = sock;
  socket.on('join', () => {
    socket.join('room1');
	socket.emit('updatePopular', { popular });
  });

  socket.on('requestNames', () => {
    const name = nameGen.randomName();
	socket.lastName = name;
    socket.emit('response', { name });
  });
  
  socket.on('like', () => {
    if (popular.indexOf(socket.lastName) === -1)
	{
		popular.unshift(socket.lastName);
		if (popular.length > 20)
		{
			popular.splice(19, popular.length - 19);
		}
		socket.emit('updatePopular', { popular });
	}
  });
};

io.sockets.on('connection', (socket) => {
  onJoined(socket);
});
