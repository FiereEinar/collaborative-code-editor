import { CONFLICT, NOT_FOUND, UNAUTHORIZED } from '../constants/http';
import appAssert from '../errors/appAssert';
import UserModel from '../models/user.model';
import { thirtyDaysFromNow } from '../utils/date';
import { refreshTokenOptions, signToken } from '../utils/jwt';
import { LoginBody, SignupBody } from '../utils/schemas/auth.schema';
import SessionModel from '../models/session.model';

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
