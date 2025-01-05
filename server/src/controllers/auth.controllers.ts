import asyncHandler from 'express-async-handler';
import { signupSchema } from '../utils/schemas/auth.schema';
import { createUser } from '../services/auth.services';
import { CREATED } from '../constants/http';

export const signupHandler = asyncHandler(async (req, res) => {
	const request = signupSchema.parse(req.body);

	const user = await createUser(request);

	res.status(CREATED).json(user);
});

export const loginHandler = asyncHandler(async (req, res) => {});
