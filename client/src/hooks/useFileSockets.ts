import { socket } from '@/socket';
import { useDebounce } from './useDebounce';
import { useEffect } from 'react';
import { useCurrentOpenFileStore } from '@/store/useCurrenOpenFileStore';
import { useUserStore } from '@/store/userStore';

export function useFileSockets() {
	const user = useUserStore((state) => state.user);
	const { file, setFile } = useCurrentOpenFileStore((state) => state);
	const debouncedContent = useDebounce(file?.content || '');

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
			userID: user?._id,
		});
	}, [file?.filename]);
}
