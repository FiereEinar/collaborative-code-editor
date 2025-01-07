import mongoose from 'mongoose';
import { SessionDocument } from './session.model';

export interface UserDocument extends mongoose.Document {
	_id: mongoose.Types.ObjectId;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	session: mongoose.Types.ObjectId | SessionDocument;
	omitPassword(): Omit<UserDocument, 'password'>;
}

const UserSchema = new mongoose.Schema<UserDocument>(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		session: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Session',
			index: true,
		},
	},
	{ timestamps: true }
);

UserSchema.methods.omitPassword = function () {
	const userCopy = this.toObject();
	delete userCopy.password;
	return userCopy;
};

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
