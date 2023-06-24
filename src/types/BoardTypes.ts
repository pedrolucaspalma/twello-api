export type Board = {
	uuid: string;
	title: string;
	ownerUserUuid: string;
	backgroundColor: string;
	textColor: string;
	createdAt: number;
};

export type BoardCreationPayload = {
	ownerUserUuid: string;
	title?: string; // Defaults "New board"
	backgroundColor?: string; // Defaults #FFFFFF
	textColor?: string; // Defaults #000000
};

export type UsersSharedBoardAssociation = {
	userUuid: string;
	boardUuid: string;
	canEdit: boolean; // Defaults false
};

export type BoardUserAssociationCreationPayload = {
	userUuid: string;
	boardUuid: string;
};
