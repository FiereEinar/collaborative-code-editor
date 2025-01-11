import SignupForm from '../forms/SignupForm';
import Heading from '../ui/heading';

export default function Signup() {
	return (
		<div className='bg-vscode flex justify-center items-center h-dvh text-white'>
			<div className='flex flex-col gap-2'>
				<Heading>Signup</Heading>
				<SignupForm />
			</div>
		</div>
	);
}
