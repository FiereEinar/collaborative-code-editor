import { z } from 'zod';

const emailSchema = z.string().email().min(1, 'Email required').max(100);
const passwordSchema = z.string().min(1, 'Password required').max(100);

export const signupSchema = z
	.object({
		email: emailSchema,
		password: passwordSchema,
		confirmPassword: z.string().min(1, 'Password required').max(100),
		username: z.string().min(1, 'Username required').max(100),
	})
	.refine((values) => values.password === values.confirmPassword, {
		message: 'Password must match',
		path: ['confirmPassword'],
	});

export type SignupBody = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export type LoginBody = z.infer<typeof loginSchema>;
