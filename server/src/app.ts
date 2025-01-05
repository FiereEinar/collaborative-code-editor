import express from 'express';
import { PORT } from './constants/env';
import cors, { CorsOptions } from 'cors';
import axios from 'axios';

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

app.post('/', async (req, res) => {
	const { data } = req.body;

	const { data: result } = await axios.post(
		'http://192.168.1.4:2358/submissions/?base64_encoded=false',
		{
			source_code: data,
			language_id: 63,
		}
	);

	let output = null;

	while (true) {
		const { data: out } = await axios.get(
			`http://192.168.1.4:2358/submissions/${result.token}?base64_encoded=false`
		);

		const status = out.status.id;

		if (status !== 1 && status !== 2) {
			output = out;
			break;
		}

		setTimeout(() => {}, 3000);
	}

	console.log(output);
	res.status(200).json({ output: output });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
