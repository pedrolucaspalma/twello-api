import { Board } from "./types/BoardTypes";
import { User } from "./types/UserTypes";

export const boardsTable: Board[] = [
	{
		uuid: "2713c147-85ee-46a0-b23b-b9cce1a8b8e8",
		title: "Trabalho",
		backgroundColor: "#FF5733",
		textColor: "#000000",
		createdAt: 1687573903886,
	},
	{
		uuid: "2713c147-85ee-46a0-b23b-b9cce1a8b8e8",
		title: "Faculdade",
		backgroundColor: "#2C8BCD",
		textColor: "#000000",
		createdAt: 1687573903886,
	},
	{
		uuid: "4a7e939a-f3d7-4b38-9491-53077c26e88f",
		title: "Casa",
		backgroundColor: "#1D4C20",
		textColor: "#000000",
		createdAt: 1687573903886,
	},
];

export const usersTable: User[] = [
	{
		uuid: "74aa8bd0-ff7c-449b-8c94-a0513178ab94",
		name: "Pedro Palma",
		email: "pedro@email.com",
		password: "hfdsoiughfdiugnfdi-uhfdg9undf",
		createdAt: 1687573903886,
	},
	{
		uuid: "69cf3341-b40d-45d2-b602-313d83b5df5e",
		name: "Vitor Barroso",
		email: "vitor@email.com",
		password: "dsfhsdufsd-uhfdg9undf",
		createdAt: 1687573923324,
	},
	{
		uuid: "69cf3341-b40d-45d2-b602-313d83b5df5e",
		name: "Usuario Exemplo",
		email: "usuario@email.com",
		password: "4358433443uhfdg9undf",
		createdAt: 1287853423324,
	},
];
