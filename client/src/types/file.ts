import { outputSchema } from '@/lib/validations/output.schema';
import { z } from 'zod';

export type File = {
	_id: string;
	filename: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	owner: string;
	partners: string[];
};

export type FileOutput = z.infer<typeof outputSchema>;
