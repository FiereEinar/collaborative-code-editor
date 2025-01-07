import asyncHandler from 'express-async-handler';
import { loginSchema, signupSchema } from '../utils/schemas/auth.schema';
import { createUser, loginUser } from '../services/auth.services';
import { CREATED, OK } from '../constants/http';
import { setAuthCookies } from '../utils/cookie';

export const signupHandler = asyncHandler(async (req, res) => {
	const request = signupSchema.parse(req.body);

	const user = await createUser(request);

	res.status(CREATED).json(user);
});

export const loginHandler = asyncHandler(async (req, res) => {
	const request = loginSchema.parse(req.body);

	const { accessToken, refreshToken } = await loginUser(request);

	setAuthCookies(res, accessToken, refreshToken);

	res.status(OK).json({ message: 'Login successfull' });
});
