"use strict";

let socket;

var intros = ['Your new username is:', 'Consider:', 'From now on you shall be:', 'Maybe it\'s best if you don\'t use:', 'Try this one:', 'Your new username is:', 'Your new username is:'];

const connectSocket = (e) => {
	socket = io.connect();
	
	socket.on('connect', () => {
		console.log("connecting");
		socket.emit('join', null);
	});
	
	socket.on('response', (data) => {
		handleMessage(data);
	});
};

const handleMessage = (data) => {
	document.querySelector("#intro").innerHTML = intros[Math.floor((Math.random() * intros.length))];
	document.querySelector("#response").innerHTML = data.names;
};

const requestNames = () => {
	socket.emit('requestNames', null);
};

const init = () => {
	connectSocket();
	socket.emit('requestNames', null);
	document.querySelector("#request").addEventListener('click', requestNames);;
};

window.onload = init;