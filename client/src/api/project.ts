import api from './axios';

export const fetchUserFiles = async () => {
	try {
		const { data } = await api.get(`/file`);
	} catch (error: any) {}
};
