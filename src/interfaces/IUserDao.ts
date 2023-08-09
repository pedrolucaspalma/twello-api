import { UserType } from "../models/User";
import { CreateUserPayload } from "../types/UserTypes";

export interface IUserDao {
	findById(id: string): Promise<UserType>;
	findByEmail(email: String): Promise<UserType | null>;
	create(userCreationPayload: CreateUserPayload): Promise<UserType>;
	listUsers(): Promise<UserType[]>;
	setPasswordToken(userId: string, passwordToken: string): Promise<void>;
	updatePassword(userId: string, newPassword: string): Promise<UserType>;
	isEmailAvailable(email: string): Promise<boolean>;
}
