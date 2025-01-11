import api from '@/api/axios';
import InputField from '../InputField';
import ErrorText from '../ui/error';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { z } from 'zod';
import { signupSchema } from '@/lib/validations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema) });
	const navigate = useNavigate();

	const onSubmit = async (formData: SignupFormValues) => {
		try {
			await api.post('/auth/signup', formData);

			navigate('/login');
		} catch (error: any) {
			console.error('Error submitting form', error);
			setError('root', { message: error.message || error });
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
			<InputField
				register={register}
				error={errors.username?.message}
				name='username'
				type='username'
				label='Username:'
			/>
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
			<InputField
				register={register}
				error={errors.confirmPassword?.message}
				name='confirmPassword'
				type='password'
				label='Confirm password:'
			/>
			<Link
				to='/login'
				className='text-xs italic text-muted-foreground underline'
			>
				Login
			</Link>
			{errors.root?.message && <ErrorText>{errors.root.message}</ErrorText>}
			<div className='flex justify-end'>
				<Button disabled={isSubmitting}>Submit</Button>
			</div>
		</form>
	);
}
