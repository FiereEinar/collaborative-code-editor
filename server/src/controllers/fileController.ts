import asyncHandler from 'express-async-handler';
import appAssert from '../errors/appAssert';
import { BAD_REQUEST, OK } from '../constants/http';
import {
	getExecutionResult,
	getExecutionToken,
} from '../services/file.services';
import { languagesID } from '../constants/languages';
import path from 'path';

export const handleFileExecution = asyncHandler(async (req, res) => {
	const { filename, content } = req.body;

	appAssert(content, BAD_REQUEST, 'Content cannot be empty');
	appAssert(filename, BAD_REQUEST, 'Filename cannot be empty');

	console.log('Filename: ', filename);
	console.log('Filename ext: ', path.extname(filename).replace('.', ''));

	const tokenRequest = await getExecutionToken(
		content,
		languagesID[path.extname(filename).replace('.', '')]
	);

	appAssert(tokenRequest.token, BAD_REQUEST, 'Error in execution');

	let output = await getExecutionResult(tokenRequest.token);

	res.status(OK).json({ output: output });
});
