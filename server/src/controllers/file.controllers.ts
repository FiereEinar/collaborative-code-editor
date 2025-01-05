import asyncHandler from 'express-async-handler';
import appAssert from '../errors/appAssert';
import { BAD_REQUEST, OK } from '../constants/http';
import {
	getExecutionResult,
	getExecutionToken,
} from '../services/file.services';
import { languagesID } from '../constants/languages';
import path from 'path';
import { createFileSchema } from '../utils/schemas/file.schema';

export const handleFileExecution = asyncHandler(async (req, res) => {
	const { filename, content } = req.body;

	appAssert(content, BAD_REQUEST, 'Content cannot be empty');
	appAssert(filename, BAD_REQUEST, 'Filename cannot be empty');

	const tokenRequest = await getExecutionToken(
		content,
		languagesID[path.extname(filename).replace('.', '')]
	);

	appAssert(tokenRequest.token, BAD_REQUEST, 'Error in execution');

	let output = await getExecutionResult(tokenRequest.token);

	res.status(OK).json({ output: output });
});

export const createFile = asyncHandler(async (req, res) => {
	const request = createFileSchema.parse(req.body);

	res.status(OK).json({ message: 'success', data: request });
});
