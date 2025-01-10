export type Project = {
	_id: string;
	filename: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	owner: string;
	partners: string[];
};
