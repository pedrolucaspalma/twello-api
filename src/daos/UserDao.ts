import { v4 } from "uuid";

import { IUserDao } from "../interfaces/IUserDao";
import { CreateUserPayload, User } from "../types/UserTypes";
import { usersTable } from "../database";
import { Board } from "../types/BoardTypes";

export class UserDao implements IUserDao {
	async isEmailAvailable(email: string): Promise<boolean> {
		const user = usersTable.find((u) => u.email === email);
		if (user) return false;
		return true;
	}

	async create(userCreationPayload: CreateUserPayload): Promise<User | null> {
		const userId = v4();
		usersTable.push({
			...userCreationPayload,
			id: userId,
			createdAt: new Date().getTime(),
		});
		return this.findById(userId);
	}

	async findById(id: string): Promise<User | null> {
		const user = usersTable.find((u) => u.id === id);
		if (!user) return null;
		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = usersTable.find((u) => u.email === email);
		if (!user) return null;
		return user;
	}

	async listUsers(): Promise<User[]> {
		return usersTable;
	}
}
