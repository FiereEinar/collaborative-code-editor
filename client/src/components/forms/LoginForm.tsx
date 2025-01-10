import InputField from '../InputField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations/auth.schema';
import { z } from 'zod';
import { Button } from '../ui/button';
import api from '@/api/axios';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { userSchema } from '@/lib/validations/user.schema';
import { User } from '@/types/user';
import ErrorText from '../ui/error';

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
	const setUser = useUserStore((state) => state.setUser);
	const navigate = useNavigate();

	const onSubmit = async (formData: LoginFormValues) => {
		try {
			const { data } = await api.post('/auth/login', formData);

			console.log('Login result: ', data);
			const parsedUser = userSchema.parse(data.user);

			console.log('parsed user: ', parsedUser);
			setUser(parsedUser as unknown as User);
			navigate('/');
		} catch (error: any) {
			console.error('Error submitting form', error);
			setError('root', { message: error.message || error });
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
			<InputField
				register={register}
				error={errors.email?.message}
				name='email'
				type='email'
				label='Email:'
			/>
			<InputField
				register={register}
				error={errors.password?.message}
				name='password'
				type='password'
				label='Password:'
			/>
			{errors.root?.message && <ErrorText>{errors.root.message}</ErrorText>}
			<div className='flex justify-end'>
				<Button disabled={isSubmitting}>Submit</Button>
			</div>
		</form>
	);
}
