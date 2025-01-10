import { BAD_REQUEST } from '../constants/http';
import AppError from '../errors/appError';
import FileModel from '../models/file.model';
import { CreateFileRequest } from '../types/file';
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
		throw new AppError(BAD_REQUEST, 'Unsupported language detected');
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

			setTimeout(() => {}, 1000);
		}
	} catch (error) {
		throw new AppError(BAD_REQUEST, 'Failed to execute code');
	}
};
