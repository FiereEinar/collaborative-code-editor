import { z } from 'zod';

export const createFileSchema = z.object({
	filename: z.string().min(1).max(50),
	// content: z.string(),
});

export const executeFileSchema = z.object({
	filename: z.string().min(1).max(50),
	content: z.string().min(1),
	stdin: z.string().optional(),
});
