import { z } from 'zod';

export const userSchema = z.object({
	_id: z.string(),
	email: z.string().email(),
	createdAt: z.string(),
	updatedAt: z.string(),
});
