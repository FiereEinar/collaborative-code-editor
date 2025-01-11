import appAssert from '../errors/appAssert';
import AppError from '../errors/appError';
import UserModel from '../models/user.model';
import SessionModel from '../models/session.model';
import { AppErrorCode } from '../constants';
import { Response } from 'express';
import { thirtyDaysFromNow } from '../utils/date';
import { LoginBody, SignupBody } from '../utils/schemas/auth.schema';
import { CONFLICT, NOT_FOUND, UNAUTHORIZED } from '../constants/http';
import {
	refreshTokenOptions,
	RefreshTokenPayload,
	signToken,
	verifyToken,
} from '../utils/jwt';

export const createUser = async (data: SignupBody) => {
	const existingUser = await UserModel.findOne({ email: data.email }).exec();
	appAssert(!existingUser, CONFLICT, 'Email already in use');

	const user = await UserModel.create(data);

	return {
		user: user.omitPassword(),
	};
};

export const loginUser = async (data: LoginBody) => {
	const user = await UserModel.findOne({ email: data.email }).exec();
	appAssert(user, NOT_FOUND, 'Incorrect email');

	appAssert(
		user.password === data.password,
		UNAUTHORIZED,
		'Incorrect password'
	);

	const session = await SessionModel.create({
		expiresAt: thirtyDaysFromNow(),
		userID: user._id,
	});

	const accessToken = signToken({ userID: user._id, sessionID: session._id });
	const refreshToken = signToken(
		{ sessionID: session._id },
		refreshTokenOptions
	);

	return {
		user: user.omitPassword(),
		accessToken,
		refreshToken,
	};
};

export const checkAuthentication = async (accessToken: string) => {
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

	return { user };
};

export const refreshAuthentication = async (
	res: Response,
	refreshToken: string
) => {
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
		throw new AppError(UNAUTHORIZED, 'Invalid session');
	}

	const newAccessToken = signToken({
		sessionID: session._id,
		userID: session.userID,
	});

	return { newAccessToken };
};
