import { fileSchema } from '@/lib/validations/file.schema';
import api from './axios';
import { File } from '@/types/file';

export const fetchUserFiles = async () => {
	try {
		const { data } = await api.get(`/file`);

		if (data.files && data.files.length > 0) {
			fileSchema.parse(data.files[0]);
		}

		return (data.files as File[]) || [];
	} catch (error: any) {
		console.error('Recieved a wrong data for a file', error);
		throw error;
	}
};
