import Editor from '@monaco-editor/react';
import { Button } from './components/ui/button';
import api from '@/api/axios';
import { useEffect, useState } from 'react';
import { languages } from './constants/languages';
import Sidebar from './components/Sidebar';
import OutputTerminal from './components/OutputTerminal';
import { outputSchema } from './lib/validations/output.schema';
import { z } from 'zod';
import { socket } from './socket';
import { useNavigate } from 'react-router-dom';
import { setNavigate } from './lib/navigate';

function App() {
	const navigate = useNavigate();
	setNavigate(navigate);

	const [data, setData] = useState<string>('');
	const [output, setOutput] = useState<z.infer<typeof outputSchema>>();
	const [filename, setFilename] = useState('app.js');

	const filenameArr = filename.split('.');
	const extName = filenameArr[filenameArr.length - 1];

	const onChange = (value: string | undefined) => {
		// if (value) setData(value);
		socket.emit('typing', {
			content: value,
			project: filename,
			userID: '677a3747bad4adf7eaa975e3',
		});
	};

	socket.on('text_update', (data) => {
		console.log('Received update');
		setData(data.content);
	});

	// socket.on('someone_joined', () => {
	// 	socket.emit('typing', {
	// 		content: data,
	// 		project: filename,
	// 		userID: '677a3747bad4adf7eaa975e3',
	// 	});
	// })

	useEffect(() => {
		socket.emit('join_room', {
			content: '',
			project: filename,
			userID: '677a3747bad4adf7eaa975e3',
		});
	}, [filename]);

	const handleSubmit = async () => {
		try {
			const { data: result } = await api.post('/file/execute', {
				filename: filename,
				content: data,
			});

			setOutput(result.output as z.infer<typeof outputSchema>);
		} catch (error: any) {
			console.error(error.response.data.message);
		}
	};

	return (
		<main className='overflow-hidden'>
			<div className='flex overflow-hidden'>
				<Sidebar />
				<div className='w-full overflow-hidden'>
					<div className='bg-vscode p-2 text-white border-b flex justify-between items-center'>
						<div className='flex gap-2'>
							<p>{filename}</p>
							<input
								className='bg-vscode'
								onChange={(e) => setFilename(e.target.value)}
								type='text'
								value={filename}
							/>
						</div>
						<Button onClick={handleSubmit} size='sm' variant='secondary'>
							Run
						</Button>
					</div>
					<Editor
						height='95dvh'
						defaultLanguage={languages[extName]}
						theme='vs-dark'
						value={data}
						onChange={onChange}
					/>
				</div>
				<OutputTerminal output={output} />
			</div>
		</main>
	);
}

export default App;
