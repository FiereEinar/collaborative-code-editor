import { languages } from '@/constants/languages';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getFileLanguage = (filename: string): string => {
	const filenameArr = filename.split('.');
	let language = '';

	if (filenameArr) {
		language = languages[filenameArr[filenameArr.length - 1] || ''];
	}

	return language;
};
