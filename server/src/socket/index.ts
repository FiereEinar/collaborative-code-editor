import { Server } from 'socket.io';
import FileModel from '../models/file.model';

const userPreviousRooms: { [key: string]: string } = {};

export const initializeSockets = (io: Server) => {
	io.on('connection', (socket) => {
		const id = socket.id;

		console.log('A user connected with id: ', id);

		socket.on('typing', async (data) => {
			console.log(`User ${id} is typing...`);
			console.log(data);

			await FileModel.findByIdAndUpdate(data.fileID, { content: data.content });

			io.to(data.project).emit('text_update', data);
		});

		socket.on('join_room', (data) => {
			// leave the previous room for this socket
			socket.leave(userPreviousRooms[socket.id]);
			// join the project
			socket.join(data.project);
			// record the project
			userPreviousRooms[socket.id] = data.project;

			console.log(`User ${data.userID} joined the room ${data.project}`);
		});

		socket.on('exit_room', () => {
			socket.leave(userPreviousRooms[socket.id]);
			userPreviousRooms[socket.id] = '';
		});

		socket.on('disconnect', () => {
			console.log('A user disconnected with id: ', id);
		});
	});
};
