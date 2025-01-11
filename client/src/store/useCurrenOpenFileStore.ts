import { File, FileOutput } from '@/types/file';
import { create } from 'zustand';

interface CurrentOpenFileState {
	file: File | null;
	output: FileOutput | null;
	setFile: (file: File | null) => void;
	setOutput: (output: FileOutput) => void;
}

export const useCurrentOpenFileStore = create<CurrentOpenFileState>((set) => ({
	file: null,
	output: null,
	setFile: (file) => set(() => ({ file: file })),
	setOutput: (output) => set(() => ({ output: output })),
}));
