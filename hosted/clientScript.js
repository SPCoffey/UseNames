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
	
	socket.on('updatePopular', (data) => {
		updatePopular(data.popular);
	});
};

const handleMessage = (data) => {
	document.querySelector("#intro").innerHTML = intros[Math.floor((Math.random() * intros.length))];
	document.querySelector("#response").innerHTML = data.name;
};

const updatePopular = (popular) => {
	document.querySelector("#popNames").innerHTML = "";
	for (var i = 0; i < popular.length; i++)
	{
		document.querySelector("#popNames").innerHTML += popular[i] + "<br>";
	}
};

const requestNames = () => {
	socket.emit('requestNames', null);
};

const likeName = () => {
	socket.emit('like', null);
};

const init = () => {
	connectSocket();
	socket.emit('requestNames', null);
	document.querySelector("#request").addEventListener('click', requestNames);
	document.querySelector("#like").addEventListener('click', likeName);
};

window.onload = init;