import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

import { CLIENT_ORIGIN } from './constants/env';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFound';

import fileRouter from './routers/file.router';
import authRouter from './routers/auth.router';

export const corsOpts: CorsOptions = {
	origin: CLIENT_ORIGIN,
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

export default app;
