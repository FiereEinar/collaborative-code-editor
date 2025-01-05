import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { PORT } from './constants/env';
import { errorHandler } from './middleware/errorHandler';

import fileRouter from './routers/file.router';

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

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
