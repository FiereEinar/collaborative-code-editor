import { File, FileOutput } from '@/types/file';
import { create } from 'zustand';

interface CurrentOpenFileState {
	file: File | null;
	output: FileOutput | null;
	stdin?: string | null;
	isSubmitting: boolean;
	setFile: (file: File | null) => void;
	setOutput: (output: FileOutput) => void;
	setInput: (stdin: string) => void;
	setIsSubmitting: (state: boolean) => void;
}

export const useCurrentOpenFileStore = create<CurrentOpenFileState>((set) => ({
	file: null,
	output: null,
	stdin: null,
	isSubmitting: false,
	setFile: (file) => set(() => ({ file: file })),
	setOutput: (output) => set(() => ({ output: output })),
	setInput: (stdin) => set(() => ({ stdin: stdin })),
	setIsSubmitting: (state) => set(() => ({ isSubmitting: state })),
}));
