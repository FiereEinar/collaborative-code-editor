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
import FileModel from '../models/file.model';

export const handleFileExecution = asyncHandler(async (req, res) => {
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

	const file = await FileModel.create({
		...request,
		owner: userID,
		content: '',
	});

	res.status(OK).json({ message: 'success', file });
});

export const getUserFiles = asyncHandler(async (req, res) => {
	const userID = req.userID;

	const userFiles = await FileModel.find({ owner: userID }).exec();

	res.status(OK).json({ files: userFiles });
});
