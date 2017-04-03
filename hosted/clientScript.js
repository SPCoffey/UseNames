"use strict";

let socket;

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
	document.querySelector("#response").innerHTML = data.names;
};

const requestNames = () => {
	socket.emit('requestNames', null);
};

const init = () => {
	connectSocket();
	document.querySelector("#request").addEventListener('click', requestNames);;
};

window.onload = init;