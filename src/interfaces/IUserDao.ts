import { UserType } from "../entity/User";
import { CreateUserPayload } from "../types/UserTypes";

export interface IUserDao {
	findById(id: string): Promise<UserType>;
	findByEmail(email: String): Promise<UserType | null>;
	create(userCreationPayload: CreateUserPayload): Promise<UserType>;
	listUsers(): Promise<UserType[]>;

	isEmailAvailable(email: string): Promise<boolean>;
}
