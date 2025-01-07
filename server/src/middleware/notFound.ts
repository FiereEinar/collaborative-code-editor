import { RequestHandler } from 'express';
import AppError from '../errors/appError';
import { NOT_FOUND } from '../constants/http';

export const notFoundHandler: RequestHandler = (req, res, next) => {
	const error = new AppError(NOT_FOUND, 'Not Found');
	next(error);
};
