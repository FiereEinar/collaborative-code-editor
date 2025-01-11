import { z } from 'zod';

const emailSchema = z.string().email().min(1).max(50);
const passwordSchema = z.string().min(1).max(50);

export const loginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export const signupSchema = z
	.object({
		email: emailSchema,
		password: passwordSchema,
		confirmPassword: passwordSchema,
		username: z.string().min(1, 'Username required').max(100),
	})
	.refine((values) => values.password === values.confirmPassword, {
		message: 'Password must match',
		path: ['confirmPassword'],
	});
