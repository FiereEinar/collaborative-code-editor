import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

import { NODE_ENV, PORT } from './constants/env';
import { errorHandler } from './middleware/errorHandler';

import fileRouter from './routers/file.router';
import authRouter from './routers/auth.router';

import { connectToDatabase } from './database/mongoose';
import { notFoundHandler } from './middleware/notFound';

export const corsOpts: CorsOptions = {
	origin: 'http://localhost:5173',
	credentials: true,
};

const app = express();
app.use(cors(corsOpts));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/auth', authRouter);
app.use('/file', fileRouter);

app.use(notFoundHandler);
app.use(errorHandler);

// app.listen(Number(PORT), '0.0.0.0', async () => {
// 	console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV}`);
// 	await connectToDatabase();
// });

export default app;
