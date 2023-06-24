import { IUserDao } from "../interfaces/IUserDao";
import { CreateUserPayload, User } from "../types/UserTypes";

export class UserDao implements IUserDao {
	async checkEmailAvailability(email: string): Promise<boolean> {
		throw new Error("não implementado");
	}

	async create(userCreationPayload: CreateUserPayload): Promise<void> {
		throw new Error("não implementado");
	}

	async findByUuid(uuid: string): Promise<User> {
		throw new Error("não implementado");
	}

	async findByEmail(email: String): Promise<User> {
		throw new Error("não implementado");
	}
}
