import { createServer } from 'http';
import { Server, ServerOptions } from 'socket.io';
import app, { corsOpts } from './app';
import { connectToDatabase } from './database/mongoose';
import { NODE_ENV, PORT } from './constants/env';
import dotenv from 'dotenv';
dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: corsOpts,
});

io.on('connection', (socket) => {
	const id = socket.id;

	console.log('A user connected with id: ', id);

	socket.on('typing', (data) => {
		console.log(`User ${id} is typing...`);
		console.log(data);

		io.to(data.project).emit('text_update', data);
	});

	socket.on('join_room', (data) => {
		socket.join(data.project);
		console.log(`User ${data.userID} joined the room ${data.project}`);
	});

	socket.on('disconnect', () => {
		console.log('A user disconnected with id: ', id);
	});
});

httpServer.listen(Number(PORT), '0.0.0.0', async () => {
	console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV}`);
	await connectToDatabase();
});
