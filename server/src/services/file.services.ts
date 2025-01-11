import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../constants/http';
import AppError from '../errors/appError';
import { judgeApi } from '../utils/axios';

export const getExecutionToken = async (
	sourceCode: string,
	languageID: number
) => {
	try {
		const { data } = await judgeApi.post('/submissions/?base64_encoded=false', {
			source_code: sourceCode,
			language_id: languageID,
		});

		return data;
	} catch (error: any) {
		console.log(error);
		if (error.code === 'ECONNREFUSED') {
			throw new AppError(INTERNAL_SERVER_ERROR, 'Server compiler error');
		} else {
			throw new AppError(BAD_REQUEST, 'Unsupported language detected');
		}
	}
};

export const getExecutionResult = async (token: string) => {
	try {
		while (true) {
			const { data } = await judgeApi.get(
				`/submissions/${token}/?base64_encoded=false`
			);

			const status = data.status.id;

			if (status !== 1 && status !== 2) {
				return data;
			}

			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	} catch (error) {
		throw new AppError(INTERNAL_SERVER_ERROR, 'Failed to execute code');
	}
};
