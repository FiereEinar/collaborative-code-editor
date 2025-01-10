import CreateFileForm from './forms/CreateFileForm';
import ProjectList from './ProjectList';

export default function Sidebar() {
	return (
		<aside className='bg-vscode text-white p-2 border-r !w-[10rem]'>
			<div className='flex justify-end gap-5'>
				<p>Your Projects</p>
				<CreateFileForm />
			</div>
			<ProjectList />
		</aside>
	);
}
