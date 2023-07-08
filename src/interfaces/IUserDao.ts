import { User } from "../types/UserTypes";
import { CreateUserPayload } from "../types/UserTypes";

export interface IUserDao {
	findById(id: string): Promise<User | null>;
	findByEmail(email: String): Promise<User | null>;
	create(userCreationPayload: CreateUserPayload): Promise<User | null>;
	listUsers(): Promise<User[]>;

	isEmailAvailable(email: string): Promise<boolean>;
}
