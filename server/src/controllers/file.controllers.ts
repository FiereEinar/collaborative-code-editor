import path from 'path';
import asyncHandler from 'express-async-handler';
import appAssert from '../errors/appAssert';
import { languagesID } from '../constants/languages';
import { createFileSchema } from '../utils/schemas/file.schema';
import { BAD_REQUEST, OK } from '../constants/http';
import {
	createFile,
	getExecutionResult,
	getExecutionToken,
	getUserFiles,
} from '../services/file.services';

export const fileExecutionHandler = asyncHandler(async (req, res) => {
	const { filename, content, stdin } = req.body;

	appAssert(content, BAD_REQUEST, 'Content cannot be empty');
	appAssert(filename, BAD_REQUEST, 'Filename cannot be empty');

	const tokenRequest = await getExecutionToken(
		content,
		languagesID[path.extname(filename).replace('.', '')],
		stdin
	);

	appAssert(tokenRequest.token, BAD_REQUEST, 'Error in execution');

	let output = await getExecutionResult(tokenRequest.token);

	res.status(OK).json({ output: output });
});

export const createFileHandler = asyncHandler(async (req, res) => {
	const userID = req.userID;
	const request = createFileSchema.parse(req.body);

	const file = createFile(request, userID.toString());

	res.status(OK).json({ message: 'success', file });
});

export const getUserFilesHandler = asyncHandler(async (req, res) => {
	const userID = req.userID;

	const files = await getUserFiles(userID.toString());

	res.status(OK).json({ files });
});
