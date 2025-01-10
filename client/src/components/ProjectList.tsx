import { fetchUserFiles } from '@/api/file.api';
import { QUERY_KEYS } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import ErrorText from './ui/error';

export default function ProjectList() {
	const {
		data: files,
		isLoading,
		error,
	} = useQuery({
		queryKey: [QUERY_KEYS.USER_PROJECTS],
		queryFn: fetchUserFiles,
	});

	if (isLoading) {
		<section>
			<p className='text-xs text-muted-foreground italic'>Loading files...</p>
		</section>;
	}

	if (error) {
		return (
			<section>
				<ErrorText>Failed to load files</ErrorText>
			</section>
		);
	}

	return (
		<section>
			{!files || files.length === 0 ? (
				<p className='text-xs text-muted-foreground italic'>No files yet</p>
			) : (
				files.map((file) => <p key={file._id}>{file.filename}</p>)
			)}
		</section>
	);
}
