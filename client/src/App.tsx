import Editor from '@monaco-editor/react';
import { Button } from './components/ui/button';
import { api } from './api/axios';
import { useEffect, useState } from 'react';
import { languages } from './constants/languages';
import Sidebar from './components/Sidebar';
import OutputTerminal from './components/OutputTerminal';
import { outputSchema } from './lib/validations/outputSchema';
import { z } from 'zod';
import { socket } from './socket';

function App() {
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

	useEffect(() => {
		socket.emit('join_room', {
			content: '',
			project: filename,
			userID: '677a3747bad4adf7eaa975e3',
		});
	}, []);

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
						<p>{filename}</p>
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
