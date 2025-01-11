import { CookieOptions, Response } from 'express';
import { appAccessCookieName, appRefreshCookieName } from '../constants';
import { NODE_ENV } from '../constants/env';
import { fifteenMinutesFromNow, thirtyDaysFromNow } from './date';

export const REFRESH_PATH = '/auth/refresh';

export const defaultCookieOpts: CookieOptions = {
	secure: NODE_ENV === 'production' ? true : false,
	sameSite: NODE_ENV === 'production' ? 'strict' : 'lax',
	httpOnly: true,
};

export const accessTokenCookieOpts = (): CookieOptions => ({
	...defaultCookieOpts,
	expires: fifteenMinutesFromNow(),
});

export const refreshTokenCookieOpts = (): CookieOptions => ({
	...defaultCookieOpts,
	expires: thirtyDaysFromNow(),
	path: REFRESH_PATH,
});

export const setAuthCookies = (
	res: Response,
	accessToken: string,
	refreshToken: string
) =>
	res
		.cookie(appAccessCookieName, accessToken, accessTokenCookieOpts())
		.cookie(appRefreshCookieName, refreshToken, refreshTokenCookieOpts());

export const clearAuthCookies = (res: Response) =>
	res
		.clearCookie(appAccessCookieName)
		.clearCookie(appRefreshCookieName, { path: REFRESH_PATH });
