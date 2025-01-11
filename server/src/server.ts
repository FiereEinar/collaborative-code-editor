import { createServer } from 'http';
import { Server } from 'socket.io';
import app, { corsOpts } from './app';
import { connectToDatabase } from './database/mongoose';
import { NODE_ENV, PORT } from './constants/env';
import dotenv from 'dotenv';
import { initializeSockets } from './socket';
dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: corsOpts,
});

initializeSockets(io);

httpServer.listen(Number(PORT), '0.0.0.0', async () => {
	console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV}`);
	await connectToDatabase();
});
