import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface FileDocument extends mongoose.Document {
	_id: mongoose.Types.ObjectId;
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
		content: { type: String },
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	},
	{ timestamps: true }
);

const FileModel = mongoose.model<FileDocument>('File', FileSchema);

export default FileModel;
