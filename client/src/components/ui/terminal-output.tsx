type TerminalOutputProps = {
	text?: string;
};

export default function TerminalOutput({ text }: TerminalOutputProps) {
	return (
		<p>
			{text &&
				text.split('\n').map((line, index) => (
					<span key={index}>
						{'>'} {line}
						<br />
					</span>
				))}
		</p>
	);
}
