import { z } from 'zod';

const filenameSchema = z.string().min(1).max(50);

export const createFileSchema = z.object({
	filename: filenameSchema,
});

export const fileSchema = z.object({
	filename: filenameSchema,
	_id: z.string(),
	content: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	owner: z.string(),
	partners: z.array(z.string()),
});
