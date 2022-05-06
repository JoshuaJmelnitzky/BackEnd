const socket = io();

const messageForm = document.querySelector('#messages');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

const chat = document.querySelector('#chat');

const errors = document.querySelector('#errors');

messageForm.addEventListener('submit', e => {
	e.preventDefault();
	errors.innerHTML = '';

	if (!emailInput.value) {
		const error = document.createElement('p');

		error.innerText = 'Ingrese su email';
		errors.appendChild(error);
	}

	if (!messageInput.value) {
		const error = document.createElement('p');

		error.innerText = 'Ingrese su mensaje';
		errors.appendChild(error);
	}

	if (messageInput.value && emailInput.value) {
		const message = {
			email: emailInput.value,
			message: messageInput.value,
		};
		socket.emit('message', message);
		emailInput.value = '';
		messageInput.value = '';
	}
});

socket.on('message', message => {
	const template = Handlebars.compile(
		'<span style="color: blue; font-weight: 600;">{{this.email}}: </span><span style="color: red;">[{{this.date}}] </span><span style="color: green; font-style: italic;">{{this.message}}</span>'
	);
	const li = document.createElement('li');
	li.innerHTML = template(message);

	chat.appendChild(li);
});
