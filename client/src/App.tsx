import Sidebar from './components/Sidebar';
import OutputTerminal from './components/OutputTerminal';
import { useNavigate } from 'react-router-dom';
import { setNavigate } from './lib/navigate';
import CodeEditor from './components/CodeEditor';

function App() {
	const navigate = useNavigate();
	setNavigate(navigate);

	return (
		<main className='flex overflow-hidden'>
			<Sidebar />
			<CodeEditor />
			<OutputTerminal />
		</main>
	);
}

export default App;
