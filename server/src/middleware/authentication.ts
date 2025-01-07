import { RequestHandler } from 'express';
import appAssert from '../errors/appAssert';
import { UNAUTHORIZED } from '../constants/http';
import { verifyToken } from '../utils/jwt';
import { appAccessCookieName, AppErrorCode } from '../constants/index';

export const authenticate: RequestHandler = (req, res, next) => {
	const accessToken = req.cookies[appAccessCookieName] as string | undefined;

	appAssert(
		accessToken,
		UNAUTHORIZED,
		'Unauthorized',
		AppErrorCode.InvalidAccessToken
	);

	const { error, payload } = verifyToken(accessToken);

	appAssert(payload, UNAUTHORIZED, error, AppErrorCode.InvalidAccessToken);

	req.userID = payload.userID;
	req.sessionID = payload.sessionID;
	next();
};
