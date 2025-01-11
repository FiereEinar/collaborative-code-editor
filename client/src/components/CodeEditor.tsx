import { languages } from '@/constants/languages';
import { socket } from '@/socket';
import { useCurrentOpenFileStore } from '@/store/useCurrenOpenFileStore';
import { Editor } from '@monaco-editor/react';
import { Button } from './ui/button';
import api from '@/api/axios';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useUserStore } from '@/store/userStore';

export default function CodeEditor() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const user = useUserStore((state) => state.user);
	const { file, stdin, setFile, setOutput } = useCurrentOpenFileStore(
		(state) => state
	);
	const debouncedContent = useDebounce(file?.content || '');

	const filenameArr = file?.filename.split('.');
	let language;

	if (filenameArr) {
		language = languages[filenameArr[filenameArr.length - 1] || ''];
	}

	const onChange = (value: string | undefined) => {
		if (!file) return;

		setFile({ ...file, content: value || '' });
	};

	const handleSubmit = async () => {
		try {
			setIsSubmitting(true);
			const { data: result } = await api.post('/file/execute', {
				filename: file?.filename,
				content: file?.content,
				stdin: stdin,
			});

			console.log('Output: ', result.output);

			setOutput(result.output);
		} catch (error: any) {
			console.log(error);
			console.error(error.message);
			setOutput({
				memory: 0,
				status: {
					description: 'Error',
					id: 69,
				},
				time: '0',
				token: '',
				message: error.message,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	socket.on('text_update', (data) => {
		if (data.userID === user?._id) return;

		console.log('Received update');
		if (!file) return;
		setFile({ ...file, content: data.content });
	});

	useEffect(() => {
		console.log('Emitting typing...');
		socket.emit('typing', {
			content: file?.content,
			fileID: file?._id,
			project: file?.filename,
			userID: user?._id,
		});
	}, [debouncedContent]);

	useEffect(() => {
		if (!file) {
			socket.emit('exit_room');
			return;
		}

		socket.emit('join_room', {
			content: '',
			project: file.filename,
			userID: '677a3747bad4adf7eaa975e3',
		});
	}, [file?.filename]);

	return (
		<div
			className={`${(!file || isSubmitting) && 'pointer-events-none'} h-dvh`}
		>
			<div className='bg-vscode p-2 text-white border-b flex justify-between items-center'>
				<div className='flex gap-2 text-muted-foreground'>
					<p>{file ? file.filename : 'No opened file'}</p>
				</div>
				<Button
					onClick={handleSubmit}
					disabled={isSubmitting}
					size='sm'
					variant='secondary'
				>
					Run
				</Button>
			</div>
			{language && (
				<Editor
					height='100%'
					defaultLanguage={language}
					theme='vs-dark'
					value={file?.content}
					onChange={onChange}
				/>
			)}
		</div>
	);
}
