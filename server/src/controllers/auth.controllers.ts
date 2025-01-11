import asyncHandler from 'express-async-handler';
import { loginSchema, signupSchema } from '../utils/schemas/auth.schema';
import { createUser, loginUser } from '../services/auth.services';
import { CREATED, FORBIDDEN, OK, UNAUTHORIZED } from '../constants/http';
import { accessTokenCookieOpts, setAuthCookies } from '../utils/cookie';
import {
	appAccessCookieName,
	AppErrorCode,
	appRefreshCookieName,
} from '../constants';
import appAssert from '../errors/appAssert';
import {
	refreshTokenOptions,
	RefreshTokenPayload,
	signToken,
	verifyToken,
} from '../utils/jwt';
import UserModel from '../models/user.model';
import SessionModel from '../models/session.model';
import { ObjectId } from 'mongoose';

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

	const { error, payload } = verifyToken(accessToken);
	appAssert(payload, UNAUTHORIZED, error, AppErrorCode.InvalidAccessToken);

	const user = await UserModel.findById(payload.userID);
	appAssert(user, UNAUTHORIZED, 'No user', AppErrorCode.InvalidAccessToken);

	const session = await SessionModel.findById(payload.sessionID);
	appAssert(
		session,
		UNAUTHORIZED,
		'Invalid session',
		AppErrorCode.InvalidAccessToken
	);

	res.status(OK).json(user.omitPassword());
});

export const refreshHandler = asyncHandler(async (req, res) => {
	const refreshToken = req.cookies[appRefreshCookieName];
	console.log('refresh token: ', refreshToken);
	appAssert(refreshToken, UNAUTHORIZED, 'Unauthorized');
	console.log('refresh hit');
	const { error, payload } = verifyToken<RefreshTokenPayload>(
		refreshToken,
		refreshTokenOptions
	);
	appAssert(payload, UNAUTHORIZED, error);

	const session = await SessionModel.findById(payload.sessionID);
	appAssert(session, UNAUTHORIZED, 'No session found');

	const now = Date.now();

	if (session.expiresAt.getTime() < now) {
		await session.deleteOne();
		res.status(UNAUTHORIZED).json({ message: 'Invalid session' });
		return;
	}

	const newAccessToken = signToken({
		sessionID: session._id,
		userID: session.userID,
	});

	res.cookie(appAccessCookieName, newAccessToken, accessTokenCookieOpts());

	res.status(OK).json({ message: 'Refreshed' });
});
