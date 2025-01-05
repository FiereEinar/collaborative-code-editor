import { CONFLICT } from '../constants/http';
import appAssert from '../errors/appAssert';
import User from '../models/user.model';
import { SignupBody } from '../utils/schemas/auth.schema';

export const createUser = async (data: SignupBody) => {
	const existingUser = await User.findOne({ email: data.email }).exec();
	appAssert(!existingUser, CONFLICT, 'Email already in use');

	const user = await User.create(data);

	return {
		user: user.omitPassword(),
	};
};
