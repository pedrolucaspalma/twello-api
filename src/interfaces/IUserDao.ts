import { User } from "../types/UserTypes";
import { CreateUserPayload } from "../types/UserTypes";

export interface IUserDao {
	findByUuid(uuid: string): Promise<User | null>;
	findByEmail(email: String): Promise<User | null>;
	create(userCreationPayload: CreateUserPayload): Promise<void>;
	listUsers(): Promise<User[]>;

	isEmailAvailable(email: string): Promise<boolean>;
}
