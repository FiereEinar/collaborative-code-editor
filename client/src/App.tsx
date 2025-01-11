import Sidebar from './components/Sidebar';
import OutputTerminal from './components/OutputTerminal';
import { useNavigate } from 'react-router-dom';
import { setNavigate } from './lib/navigate';
import CodeEditor from './components/CodeEditor';
import { useCurrentOpenFileStore } from './store/useCurrenOpenFileStore';

function App() {
	const output = useCurrentOpenFileStore((state) => state.output);
	const navigate = useNavigate();
	setNavigate(navigate);

	return (
		<main className='overflow-hidden'>
			<div className='flex overflow-hidden'>
				<Sidebar />
				<div className='w-full overflow-hidden'>
					<CodeEditor />
				</div>
				<OutputTerminal output={output} />
			</div>
		</main>
	);
}

export default App;
