import { z } from 'zod';

const outputStatus = {
	description: z.string(),
	id: z.number(),
};

export const outputSchema = z.object({
	compile_output: z.string().optional(),
	memory: z.number(),
	message: z.string().optional(),
	status: z.object(outputStatus),
	stderr: z.string().optional(),
	stdout: z.string().optional(),
	time: z.string(),
	token: z.string(),
});
