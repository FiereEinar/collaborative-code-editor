import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL);

socket.on('connect', () => {
	console.log('Connected to ws with id: ', socket.id);
	console.log('Is connected? ', socket.connected);
});

socket.on('disconnect', () => {
	console.log('Disconnected from ws');
});

export { socket };
