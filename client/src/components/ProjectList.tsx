import { fetchUserFiles } from '@/api/project';
import { QUERY_KEYS } from '@/constants';
import { useQuery } from '@tanstack/react-query';

export default function ProjectList() {
	const {} = useQuery({
		queryKey: [QUERY_KEYS.USER_PROJECTS],
		queryFn: fetchUserFiles,
	});

	return (
		<section>
			<p>No files yet</p>
		</section>
	);
}
