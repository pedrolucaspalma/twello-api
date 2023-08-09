import { IUserDao } from "../interfaces/IUserDao";
import { CreateUserPayload } from "../types/UserTypes";
import { User, UserType } from "../entity/User";
import { ChangePasswordRequest } from "../entity/ChangePasswordRequest";

export class UserDao implements IUserDao {
	constructor() { }

	async isEmailAvailable(email: string): Promise<boolean> {
	}

	async create(userCreationPayload: CreateUserPayload): Promise<UserType> {
	}

	async setPasswordToken(userId: string, passwordToken: string): Promise<void> {
	}

	async updatePassword(userId: string, newPassword: string): Promise<UserType> {
	}

	async findById(id: string): Promise<UserType> {
	}

	async findByEmail(email: string): Promise<UserType | null> {
	}

	async listUsers(): Promise<UserType[]> {
	}
}
