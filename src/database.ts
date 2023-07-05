import {
	Board,
	Card,
	Column,
	UsersSharedBoardAssociation,
} from "./types/BoardTypes";
import { User } from "./types/UserTypes";

export const boardsTable: Board[] = [
	{
		id: "2713c147-85ee-46a0-b23b-b9cce1a8b8e8",
		ownerUserId: "74aa8bd0-ff7c-449b-8c94-a0513178ab94",
		title: "Trabalho",
		backgroundColor: "#FF5733",
		textColor: "#000000",
		createdAt: 1687573903886,
	},
	{
		id: "2713c147-85ee-46a0-b23b-b9cce1a8b8e8",
		ownerUserId: "69cf3341-b40d-45d2-b602-313d83b5df5e",
		title: "Faculdade",
		backgroundColor: "#2C8BCD",
		textColor: "#000000",
		createdAt: 1687573903886,
	},
];

export const usersSharedBoardsTable: UsersSharedBoardAssociation[] = [
	{
		boardId: "2713c147-85ee-46a0-b23b-b9cce1a8b8e8",
		userId: "69cf3341-b40d-45d2-b602-313d83b5df5e",
		canEdit: true,
		isFavorite: false,
	},
];

export const usersTable: User[] = [
	{
		id: "74aa8bd0-ff7c-449b-8c94-a0513178ab94",
		name: "Pedro Palma",
		email: "pedro@email.com",
		password: "$2a$10$PitnTFirasAzeBn9BzksXOHMRkqClvlVcfV2r.1LM0gk8V/kdwm.e",
		createdAt: 1687573903886,
	},
	{
		id: "69cf3341-b40d-45d2-b602-313d83b5df5e",
		name: "Vitor Barroso",
		email: "vitor@email.com",
		password: "dsfhsdufsd-uhfdg9undf",
		createdAt: 1687573923324,
	},
	{
		id: "69cf3341-b40d-45d2-b602-313d83b5df5e",
		name: "Usuario Exemplo",
		email: "usuario@email.com",
		password: "4358433443uhfdg9undf",
		createdAt: 1287853423324,
	},
];

export const columnsTable: Column[] = [
	{
		id: "gasdc147-85ee-46a0-b23b-b9casda8b8e8",
		boardId: "2713c147-85ee-46a0-b23b-b9cce1a8b8e8",
		index: 0,
		title: "Doing",
	},
];

export const cardsTable: Card[] = [
	{
		id: "0f04eec4-ce48-4a16-a119-ac28bd20bfb0",
		columnId: "gasdc147-85ee-46a0-b23b-b9casda8b8e8",
		content: "Testando conteúdo",
		index: 0,
		createdAt: new Date().getTime(),
		updatedAt: new Date().getTime(),
	},
];
