export type File = {
	_id: string;
	filename: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	owner: string;
	partners: string[];
};
