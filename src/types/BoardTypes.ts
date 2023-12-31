export type Column = {
	id: string;
	boardId: string;
	index: number;
	title: string;
	cards?: Card[];
};

export type Card = {
	id: string;
	columnId: string;
	index: number;
	content: string | null;
	createdAt: number;
	updatedAt: number;
};

export type BoardCreationPayload = {
	ownerUserId: string;
	title?: string; // Defaults "New board"
	backgroundColor?: string; // Defaults #FFFFFF
	textColor?: string; // Defaults #000000
};

export type BoardUpdatePayload = {
	title?: string;
	backgroundColor?: string;
	textColor?: string;
	content?: JSON;
};

export type BoardUserAssociationCreationPayload = {
	userId: string;
	boardId: string;
};
