import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionDocument extends mongoose.Document {
	_id: mongoose.Types.ObjectId;
	userID: mongoose.Types.ObjectId | UserDocument;
	createdAt: Date;
	updatedAt: Date;
	expiresAt: Date;
}

const SessionSchema = new mongoose.Schema<SessionDocument>(
	{
		userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
		expiresAt: { type: Date, required: true },
	},
	{ timestamps: true }
);

const SessionModel = mongoose.model<SessionDocument>('Session', SessionSchema);

export default SessionModel;
