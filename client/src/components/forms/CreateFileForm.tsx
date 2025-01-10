import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import InputField from '../InputField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileSchema } from '@/lib/validations/file.schema';
import { z } from 'zod';
import api from '@/api/axios';

export type CreateFileFormValues = z.infer<typeof createFileSchema>;

export default function CreateFileForm() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<CreateFileFormValues>({
		resolver: zodResolver(createFileSchema),
	});

	const onSubmit = async (formData: CreateFileFormValues) => {
		try {
			const { data } = await api.post('/file', formData);
			console.log('Created file: ', data.file);
		} catch (error: any) {
			console.error('Create file error', error);
			setError('root', { message: error.message });
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size='sm'>Add</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a file:</DialogTitle>
					<DialogDescription>
						Enter the filename and hit create
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
					<InputField<CreateFileFormValues>
						error={errors.filename?.message}
						label='Filename:'
						name='filename'
						register={register}
					/>
					<div className='flex justify-end'>
						<Button disabled={isSubmitting} size='sm'>
							Create
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
