import { useCurrentOpenFileStore } from '@/store/useCurrenOpenFileStore';
import RunCodeButton from './buttons/RunCodeButton';

export default function CodeEditorHeader() {
	const { file } = useCurrentOpenFileStore((state) => state);

	return (
		<div className='bg-vscode p-2 text-white border-b flex justify-between items-center'>
			<p className='text-muted-foreground'>
				{file ? file.filename : 'No opened file'}
			</p>
			<RunCodeButton />
		</div>
	);
}
