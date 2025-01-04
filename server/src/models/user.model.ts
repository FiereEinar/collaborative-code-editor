import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new mongoose.Schema<UserDocument>(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model<UserDocument>('User', UserSchema);
