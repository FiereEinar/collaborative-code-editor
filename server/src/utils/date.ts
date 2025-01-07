export const ONE_MINUTE = 60 * 1000;
export const FIFTEEN_MINUTES = ONE_MINUTE * 15;
export const ONE_DAY = ONE_MINUTE * 60 * 24;
export const THIRTY_DAYS = ONE_DAY * 30;

export const thirtyDaysFromNow = () => new Date(Date.now() + THIRTY_DAYS);
export const fifteenMinutesFromNow = () =>
	new Date(Date.now() + FIFTEEN_MINUTES);
