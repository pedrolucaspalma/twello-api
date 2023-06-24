import { v4 } from "uuid";

import { IUserDao } from "../interfaces/IUserDao";
import { CreateUserPayload, User } from "../../types/UserTypes";

export class UserDao implements IUserDao {
	async isEmailAvailable(email: string): Promise<boolean> {
		const user = usersTable.find((u) => u.email === email);
		if (user) return false;
		return true;
	}

	async create(userCreationPayload: CreateUserPayload): Promise<void> {
		usersTable.push({
			...userCreationPayload,
			uuid: v4(),
			createdAt: new Date().getTime(),
		});
	}

	async findByUuid(uuid: string): Promise<User | null> {
		const user = usersTable.find((u) => u.uuid === uuid);
		if (!user) return null;
		return user;
	}

	async findByEmail(email: String): Promise<User | null> {
		const user = usersTable.find((u) => u.email === email);
		if (!user) return null;
		return user;
	}

	async listUsers(): Promise<User[]> {
		return usersTable;
	}
}

const usersTable: User[] = [
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
