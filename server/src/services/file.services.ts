import AppError from '../errors/appError';
import FileModel from '../models/file.model';
import { judgeApi } from '../utils/axios';
import { CreateFileRequest } from '../types/file';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../constants/http';

export const getExecutionToken = async (
	sourceCode: string,
	languageID: number,
	stdin?: string
) => {
	try {
		const { data } = await judgeApi.post('/submissions/?base64_encoded=false', {
			source_code: sourceCode,
			language_id: languageID,
			stdin: stdin,
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

export const createFile = async (
	request: CreateFileRequest,
	userID: string
) => {
	return await FileModel.create({
		...request,
		owner: userID,
		content: '',
	});
};

export const getUserFiles = async (userID: string) => {
	return await FileModel.find({ owner: userID }).exec();
};
