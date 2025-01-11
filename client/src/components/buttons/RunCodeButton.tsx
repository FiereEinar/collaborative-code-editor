import { useCurrentOpenFileStore } from '@/store/useCurrenOpenFileStore';
import { Button } from '../ui/button';
import api from '@/api/axios';

export default function RunCodeButton() {
	const { file, stdin, isSubmitting, setOutput, setIsSubmitting } =
		useCurrentOpenFileStore((state) => state);

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

	return (
		<Button
			onClick={handleSubmit}
			disabled={isSubmitting}
			size='sm'
			variant='secondary'
		>
			Run
		</Button>
	);
}
