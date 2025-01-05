import { outputSchema } from '@/lib/validations/outputSchema';
import { z } from 'zod';

type OutputTerminalProps = {
	output?: z.infer<typeof outputSchema>;
};

export default function OutputTerminal({ output }: OutputTerminalProps) {
	return (
		<section className='bg-vscode text-white p-2 !w-[30rem] border-l'>
			<p className='p-2'>Output</p>
			{output && (
				<div className='text-muted-foreground p-2'>
					<p>{output.message}</p>
					<p>{output.stdout}</p>
					<p>{output.stderr}</p>
					<p>{output.status.description}</p>
				</div>
			)}
		</section>
	);
}
