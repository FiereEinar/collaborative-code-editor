import asyncHandler from 'express-async-handler';
import appAssert from '../errors/appAssert';
import { loginSchema, signupSchema } from '../utils/schemas/auth.schema';
import { accessTokenCookieOpts, setAuthCookies } from '../utils/cookie';
import { CREATED, OK, UNAUTHORIZED } from '../constants/http';
import {
	checkAuthentication,
	createUser,
	loginUser,
	refreshAuthentication,
} from '../services/auth.services';
import {
	appAccessCookieName,
	AppErrorCode,
	appRefreshCookieName,
} from '../constants';

export const signupHandler = asyncHandler(async (req, res) => {
	const request = signupSchema.parse(req.body);

	const user = await createUser(request);

	res.status(CREATED).json(user);
});

export const loginHandler = asyncHandler(async (req, res) => {
	const request = loginSchema.parse(req.body);

	const { user, accessToken, refreshToken } = await loginUser(request);

	setAuthCookies(res, accessToken, refreshToken);

	res.status(OK).json({ message: 'Login successfull', user });
});

export const authCheckHandler = asyncHandler(async (req, res) => {
	const accessToken = req.cookies[appAccessCookieName];

	appAssert(
		accessToken,
		UNAUTHORIZED,
		'No token',
		AppErrorCode.InvalidAccessToken
	);

	const { user } = await checkAuthentication(accessToken);

	res.status(OK).json(user.omitPassword());
});

export const refreshHandler = asyncHandler(async (req, res) => {
	const refreshToken = req.cookies[appRefreshCookieName];

	appAssert(refreshToken, UNAUTHORIZED, 'Unauthorized');

	const { newAccessToken } = await refreshAuthentication(res, refreshToken);

	res.cookie(appAccessCookieName, newAccessToken, accessTokenCookieOpts());

	res.status(OK).json({ message: 'Refreshed' });
});
