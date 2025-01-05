const getEnv = (key: string, defaultValue?: string): string => {
	const value = process.env[key];
	if (value === undefined) {
		if (defaultValue === undefined) {
			throw new Error(`Missing required env var: ${key}`);
		}
		return defaultValue;
	}
	return value;
};

export const PORT = getEnv('PORT', '3000');
export const NODE_ENV = getEnv('NODE_ENV', 'development');
export const JUDGE_API = getEnv('JUDGE_API');
