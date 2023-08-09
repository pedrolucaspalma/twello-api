import { IUserDao } from "../interfaces/IUserDao";
import { CreateUserPayload } from "../types/UserTypes";
import { User, UserType } from "../models/User";
import { ChangePasswordRequest } from "../models/ChangePasswordRequest";

export class UserDao implements IUserDao {
	constructor() { }

	async isEmailAvailable(email: string): Promise<boolean> {
		throw new Error("not implemented")
	}

	async create(userCreationPayload: CreateUserPayload): Promise<UserType> {
		throw new Error("not implemented")
	}

	async setPasswordToken(userId: string, passwordToken: string): Promise<void> {
		throw new Error("not implemented")
	}

	async updatePassword(userId: string, newPassword: string): Promise<UserType> {
		throw new Error("not implemented")
	}

	async findById(id: string): Promise<UserType> {
		throw new Error("not implemented")
	}

	async findByEmail(email: string): Promise<UserType | null> {
		throw new Error("not implemented")
	}

	async listUsers(): Promise<UserType[]> {
		throw new Error("not implemented")
	}
}
