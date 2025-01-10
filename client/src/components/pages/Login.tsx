import LoginForm from '../forms/LoginForm';
import Heading from '../ui/heading';

export default function Login() {
	return (
		<div className='bg-vscode flex justify-center items-center h-dvh text-white'>
			<div className='flex flex-col gap-2'>
				<Heading>Login</Heading>
				<LoginForm />
			</div>
		</div>
	);
}
