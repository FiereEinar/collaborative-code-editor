import TerminalOutput from './ui/terminal-output';
import { useCurrentOpenFileStore } from '@/store/useCurrenOpenFileStore';

export default function OutputTerminal() {
	const output = useCurrentOpenFileStore((state) => state.output);
	const { stdin, setInput } = useCurrentOpenFileStore((state) => state);

	return (
		<section className='bg-vscode flex flex-col text-white  !w-[30rem] border-l h-dvh  overflow-x-hidden'>
			<div className='flex border-b justify-between items-center p-3'>
				<p>Output</p>
				<p
					className={`${
						output?.status.id === 3 ? 'text-green-500' : 'text-red-500'
					} text-xs`}
				>
					{output?.status.description}
				</p>
			</div>
			<div className='text-muted-foreground p-2 flex-grow overflow-y-scroll'>
				{output && (
					<>
						<TerminalOutput text={output.compile_output} />
						<TerminalOutput text={output.message} />
						<TerminalOutput text={output.stdout} />
						<TerminalOutput text={output.stderr} />
					</>
				)}
			</div>
			<div className='border-t px-4 py-2 text-muted-foreground text-xs flex gap-2 items-center'>
				<label htmlFor='stdin'>input: </label>
				<input
					onChange={(e) => setInput(e.target.value)}
					value={stdin || ''}
					className='bg-vscode w-full border rounded-md px-2 py-1'
					type='text'
					id='stdin'
				/>
			</div>
			<div className='border-t h-10 bg-vscode w-full text-muted-foreground text-xs flex p-4 items-center justify-between pr-3'>
				<p>{output?.memory}mb</p>
				<p>{output?.time}s</p>
			</div>
		</section>
	);
}
