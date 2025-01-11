import { FileOutput } from '@/types/file';
import TerminalOutput from './ui/terminal-output';

type OutputTerminalProps = {
	output?: FileOutput | null;
};

export default function OutputTerminal({ output }: OutputTerminalProps) {
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
			<div className='border-t h-10 bg-vscode w-full text-muted-foreground text-xs flex p-4 items-center justify-between pr-3'>
				<p>{output?.memory}mb</p>
				<p>{output?.time}s</p>
			</div>
		</section>
	);
}
