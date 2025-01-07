import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface FileDocument extends mongoose.Document {
	filename: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	owner: mongoose.Types.ObjectId | UserDocument;
	partners: (mongoose.Types.ObjectId | UserDocument)[];
}

const FileSchema = new mongoose.Schema<FileDocument>(
	{
		filename: { type: String, required: true },
		content: { type: String, required: true },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	},
	{ timestamps: true }
);

export default mongoose.model<FileDocument>('File', FileSchema);
