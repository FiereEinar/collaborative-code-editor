import Editor from '@monaco-editor/react';
import { Button } from './components/ui/button';
import { api } from './api/axios';
import { useState } from 'react';

function App() {
	const [data, setData] = useState<string | undefined>(undefined);

	const onChange = (value: string | undefined) => {
		setData(value);
	};

	const handleSubmit = async () => {
		try {
			const { data: result } = await api.post('/', { data: data });

			console.log(result);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<main>
			<h1 className='text-red-500'>Hello World!</h1>
			<Editor
				height='90vh'
				defaultLanguage='javascript'
				theme='vs-dark'
				defaultValue='// some comment \n\n const x = 1;\n console.log(x);'
				onChange={onChange}
			/>
			<Button onClick={handleSubmit}>Submit</Button>
		</main>
	);
}

export default App;
