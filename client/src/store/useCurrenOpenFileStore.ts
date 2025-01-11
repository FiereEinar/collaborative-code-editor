import { File, FileOutput } from '@/types/file';
import { create } from 'zustand';

interface CurrentOpenFileState {
	file: File | null;
	output: FileOutput | null;
	stdin?: string | null;
	setFile: (file: File | null) => void;
	setOutput: (output: FileOutput) => void;
	setInput: (stdin: string) => void;
}

export const useCurrentOpenFileStore = create<CurrentOpenFileState>((set) => ({
	file: null,
	output: null,
	stdin: null,
	setFile: (file) => set(() => ({ file: file })),
	setOutput: (output) => set(() => ({ output: output })),
	setInput: (stdin) => set(() => ({ stdin: stdin })),
}));
