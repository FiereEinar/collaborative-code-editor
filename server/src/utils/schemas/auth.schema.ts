import { z } from 'zod';

export const signupSchema = z
	.object({
		username: z.string().min(1, 'Username required').max(100),
		email: z.string().email().min(1, 'Email required').max(100),
		password: z.string().min(1, 'Password required').max(100),
		confirmPassword: z.string().min(1, 'Password required').max(100),
	})
	.refine((values) => values.password === values.confirmPassword, {
		message: 'Password must match',
		path: ['confirmPassword'],
	});

export type SignupBody = z.infer<typeof signupSchema>;
