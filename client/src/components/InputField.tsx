import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import ErrorText from './ui/error';

type InputFieldProps<T extends FieldValues> = {
	label: string;
	name: Path<T>;
	register: UseFormRegister<T>;
	type?: React.HTMLInputTypeAttribute;
	error?: string;
};

export default function InputField<T extends FieldValues>({
	label,
	type,
	register,
	name,
	error,
}: InputFieldProps<T>) {
	return (
		<div className='space-y-1 text-muted-foreground'>
			<Label>{label}</Label>
			<Input {...register(name)} type={type} />
			{error && <ErrorText>{error}</ErrorText>}
		</div>
	);
}
