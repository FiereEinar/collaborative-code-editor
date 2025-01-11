import { useCurrentOpenFileStore } from '@/store/useCurrenOpenFileStore';
import { Editor } from '@monaco-editor/react';
import CodeEditorHeader from './CodeEditorHeader';
import { getFileLanguage } from '@/lib/utils';
import { useFileSockets } from '@/hooks/useFileSockets';

export default function CodeEditor() {
	const { file, setFile, isSubmitting } = useCurrentOpenFileStore(
		(state) => state
	);

	const onChange = (value: string | undefined) => {
		if (!file) return;
		setFile({ ...file, content: value || '' });
	};

	useFileSockets();

	return (
		<div
			className={`${
				(!file || isSubmitting) && 'pointer-events-none'
			} w-full overflow-hidden h-dvh`}
		>
			<CodeEditorHeader />
			{file?.filename && (
				<Editor
					height='100%'
					defaultLanguage={getFileLanguage(file.filename)}
					theme='vs-dark'
					value={file?.content}
					onChange={onChange}
				/>
			)}
		</div>
	);
}
