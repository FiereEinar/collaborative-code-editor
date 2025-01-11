import CreateFileForm from './forms/CreateFileForm';
import ProjectList from './ProjectList';

export default function Sidebar() {
	return (
		<aside className='bg-vscode text-white border-r !w-[20rem]'>
			<div className='flex justify-between gap-5 p-2 items-center mb-3 border-b'>
				<p>Your Projects</p>
				<CreateFileForm />
			</div>
			<ProjectList />
		</aside>
	);
}
