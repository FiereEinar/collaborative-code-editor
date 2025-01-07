import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { JWT_REFRESH_KEY, JWT_SECRET_KEY } from '../constants/env';
import { SessionDocument } from '../models/session.model';
import { UserDocument } from '../models/user.model';

export type AccessTokenPayload = {
	sessionID: SessionDocument['_id'];
	userID: UserDocument['_id'];
};

export type RefreshTokenPayload = {
	sessionID: SessionDocument['_id'];
};

export type SignOptionsAndSecret = SignOptions & {
	secret: string;
};

export const accessTokenOptions: SignOptionsAndSecret = {
	expiresIn: '15m',
	secret: JWT_SECRET_KEY,
};

export const refreshTokenOptions: SignOptionsAndSecret = {
	expiresIn: '30d',
	secret: JWT_REFRESH_KEY,
};

export const signToken = (
	payload: AccessTokenPayload | RefreshTokenPayload,
	options?: SignOptionsAndSecret
) => {
	const { secret, ...opts } = options || accessTokenOptions;
	const token = jwt.sign(payload, secret, opts);
	return token;
};

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
	token: string,
	options?: VerifyOptions & { secret: string }
) => {
	const { secret, ...opts } = options || { secret: JWT_SECRET_KEY };
	try {
		const payload = jwt.verify(token, secret, opts) as TPayload;
		return { payload };
	} catch (error: any) {
		return { error: error.message };
	}
};
