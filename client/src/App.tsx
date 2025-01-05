import Editor from '@monaco-editor/react';
import { Button } from './components/ui/button';
import { api } from './api/axios';
import { useEffect, useState } from 'react';
import { languages } from './constants/languages';

function App() {
	const [data, setData] = useState<string>('console.log("Hello World");');
	const [filename, setFilename] = useState('app.js');

	const filenameArr = filename.split('.');
	const extName = filenameArr[filenameArr.length - 1];

	const onChange = (value: string | undefined) => {
		if (value) setData(value);
	};

	const handleSubmit = async () => {
		try {
			const { data: result } = await api.post('/file', {
				filename: filename,
				content: data,
			});

			console.log(result);
		} catch (error: any) {
			console.error(error.response.data.message);
		}
	};

	// useEffect(() => {

	// }, [filename])

	return (
		<main>
			<div>
				<label htmlFor='filename'>Filename: </label>
				<input
					id='filename'
					type='text'
					value={filename}
					onChange={(e) => setFilename(e.target.value)}
				/>
			</div>
			<Editor
				height='90vh'
				defaultLanguage={languages[extName]}
				theme='vs-dark'
				defaultValue={data}
				onChange={onChange}
			/>
			<Button onClick={handleSubmit}>Submit</Button>
		</main>
	);
}

export default App;
