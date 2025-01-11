import { fetchUserFiles } from '@/api/file.api';
import { QUERY_KEYS } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import ErrorText from './ui/error';
import { useCurrentOpenFileStore } from '@/store/useCurrenOpenFileStore';

export default function ProjectList() {
	const { file: currentFile, setFile } = useCurrentOpenFileStore(
		(state) => state
	);
	const {
		data: files,
		isLoading,
		error,
	} = useQuery({
		queryKey: [QUERY_KEYS.USER_PROJECTS],
		queryFn: fetchUserFiles,
	});

	if (isLoading) {
		return (
			<p className='text-xs text-muted-foreground italic'>Loading files...</p>
		);
	}

	if (error) {
		return <ErrorText>Failed to load files</ErrorText>;
	}

	return (
		<section className='flex flex-col gap-1 justify-start items-start text-muted-foreground'>
			{!files || files.length === 0 ? (
				<p className='text-xs text-muted-foreground italic'>No files yet</p>
			) : (
				files.map((file) => (
					<button
						className={`border px-2 py-1 w-full text-start rounded-md ${
							file.filename === currentFile?.filename && 'text-white'
						}`}
						onClick={() => setFile(file)}
						key={file._id}
					>
						{file.filename}
					</button>
				))
			)}
		</section>
	);
}
