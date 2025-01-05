import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { NODE_ENV, PORT } from './constants/env';
import { errorHandler } from './middleware/errorHandler';

import fileRouter from './routers/file.router';
import authRouter from './routers/auth.router';
import { connectToDatabase } from './database/mongoose';

const corsOpts: CorsOptions = {
	origin: 'http://localhost:5173',
	credentials: true,
};

const app = express();
app.use(cors(corsOpts));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/file', fileRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
	console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV}`);
	await connectToDatabase();
});

export default app;
